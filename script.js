const sections = {
  about: "sections/about.html",
  research: "sections/research.html",
  projects: "sections/projects.html",
  // news: "sections/news.html",
  publications: "sections/publications.html",
  awards: "sections/awards.html",
  // services: "sections/services.html"
};

Promise.all(
  Object.entries(sections).map(([id, file]) =>
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not load ${file}`);
        }
        return response.text();
      })
      .then(html => {
        document.getElementById(id).innerHTML = html;
      })
  )
)
.then(() => {
  // Handle a hash only when the page is opened with one.
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView();
      }, 50);
    }
  }

  updateActiveSection();
})
.catch(error => {
  console.error("Error loading sections:", error);
});


function updateActiveSection() {
  const sectionElements = document.querySelectorAll("main > div[id]");
  const scrollPosition = window.scrollY + 150;

  let currentSection = "about";

  sectionElements.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const isActive =
      link.getAttribute("href") === `#${currentSection}`;

    link.classList.toggle("active", isActive);
  });
}


window.addEventListener("scroll", updateActiveSection);
window.addEventListener("load", updateActiveSection);