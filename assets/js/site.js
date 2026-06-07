const STORAGE_KEY = "ufpPhotoRequestList";
const PHOTOGRAPHER_EMAIL = "replace-with-jess-email@example.com";

function getList() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveList(list) {
  const clean = [...new Set(list)].sort();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  updateCartCount(); renderSelectedList(); syncPhotoIdsTextarea(); syncButtons();
}
function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = getList().length);
}
function syncButtons() {
  const list = getList();
  document.querySelectorAll("[data-add-photo]").forEach(button => {
    const card = button.closest("[data-photo-id]");
    const added = list.includes(card.dataset.photoId);
    button.textContent = added ? "Added" : "Add to request";
    button.classList.toggle("ghost", added);
  });
}
function renderSelectedList() {
  const container = document.querySelector("[data-selected-list]");
  if (!container) return;
  const list = getList(); container.innerHTML = "";
  if (!list.length) {
    container.innerHTML = `<p>No photos selected yet. Open an album and add a few demo photos first.</p>`;
    return;
  }
  list.forEach(id => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `<strong>${id}</strong><button type="button" aria-label="Remove ${id}">×</button>`;
    chip.querySelector("button").addEventListener("click", () => saveList(getList().filter(photoId => photoId !== id)));
    container.appendChild(chip);
  });
}
function syncPhotoIdsTextarea() {
  const textarea = document.querySelector("[data-photo-ids]");
  if (textarea) textarea.value = getList().join("\n");
}
function setupAddButtons() {
  document.querySelectorAll("[data-add-photo]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.closest("[data-photo-id]").dataset.photoId;
      const list = getList();
      if (list.includes(id)) saveList(list.filter(photoId => photoId !== id));
      else saveList([...list, id]);
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
  const img = document.querySelector("[data-lightbox-img]");
  const caption = document.querySelector("[data-lightbox-caption]");
  document.querySelectorAll("[data-open-lightbox]").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-photo-id]");
      const preview = button.querySelector("img");
      img.src = preview.src;
      caption.textContent = `${card.dataset.photoId} - ${card.dataset.photoTitle || "Preview only"}`;
      lightbox.hidden = false;
    });
  });
  document.querySelector("[data-close-lightbox]").addEventListener("click", () => { lightbox.hidden = true; img.src = ""; });
  lightbox.addEventListener("click", event => { if (event.target === lightbox) { lightbox.hidden = true; img.src = ""; } });
}
function setupRequestForm() {
  const form = document.querySelector("#requestForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Photo request - Ur Friendly Photographer");
    const body = encodeURIComponent([
      "Hi Ur Friendly Photographer,", "",
      "I'd like to request these full-quality photos:", data.get("photoIds"), "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `PayPal amount / transaction note: ${data.get("payment") || "Not provided"}`, "",
      "Message:", data.get("message") || "No extra message"
    ].join("\n"));
    window.location.href = `mailto:${PHOTOGRAPHER_EMAIL}?subject=${subject}&body=${body}`;
  });
}
function setupYear() { document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear()); }
setupYear(); updateCartCount(); renderSelectedList(); syncPhotoIdsTextarea(); setupAddButtons(); setupClearButton(); setupLightbox(); syncButtons();
