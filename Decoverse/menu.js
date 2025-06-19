document.addEventListener("DOMContentLoaded", () => {
  const navOverlay = document.getElementById("myNav");
  const toggleButton = document.querySelector(".custom_menu-btn button");
  const contactButtons = document.querySelectorAll(".cta-button");

  // 1. Hamburger Menu Toggle
  toggleButton.addEventListener("click", () => {
    const isOpen = navOverlay.style.height === "100%";
    navOverlay.style.height = isOpen ? "0%" : "100%";
  });

  // 2. Contact Us Buttons Redirection (optional: only needed if JS-only redirect preferred)
  contactButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Optional: e.preventDefault(); // Only use if you want to force JS redirect
      window.location.href = "contact.html";
    });
  });
});
