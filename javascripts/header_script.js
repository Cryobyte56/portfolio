// Section Detection
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const headerHeight = document.querySelector("header")?.offsetHeight || 80; 

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove Active Link Styling
          navLinks.forEach((link) => link.classList.remove("active"));

          // Find and Activate Link Style
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.5 } // 50% of the section must be visible
  );

  sections.forEach((section) => observer.observe(section));

  // Scroll Animation for Fade-in Sections
  const fadeSections = document.querySelectorAll(".fade-in-section");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the section is visible
  );

  fadeSections.forEach((section) => fadeObserver.observe(section));

  // Smooth Scrolling on Navbar Click with Header Offset
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor jump
      const targetId = link.getAttribute("href").substring(1); // Remove #
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const yOffset = -headerHeight - 20;
        const y =
          targetSection.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
});
