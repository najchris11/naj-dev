import Link from 'next/link';

export default function ContactPage() {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold">Contact Me</h2>
      <p className="mt-4 text-lg">
        Feel free to reach out at <Link href="mailto:najchris11@yahoo.com">najchris11@yahoo.com </Link>
        or connect with me on <Link href="https://linkedin.com/in/christiancoulibaly">LinkedIn</Link>.
      </p>
      <p>Better contact form coming soon :)</p>
    </section>
  );
}