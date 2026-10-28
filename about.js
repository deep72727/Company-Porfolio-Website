
/* About Page JavaScript */

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });

    document.addEventListener("click", (event) => {
        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }
    });
}

// Header scroll effect
const siteHeader = document.querySelector(".site-header");

function updateHeader() {
    if (siteHeader) {
        siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
    }
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Dynamic footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
