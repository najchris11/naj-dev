#!/usr/bin/env bash
# Verifies the resume flow end to end: upstream PDF -> /resume.pdf route ->
# /resume page -> rest of the portfolio. Runs against an already running
# instance (e.g. `next start`) or a production URL; it never starts a server.
# Checks 2-4 follow redirects (naj-dev.com redirects to www.naj-dev.com) and
# print the final URL they landed on.
#
# Usage: bash scripts/verify-resume-flow.sh [BASE_URL] [--record <path>]
#   BASE_URL       defaults to http://localhost:3000; when its host is
#                  localhost, 127.0.0.1 or [::1] (any port) check 2 also asserts
#                  that the route's sha256 equals the upstream PDF's
#   --record PATH  on success, write the PDF properties as JSON to PATH
#   RELEASE_CHECK  warn (default) or fail; how check 5 (release asset) reports
set -euo pipefail

UPSTREAM_URL='https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf'
RELEASE_URL='https://github.com/najchris11/resume/releases/latest/download/najchris11_resume.pdf'
RELEASE_CHECK="${RELEASE_CHECK:-warn}"

USAGE='usage: verify-resume-flow.sh [BASE_URL] [--record <path>]'
BASE_URL='http://localhost:3000'
BASE_SET=0
RECORD_PATH=''
while [ "$#" -gt 0 ]; do
  case "$1" in
    --record)
      if [ "$#" -lt 2 ]; then
        echo "$USAGE" >&2
        exit 2
      fi
      RECORD_PATH="$2"
      shift 2
      ;;
    -*)
      echo "unknown option: $1" >&2
      exit 2
      ;;
    *)
      if [ "$BASE_SET" -eq 1 ]; then
        echo "unexpected extra argument: $1" >&2
        echo "$USAGE" >&2
        exit 2
      fi
      BASE_URL="$1"
      BASE_SET=1
      shift
      ;;
  esac
done
BASE_URL="${BASE_URL%/}"

case "$RELEASE_CHECK" in
  warn | fail) ;;
  *)
    echo "RELEASE_CHECK must be 'warn' or 'fail' (got '$RELEASE_CHECK')" >&2
    exit 2
    ;;
esac

for tool in curl pdfinfo sha256sum; do
  if ! command -v "$tool" > /dev/null 2>&1; then
    echo "missing required tool: $tool" >&2
    exit 2
  fi
done

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

FAILED=0
UPSTREAM_SHA=''
UPSTREAM_PAGES=''
ROUTE_SHA=''
ROUTE_PAGES=''
REASON=''

fail() {
  echo "FAIL: $1"
  FAILED=$((FAILED + 1))
}

# fetch URL BODY_FILE HEADER_FILE [extra curl args...]; prints the final HTTP
# status and leaves the URL the request landed on in $TMP_DIR/final_url. A
# transport error (timeout, DNS, connection refused, too many redirects, ...)
# prints 000 and leaves curl's message in $TMP_DIR/curl_error. -g so IPv6 hosts
# like http://[::1]:3000 are not treated as URL globs.
fetch() {
  local url="$1" body="$2" headers="$3" out code rc=0
  shift 3
  out="$(curl -sS -g --connect-timeout 10 --max-time 30 "$@" \
    -o "$body" -D "$headers" -w '%{http_code} %{url_effective}' "$url" \
    2> "$TMP_DIR/curl_error")" || rc=$?
  code="${out%% *}"
  printf '%s\n' "${out#* }" > "$TMP_DIR/final_url"
  if [ "$rc" -ne 0 ]; then
    printf 'curl exit %s: %s\n' "$rc" "$(tr '\n' ' ' < "$TMP_DIR/curl_error" | sed 's/ *$//')" > "$TMP_DIR/curl_error"
    code=000
  else
    : > "$TMP_DIR/curl_error"
  fi
  echo "${code:-000}"
}

# curl_note: prints " (curl exit N: message)" if the last fetch failed in transport
curl_note() {
  if [ -s "$TMP_DIR/curl_error" ]; then
    printf ' (%s)' "$(cat "$TMP_DIR/curl_error")"
  fi
}

# is_local_base: true when BASE_URL's host is localhost, 127.0.0.1 or [::1]
# (any port); only then is the route compared byte-for-byte with upstream
is_local_base() {
  local hostport host
  hostport="${BASE_URL#*://}"
  hostport="${hostport%%[/?#]*}"
  hostport="$(printf '%s' "${hostport##*@}" | tr 'A-Z' 'a-z')"
  case "$hostport" in
    \[*) host="${hostport%%]*}]" ;;
    *) host="${hostport%%:*}" ;;
  esac
  case "$host" in
    localhost | 127.0.0.1 | '[::1]') return 0 ;;
  esac
  return 1
}

# Checks 2-4 follow redirects (the production apex 308-redirects to www) and
# report where they landed; the final status must still be 200
FOLLOW=(-L --max-redirs 5)

# report_final_url LABEL: prints the URL the last fetch landed on
report_final_url() {
  echo "$1 landed on: $(cat "$TMP_DIR/final_url")"
}

has_pdf_magic() {
  [ "$(head -c 4 "$1")" = '%PDF' ]
}

pdf_pages() {
  pdfinfo "$1" 2> /dev/null | awk '/^Pages:/ { print $2 }' || true
}

# check_pdf FILE: sets REASON and returns 1 unless FILE is a one-page PDF
check_pdf() {
  local file="$1"
  if ! has_pdf_magic "$file"; then
    REASON='body does not start with %PDF'
    return 1
  fi
  local pages
  pages="$(pdf_pages "$file")"
  if [ "$pages" != '1' ]; then
    REASON="pdfinfo reports '${pages:-unreadable}' pages, expected 1"
    return 1
  fi
  return 0
}

# Check 1: upstream PDF
check_upstream() {
  local file="$TMP_DIR/upstream.pdf" code
  code="$(fetch "$UPSTREAM_URL" "$file" "$TMP_DIR/upstream.headers" -L)"
  if [ "$code" != '200' ]; then
    REASON="upstream returned HTTP $code$(curl_note)"
    return 1
  fi
  check_pdf "$file" || return 1
  UPSTREAM_SHA="$(sha256sum "$file" | awk '{ print $1 }')"
  UPSTREAM_PAGES="$(pdf_pages "$file")"
}

# Check 2: /resume.pdf route
check_route() {
  local file="$TMP_DIR/route.pdf" headers="$TMP_DIR/route.headers" code ctype
  code="$(fetch "$BASE_URL/resume.pdf" "$file" "$headers" "${FOLLOW[@]}")"
  report_final_url 'check 2:'
  if [ "$code" != '200' ]; then
    REASON="$BASE_URL/resume.pdf returned HTTP $code$(curl_note)"
    return 1
  fi
  ctype="$(grep -i '^content-type:' "$headers" | tail -n 1 | tr -d '\r' \
    | cut -d: -f2- | tr 'A-Z' 'a-z' | tr -d ' ' || true)"
  case "$ctype" in
    application/pdf | application/pdf\;*) ;;
    *)
      REASON="Content-Type is '${ctype:-missing}', expected application/pdf"
      return 1
      ;;
  esac
  check_pdf "$file" || return 1
  ROUTE_SHA="$(sha256sum "$file" | awk '{ print $1 }')"
  ROUTE_PAGES="$(pdf_pages "$file")"
  if is_local_base; then
    if [ -z "$UPSTREAM_SHA" ]; then
      REASON='cannot compare with upstream (check 1 did not produce a valid PDF)'
      return 1
    fi
    if [ "$ROUTE_SHA" != "$UPSTREAM_SHA" ]; then
      REASON="route sha256 $ROUTE_SHA differs from upstream sha256 $UPSTREAM_SHA"
      return 1
    fi
    echo "check 2: route sha256 equals upstream sha256 ($ROUTE_SHA)"
  else
    echo 'check 2: route sha256 not compared with upstream (BASE_URL is not localhost)'
  fi
}

# Check 3: /resume page markup
check_page() {
  local file="$TMP_DIR/resume.html" code html iframe_tag a_tag
  code="$(fetch "$BASE_URL/resume" "$file" "$TMP_DIR/resume.headers" "${FOLLOW[@]}")"
  report_final_url 'check 3:'
  if [ "$code" != '200' ]; then
    REASON="$BASE_URL/resume returned HTTP $code$(curl_note)"
    return 1
  fi
  html="$(tr '\n' ' ' < "$file")"
  # Tags are matched on their own so attribute order does not matter; quoted
  # attribute values may contain '>' (tailwind classes do)
  iframe_tag="$(printf '%s' "$html" \
    | grep -oE "<iframe[[:space:]]([^>\"']|\"[^\"]*\"|'[^']*')*>" \
    | grep -E "[[:space:]]src=[\"']/resume\\.pdf[\"']" | head -n 1 || true)"
  if [ -z "$iframe_tag" ]; then
    REASON='no <iframe> with src="/resume.pdf"'
    return 1
  fi
  a_tag="$(printf '%s' "$html" \
    | grep -oE "<a[[:space:]]([^>\"']|\"[^\"]*\"|'[^']*')*>" \
    | grep -E "[[:space:]]href=[\"']/resume\\.pdf[\"']" \
    | grep -E "[[:space:]]download([[:space:]/>=]|\$)" | head -n 1 || true)"
  if [ -z "$a_tag" ]; then
    REASON='no <a> with href="/resume.pdf" and a download attribute'
    return 1
  fi
}

# Check 4: portfolio pages
check_pages() {
  local path code bad=''
  for path in / /about /projects /contact; do
    code="$(fetch "$BASE_URL$path" "$TMP_DIR/page.html" "$TMP_DIR/page.headers" "${FOLLOW[@]}")"
    report_final_url "check 4 ($path):"
    if [ "$code" != '200' ]; then
      bad="$bad $path=$code$(curl_note)"
    fi
  done
  if [ -n "$bad" ]; then
    REASON="non-200 responses:$bad"
    return 1
  fi
}

# Check 5: release asset (informational unless RELEASE_CHECK=fail)
check_release() {
  local file="$TMP_DIR/release.pdf" code
  code="$(fetch "$RELEASE_URL" "$file" "$TMP_DIR/release.headers" -L)"
  if [ "$code" != '200' ]; then
    REASON="release asset returned HTTP $code$(curl_note)"
    return 1
  fi
  check_pdf "$file"
}

echo "Verifying resume flow against $BASE_URL"

if check_upstream; then
  echo 'PASS: upstream PDF valid'
else
  fail "upstream PDF invalid: $REASON"
fi

if check_route; then
  echo 'PASS: route serves correct PDF'
else
  fail "route does not serve correct PDF: $REASON"
fi

if check_page; then
  echo 'PASS: resume page has iframe and download link'
else
  fail "resume page is missing iframe or download link: $REASON"
fi

if check_pages; then
  echo 'PASS: portfolio pages accessible'
else
  fail "portfolio pages not accessible: $REASON"
fi

if check_release; then
  if [ "$RELEASE_CHECK" = 'fail' ]; then
    echo 'PASS: release asset accessible'
  else
    echo 'WARN: release asset accessible'
  fi
elif [ "$RELEASE_CHECK" = 'fail' ]; then
  fail "release asset unavailable: $REASON"
else
  echo 'WARN: release asset unavailable (expected during migration)'
fi

if [ "$FAILED" -ne 0 ]; then
  echo "$FAILED check(s) failed"
  exit 1
fi

if [ -n "$RECORD_PATH" ]; then
  printf '{\n  "upstream_sha256": "%s",\n  "upstream_pages": %s,\n  "route_sha256": "%s",\n  "route_pages": %s,\n  "recorded_at": "%s"\n}\n' \
    "$UPSTREAM_SHA" "$UPSTREAM_PAGES" "$ROUTE_SHA" "$ROUTE_PAGES" \
    "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$RECORD_PATH"
  echo "Recorded to $RECORD_PATH"
fi

echo 'All checks passed'
