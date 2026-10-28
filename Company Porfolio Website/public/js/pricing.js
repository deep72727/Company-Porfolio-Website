document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearElement = document.getElementById("year");

  // Automatic footer year
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("is-open");
      menuToggle.classList.remove("is-active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      document.body.classList.remove("menu-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    navMenu.querySelectorAll(".nav-cta").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("is-open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Highlight the current navigation link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkUrl = new URL(link.href, window.location.origin);
    const linkPage = linkUrl.pathname.split("/").pop() || "index.html";

    if (
      linkPage === currentPage &&
      !linkUrl.hash
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Smooth scrolling for same-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });

        if (targetId !== "#") {
          history.replaceState(null, "", targetId);
        }
      }
    });
  });

  // Pricing FAQ accordion
  const faqItems = document.querySelectorAll(".pricing-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(
      ".pricing-faq-question, .faq-question"
    );
    const answer = item.querySelector(
      ".pricing-faq-answer, .faq-answer"
    );

    if (!question || !answer) {
      return;
    }

    question.setAttribute("aria-expanded", "false");
    answer.hidden = true;

    question.addEventListener("click", () => {
      const isExpanded = question.getAttribute("aria-expanded") === "true";

      question.setAttribute("aria-expanded", String(!isExpanded));
      answer.hidden = isExpanded;
      item.classList.toggle("is-open", !isExpanded);
    });
  });

  // Pricing CTA: preserve the selected plan in the contact URL
  document.querySelectorAll(".pricing-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const href = button.getAttribute("href");

      if (!href) {
        return;
      }

      const planName = button.dataset.plan;

      if (!planName) {
        return;
      }

      try {
        const contactUrl = new URL(href, window.location.href);
        contactUrl.searchParams.set("plan", planName);

        button.href = contactUrl.pathname +
          contactUrl.search +
          contactUrl.hash;
      } catch {
        // Leave the original link unchanged if the URL is invalid.
      }
    });
  });

  // Back-to-top links
  document.querySelectorAll('a[href="#home"]').forEach((link) => {
    link.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth"
      });
    });
  });
});
