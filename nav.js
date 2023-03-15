var scrollLink = document.getElementById("scroll-projects");
scrollLink.addEventListener("click", function() {
  var element = document.getElementById("projects");
  element.scrollIntoView({behavior: "smooth"});
});
