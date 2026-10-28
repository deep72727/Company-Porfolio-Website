document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const header = document.querySelector(".site-header");

  function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("is-active");
    navMenu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      document.body.classList.toggle("menu-open", isOpen);
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        navMenu.classList.contains("is-open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  // 2. NAVBAR SCROLL EFFECT
  function updateHeader() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  // 3. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.getElementById(href.slice(1));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",
          block: "start"
        });

        closeMenu();
      }
    });
  });


  // 4. AUTOMATIC FOOTER YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // 5. SOLUTION FINDER
  const solutionInputs = document.querySelectorAll(
    'input[name="businessNeed"]'
  );

  const solutionOptions = document.querySelectorAll(".solution-option");

  const solutionDetails = {
    "business-website": {
      title: "Business Website",
      description:
        "Build a professional online presence to showcase your services and help customers connect with your business.",
      features: [
        "Responsive website design",
        "Company and service pages",
        "Customer enquiry options"
      ],
      button: "Discuss Your Website"
    },

    ecommerce: {
      title: "Online Store",
      description:
        "Create an online shopping experience where customers can explore your products and place orders.",
      features: [
        "Product catalogue",
        "Shopping experience",
        "Order management options"
      ],
      button: "Discuss Your Store"
    },

    automation: {
      title: "Business Automation",
      description:
        "Simplify repetitive tasks and improve everyday business workflows with practical digital solutions.",
      features: [
        "Workflow automation",
        "Task management",
        "Process improvement"
      ],
      button: "Discuss Automation"
    },

    custom: {
      title: "Custom Software",
      description:
        "Explore software tailored to your team's requirements, business processes and specific challenges.",
      features: [
        "Requirement-based features",
        "Business data management",
        "Custom workflows"
      ],
      button: "Discuss Your Software"
    },

    "mobile-app": {
      title: "Mobile Application",
      description:
        "Plan a mobile experience around your customers, business goals and required functionality.",
      features: [
        "Mobile-first experience",
        "User-focused functionality",
        "Business-specific features"
      ],
      button: "Discuss Your App"
    },

    "business-system": {
      title: "Business Management System",
      description:
        "Organise business information and everyday operations through a system designed around your needs.",
      features: [
        "Organised business records",
        "Operational workflows",
        "Centralised information"
      ],
      button: "Discuss Your System"
    }
  };

  function updateSolution(value) {
    const details = solutionDetails[value];

    if (!details) return;

    const selectedOption = document.querySelector(
      'input[name="businessNeed"]:checked'
    );

    solutionOptions.forEach(function (option) {
      const input = option.querySelector(
        'input[name="businessNeed"]'
      );

      option.classList.toggle(
        "is-selected",
        Boolean(input && input.checked)
      );
    });

    const title = document.getElementById("solution-title");
    const description = document.getElementById("solution-description");
    const features = document.getElementById("solution-features");
    const button = document.getElementById("solution-cta");

    if (title) {
      title.textContent = details.title;
    }

    if (description) {
      description.textContent = details.description;
    }

    if (features) {
      features.replaceChildren();

      details.features.forEach(function (feature) {
        const item = document.createElement("li");
        item.textContent = feature;
        features.appendChild(item);
      });
    }

    if (button) {
      button.textContent = details.button;

      if (button.tagName === "A") {
        button.href =
          "contact.html?service=" +
          encodeURIComponent(details.title);
      }
    }

    if (selectedOption) {
      document.dispatchEvent(
        new CustomEvent("solutionChanged", {
          detail: {
            value: value,
            title: details.title
          }
        })
      );
    }
  }

  solutionInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      if (input.checked) {
        updateSolution(input.value);
      }
    });
  });

  const initialSolution = document.querySelector(
    'input[name="businessNeed"]:checked'
  );

  if (initialSolution) {
    updateSolution(initialSolution.value);
  }


  // 6. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-on-scroll"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }


  // 7. PROJECT FILTERS
  const projectFilters = document.querySelectorAll(
    "[data-project-filter]"
  );

  const projectCards = document.querySelectorAll(
    "[data-project-category]"
  );

  projectFilters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      const category = filter.dataset.projectFilter;

      projectFilters.forEach(function (button) {
        const isActive = button === filter;

        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach(function (card) {
        const cardCategory = card.dataset.projectCategory;

        card.hidden =
          category !== "all" && cardCategory !== category;
      });
    });
  });


  // 8. PRICING FAQ ACCORDION
  const faqItems = document.querySelectorAll(".pricing-faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(
      ".pricing-faq-question, .faq-question"
    );

    const answer = item.querySelector(
      ".pricing-faq-answer, .faq-answer"
    );

    if (!question || !answer) return;

    question.setAttribute("aria-expanded", "false");
    answer.hidden = true;

    question.addEventListener("click", function () {
      const isExpanded =
        question.getAttribute("aria-expanded") === "true";

      question.setAttribute("aria-expanded", String(!isExpanded));
      answer.hidden = isExpanded;
      item.classList.toggle("is-open", !isExpanded);
    });
  });


  // 9. CONTACT PAGE: READ URL PARAMETERS
  const contactForm = document.getElementById("contactForm");
  const planSelect = document.getElementById("plan");
  const serviceSelect = document.getElementById("service");
  const messageField = document.getElementById("message");

  const queryParams = new URLSearchParams(window.location.search);

  function selectMatchingOption(selectElement, requestedValue) {
    if (!selectElement || !requestedValue) return false;

    const normalizedValue = requestedValue.trim().toLowerCase();

    const matchingOption = Array.from(selectElement.options).find(
      function (option) {
        return (
          option.value.trim().toLowerCase() === normalizedValue ||
          option.textContent.trim().toLowerCase() === normalizedValue
        );
      }
    );

    if (matchingOption) {
      selectElement.value = matchingOption.value;
      return true;
    }

    return false;
  }

  // Select pricing plan automatically
  const requestedPlan = queryParams.get("plan");

  if (requestedPlan && planSelect) {
    const selected = selectMatchingOption(
      planSelect,
      requestedPlan
    );

    if (!selected) {
      planSelect.value = "Other";
    }
  }

  // Select service automatically
  const requestedService = queryParams.get("service");

  if (requestedService && serviceSelect) {
    selectMatchingOption(serviceSelect, requestedService);
  }

  // Fill the message if a plan was selected
  if (requestedPlan && messageField && !messageField.value.trim()) {
    messageField.value =
      "I am interested in the " +
      requestedPlan +
      " plan. Please share more details about the next steps.";
  }


  // 10. CONTACT FORM VALIDATION
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
        return;
      }

      const submitButton = document.getElementById("contactSubmit");

      if (submitButton) {
        submitButton.disabled = true;

        const buttonText = submitButton.querySelector(
          ".contact-submit-text"
        );

        if (buttonText) {
          buttonText.textContent = "Submitting...";
        }
      }

      // Let the browser submit the form to the configured backend.
      // The backend must return a response for the submission to complete.
    });
  }


  // 11. CONTACT FORM RESULT MESSAGES
  const formStatus = document.getElementById("contactFormStatus");

  if (formStatus) {
    const statusParams = new URLSearchParams(window.location.search);
    const status = statusParams.get("status");

    if (status === "success") {
      formStatus.textContent =
        "Thank you! Your inquiry has been submitted successfully.";

      formStatus.classList.add("is-success");
      formStatus.hidden = false;
    } else if (status === "error") {
      formStatus.textContent =
        "Your inquiry could not be submitted. Please try again.";

      formStatus.classList.add("is-error");
      formStatus.hidden = false;

      const submitButton = document.getElementById("contactSubmit");

      if (submitButton) {
        submitButton.disabled = false;

        const buttonText = submitButton.querySelector(
          ".contact-submit-text"
        );

        if (buttonText) {
          buttonText.textContent = "Send project inquiry";
        }
      }
    }
  }


  // 12. PRICING BUTTONS: PRESERVE SELECTED PLAN
  document.querySelectorAll(".pricing-button").forEach(function (button) {
    const originalHref = button.getAttribute("href");

    if (!originalHref) return;

    try {
      const buttonUrl = new URL(
        originalHref,
        window.location.href
      );

      const planName = button.dataset.plan;

      if (
        buttonUrl.pathname.endsWith("/contact") ||
        buttonUrl.pathname.endsWith("/contact.html")
      ) {
        if (planName) {
          buttonUrl.searchParams.set("plan", planName);
          button.href =
            buttonUrl.pathname +
            buttonUrl.search +
            buttonUrl.hash;
        }
      }
    } catch {
      // Keep the original link if its URL cannot be parsed.
    }
  });


  // 13. BACK-TO-TOP LINKS
  document.querySelectorAll('a[href="#home"]').forEach(function (link) {
    link.addEventListener("click", function () {
      const homeTarget = document.getElementById("home");

      if (!homeTarget) {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth"
        });
      }
    });
  });

});
