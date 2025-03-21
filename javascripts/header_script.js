document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector("header");
  const navToggle = document.querySelector("#hs-navbar-example-collapse");

  // Function to check if the view is mobile
  const isMobileView = () => window.innerWidth <= 768; // Adjust breakpoint as needed

  // Get dynamic header height
  const getHeaderHeight = () => (header ? header.offsetHeight : 80);

  // Intersection Observer for Active Link Highlighting
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.5 }
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
    { threshold: 0.2 }
  );

  fadeSections.forEach((section) => fadeObserver.observe(section));

  // Smooth Scrolling on Navbar Click with Header Offset
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor jump
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = getHeaderHeight();
        let yOffset = isMobileView() ? -(headerHeight + 20) : -headerHeight; // Different offset for mobile vs. desktop

        const y =
          targetSection.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });

        // Close mobile navbar if it's open
        if (
          isMobileView() &&
          navToggle &&
          window.getComputedStyle(navToggle).display !== "none"
        ) {
          navToggle.click();
        }
      }
    });
  });

  // Resize event listener to update mobile/desktop detection dynamically
  window.addEventListener("resize", () => {
    console.log(
      "Window resized, checking view mode:",
      isMobileView() ? "Mobile" : "Desktop"
    );
  });

});
