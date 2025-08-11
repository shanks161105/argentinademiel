const destinations = [
  {
    id: 1,
    name: "Patagonia",
    description:
      "Explora los impresionantes glaciares, montañas y lagos cristalinos de la Patagonia argentina.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
    ],
  },
  {
    id: 2,
    name: "Buenos Aires",
    description:
      "Disfruta de la vibrante cultura, arquitectura colonial y la famosa vida nocturna de la capital argentina.",
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522040802595-cb0a637f7b9b?auto=format&fit=crop&w=800&q=80"
    ],
  },
  {
    id: 3,
    name: "Mendoza",
    description:
      "Visita las mejores bodegas de vino y disfruta de paisajes increíbles al pie de los Andes.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80&h=500",
      "https://images.unsplash.com/photo-1512935035289-9dfe6c1f1d91?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501696461810-7c8d16bdeab7?auto=format&fit=crop&w=800&q=80"
    ],
  },
];

// Variables para modal y carrusel
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalImg = document.getElementById("modal-img");
const closeModalBtn = document.getElementById("close-modal");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentImages = [];
let currentIndex = 0;

// Función para renderizar destinos
function renderDestinations() {
  const container = document.getElementById("destinations");
  container.innerHTML = "";

  destinations.forEach((dest) => {
    const card = document.createElement("article");
    card.className = "destination-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");

    card.innerHTML = `
      <img src="${dest.images[0]}" alt="Imagen de ${dest.name}" loading="lazy" />
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
    `;

    card.addEventListener("click", () => openModal(dest));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(dest);
      }
    });

    container.appendChild(card);
  });
}

// Función para abrir modal y mostrar carrusel
function openModal(dest) {
  currentImages = dest.images;
  currentIndex = 0;
  updateModalContent(dest.name, dest.description, currentImages[currentIndex]);
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  closeModalBtn.focus();
}

function updateModalContent(title, desc, imgSrc) {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalImg.src = imgSrc;
  modalImg.alt = `${title} - Imagen ${currentIndex + 1} de ${currentImages.length}`;
  modalImg.classList.remove("fade-in");
  void modalImg.offsetWidth; // Reflow para reiniciar animación
  modalImg.classList.add("fade-in");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

// Navegación carrusel
function showPrevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateModalContent(modalTitle.textContent, modalDesc.textContent, currentImages[currentIndex]);
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateModalContent(modalTitle.textContent, modalDesc.textContent, currentImages[currentIndex]);
}

// Eventos
closeModalBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (modal.classList.contains("show")) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  }
});

// Inicializar
renderDestinations();
