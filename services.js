
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("requirementForm");

  if (!form) return;

  const projectType = document.getElementById("projectType");
  const projectSize = document.getElementById("projectSize");
  const projectGoal = document.getElementById("projectGoal");
  const resetButton = document.getElementById("resetBuilder");

  const solutionIcon = document.getElementById("solutionIcon");
  const solutionName = document.getElementById("solutionName");
  const solutionDescription = document.getElementById("solutionDescription");
  const solutionFeatures = document.getElementById("solutionFeatures");
  const solutionTimeline = document.getElementById("solutionTimeline");
  const solutionBudget = document.getElementById("solutionBudget");

  const copyButton = document.getElementById("copyRequirements");
  const copyStatus = document.getElementById("copyStatus");
  const contactLink = document.getElementById("contactWithRequirements");

  const projects = {
    website: {
      name: "Responsive Business Website",
      icon: "⌘",
      description: "A professional website built around your business goals."
    },
    webapp: {
      name: "Web Application / Dashboard",
      icon: "▤",
      description: "An interactive web application tailored to your workflows."
    },
    software: {
      name: "Custom Business Software",
      icon: "⚙",
      description: "Software designed around your business operations."
    },
    design: {
      name: "UI/UX Design",
      icon: "▣",
      description: "Clear, user-friendly interfaces and digital experiences."
    },
    ai: {
      name: "AI-Powered Solution",
      icon: "✳",
      description: "AI features designed for suitable business use cases."
    },
    ecommerce: {
      name: "E-commerce Website",
      icon: "🛍️",
      description: "An online shopping experience for your customers."
    },
    integration: {
      name: "API / System Integration",
      icon: "⇄",
      description: "Connected systems that help information move between tools."
    },
    maintenance: {
      name: "Website Maintenance",
      icon: "🛠️",
      description: "Ongoing updates, bug fixes and website improvements."
    }
  };

  const sizes = {
    small: {
      timeline: "1–2 weeks",
      budget: "₹5k–₹15k"
    },
    medium: {
      timeline: "2–4 weeks",
      budget: "₹15k–₹35k"
    },
    large: {
      timeline: "4–8+ weeks",
      budget: "₹35k+"
    }
  };

  const featureNames = {
    responsive: "Responsive Design",
    admin: "Admin Dashboard",
    auth: "User Accounts & Login",
    payments: "Online Payments",
    ai: "AI Features",
    analytics: "Reports & Analytics",
    integrations: "Third-party Integrations",
    support: "Ongoing Support"
  };

  const goalNames = {
    presence: "Build an online presence",
    sales: "Generate leads or sales",
    automation: "Automate business processes",
    management: "Manage teams and data",
    experience: "Improve customer experience"
  };

  function getSelectedFeatures() {
    return Array.from(
      form.querySelectorAll('input[name="features"]:checked')
    ).map(input => featureNames[input.value] || input.value);
  }

  function updatePreview() {
    const project = projects[projectType.value] || projects.website;
    const size = sizes[projectSize.value] || sizes.medium;
    const selectedFeatures = getSelectedFeatures();

    solutionIcon.textContent = project.icon;
    solutionName.textContent = project.name;
    solutionDescription.textContent = project.description;

    solutionTimeline.textContent = size.timeline;
    solutionBudget.textContent = size.budget;

    solutionFeatures.replaceChildren();

    const items = [
      `Project: ${project.name}`,
      `Project size: ${projectSize.options[projectSize.selectedIndex].text}`,
      `Main goal: ${goalNames[projectGoal.value] || projectGoal.value}`,
      ...selectedFeatures
    ];

    items.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      solutionFeatures.appendChild(li);
    });

    form.querySelectorAll(".option-card").forEach(card => {
      const checkbox = card.querySelector('input[name="features"]');

      card.classList.toggle(
        "selected",
        Boolean(checkbox && checkbox.checked)
      );
    });

    if (contactLink) {
      contactLink.href =
        `./contact.html?service=${encodeURIComponent(project.name)}`;
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }
  }

  form.addEventListener("change", event => {
    if (event.target.matches("select, input[name='features']")) {
      updatePreview();
    }
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      form.reset();
      updatePreview();
    });
  }

  function createSummary() {
    const project = projects[projectType.value] || projects.website;
    const size = sizes[projectSize.value] || sizes.medium;
    const selectedFeatures = getSelectedFeatures();

    return [
      "NexGeniusTech - Project Requirements",
      "",
      `Project: ${project.name}`,
      `Size: ${projectSize.options[projectSize.selectedIndex].text}`,
      `Main goal: ${goalNames[projectGoal.value] || projectGoal.value}`,
      `Features: ${selectedFeatures.length ? selectedFeatures.join(", ") : "None selected"}`,
      `Indicative timeline: ${size.timeline}`,
      `Indicative budget: ${size.budget}`,
      "",
      "Note: Estimates are indicative and subject to final requirements."
    ].join("\n");
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const summary = createSummary();

      try {
        await navigator.clipboard.writeText(summary);

        if (copyStatus) {
          copyStatus.textContent = "Project summary copied successfully!";
        }
      } catch {
        const temporaryField = document.createElement("textarea");
        temporaryField.value = summary;
        temporaryField.style.position = "fixed";
        temporaryField.style.opacity = "0";

        document.body.appendChild(temporaryField);
        temporaryField.select();

        const copied = document.execCommand("copy");
        temporaryField.remove();

        if (copyStatus) {
          copyStatus.textContent = copied
            ? "Project summary copied successfully!"
            : "Copy failed. Please copy the summary manually.";
        }
      }
    });
  }

  updatePreview();
});
