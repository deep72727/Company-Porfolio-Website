document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".builder-form");
  const preview = document.querySelector(".preview-card");
  const copyButton = document.querySelector(".preview-actions button");
  const copyStatus = document.getElementById("copyStatus");

  if (!form || !preview) return;

  const selects = form.querySelectorAll("select");
  const optionCards = form.querySelectorAll(".option-card");

  const getValue = (selector) => {
    const element = form.querySelector(selector);
    return element ? element.value : "";
  };

  const getSelectedOptions = () => {
    return Array.from(form.querySelectorAll(
      ".option-card.selected, .option-card.active, .option-card[aria-pressed='true']"
    )).map((card) => card.innerText.trim());
  };

  const getProjectDetails = () => {
    const values = Array.from(selects)
      .map((select) => ({
        label:
          select.closest(".field-group")?.querySelector(".field-label")
            ?.innerText.trim() || select.name || select.id || "Requirement",
        value: select.value.trim()
      }))
      .filter((item) => item.value);

    return values;
  };

  const updatePreview = () => {
    const details = getProjectDetails();
    const selectedOptions = getSelectedOptions();

    const title = preview.querySelector(".solution-heading");
    const description = preview.querySelector(".preview-body p");
    const featureList = preview.querySelector(".feature-list");

    const project = details.find((item) =>
      /service|project|solution|type/i.test(item.label)
    );

    if (title) {
      title.textContent = project
        ? `${project.value} Solution`
        : "Your Project Solution";
    }

    if (description) {
      description.textContent =
        "Your solution preview is updated based on the requirements you select.";
    }

    if (featureList) {
      featureList.replaceChildren();

      const features = [
        ...details.map((item) => `${item.label}: ${item.value}`),
        ...selectedOptions
      ];

      if (features.length === 0) {
        features.push("Select your requirements to build your solution.");
      }

      features.forEach((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        featureList.appendChild(item);
      });
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }
  };

  selects.forEach((select) => {
    select.addEventListener("change", updatePreview);
  });

  optionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const group = card.closest(".option-grid");

      if (group) {
        group.querySelectorAll(".option-card").forEach((item) => {
          item.classList.remove("selected", "active");
          item.setAttribute("aria-pressed", "false");
        });
      }

      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");

      updatePreview();
    });

    if (card.tagName === "BUTTON") {
      card.setAttribute("type", "button");
    }
  });

  if (form.tagName === "FORM") {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const firstEmptySelect = Array.from(selects).find(
        (select) => select.required && !select.value
      );

      if (firstEmptySelect) {
        firstEmptySelect.focus();

        if (copyStatus) {
          copyStatus.textContent = "Please complete the required selections.";
        }

        return;
      }

      updatePreview();

      if (copyStatus) {
        copyStatus.textContent = "Your solution preview is ready.";
      }
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const text = preview.innerText.trim();

      try {
        await navigator.clipboard.writeText(text);

        if (copyStatus) {
          copyStatus.textContent = "Solution copied successfully!";
        }
      } catch {
        if (copyStatus) {
          copyStatus.textContent =
            "Copy unavailable. Please select and copy the preview manually.";
      }
      }
    });
  }

  updatePreview();
});


