const STORAGE_KEY = "jessPhotoRequestList";
const JESS_EMAIL = "replace-with-jess-email@example.com";

function getList() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(list)]));
  updateCartCount();
  renderSelectedList();
  syncPhotoIdsTextarea();
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = getList().length;
  });
}

function renderSelectedList() {
  const container = document.querySelector("[data-selected-list]");
  if (!container) return;

  const list = getList();
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p>No photos selected yet. Go to an album and add some favourites.</p>`;
    return;
  }

  list.forEach((id) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `<strong>${id}</strong><button type="button" aria-label="Remove ${id}">×</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      saveList(getList().filter((photoId) => photoId !== id));
    });
    container.appendChild(chip);
  });
}

function syncPhotoIdsTextarea() {
  const textarea = document.querySelector("[data-photo-ids]");
  if (textarea) textarea.value = getList().join("\n");
}

function setupAddButtons() {
  document.querySelectorAll("[data-add-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-photo-id]");
      const id = card.dataset.photoId;
      const list = getList();
      if (!list.includes(id)) list.push(id);
      saveList(list);
      button.textContent = "Added";
      setTimeout(() => (button.textContent = "Add to request"), 900);
    });
  });
}

function setupClearButton() {
  const clear = document.querySelector("[data-clear-list]");
  if (clear) clear.addEventListener("click", () => saveList([]));
}

function setupLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  if (!lightbox) return;

  const lightboxImg = document.querySelector("[data-lightbox-img]");
  const caption = document.querySelector("[data-lightbox-caption]");

  document.querySelectorAll("[data-open-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-photo-id]");
      const img = button.querySelector("img");
      lightboxImg.src = img.src;
      caption.textContent = `${card.dataset.photoId} - ${card.dataset.photoTitle || "Preview"}`;
      lightbox.hidden = false;
    });
  });

  document.querySelector("[data-close-lightbox]").addEventListener("click", () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.hidden = true;
      lightboxImg.src = "";
    }
  });
}

function setupRequestForm() {
  const form = document.querySelector("#requestForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Photo request for Jess Photography");
    const body = encodeURIComponent([
      "Hi Jess,",
      "",
      "I'd like to request these full-quality photos:",
      data.get("photoIds"),
      "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Payment note / PayPal transaction ID: ${data.get("payment") || "Not provided"}`,
      "",
      "Message:",
      data.get("message") || "No extra message",
    ].join("\n"));

    window.location.href = `mailto:${JESS_EMAIL}?subject=${subject}&body=${body}`;
  });
}

function setupYear() {
  document.querySelectorAll("#year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

setupYear();
updateCartCount();
renderSelectedList();
syncPhotoIdsTextarea();
setupAddButtons();
setupClearButton();
setupLightbox();
setupRequestForm();
