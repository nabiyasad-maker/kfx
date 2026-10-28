
const weapons = [
  {
    name: "AK-47",
    type: "RIFLE",
    description: "Powerful assault rifle",
    image: "https://wiki.cs.money/images/weapons/ak-47.png"
  },
  {
    name: "M4A1-S",
    type: "RIFLE",
    description: "Silenced assault rifle",
    image: "https://wiki.cs.money/images/weapons/m4a1-s.png"
  },
  {
    name: "FAMAS",
    type: "RIFLE",
    description: "Burst-fire rifle",
    image: "https://wiki.cs.money/images/weapons/famas.png"
  },
  {
    name: "AWP",
    type: "SNIPER",
    description: "High-impact sniper rifle",
    image: "https://wiki.cs.money/images/weapons/awp.png"
  },
  {
    name: "SSG 08",
    type: "SNIPER",
    description: "Light sniper rifle",
    image: "https://wiki.cs.money/images/weapons/ssg-08.png"
  },
  {
    name: "Desert Eagle",
    type: "PISTOL",
    description: "High-powered pistol",
    image: "https://wiki.cs.money/images/weapons/desert-eagle.png"
  },
  {
    name: "Glock-18",
    type: "PISTOL",
    description: "T-side starting pistol",
    image: "https://wiki.cs.money/images/weapons/glock-18.png"
  },
  {
    name: "USP-S",
    type: "PISTOL",
    description: "Silenced pistol",
    image: "https://wiki.cs.money/images/weapons/usp-s.png"
  }
];

const weaponGrid = document.getElementById("weaponGrid");
const searchInput = document.getElementById("weaponSearch");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "ALL";

function renderWeapons() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredWeapons = weapons.filter(weapon => {
    const matchesType =
      activeFilter === "ALL" || weapon.type === activeFilter;

    const matchesSearch =
      weapon.name.toLowerCase().includes(query) ||
      weapon.type.toLowerCase().includes(query);

    return matchesType && matchesSearch;
  });

  if (filteredWeapons.length === 0) {
    weaponGrid.innerHTML =
      '<p class="no-results">Qurol topilmadi. Boshqa nomni yozib ko‘r.</p>';
    return;
  }

  weaponGrid.innerHTML = filteredWeapons.map(weapon => `
    <article class="weapon-card">
      <img
        src="${weapon.image}"
        alt="${weapon.name}"
        loading="lazy"
        onerror="this.style.display='none'">

      <div class="weapon-type">${weapon.type}</div>
      <h3>${weapon.name}</h3>
      <p>${weapon.description}</p>
      <button type="button" data-weapon="${weapon.name}">
        QUROLNI TANLASH ↗
      </button>
    </article>
  `).join("");
}

searchInput.addEventListener("input", renderWeapons);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderWeapons();
  });
});

weaponGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-weapon]");
  if (!button) return;

  showToast(button.dataset.weapon + " tanlandi!");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Menyuni yopish" : "Menyuni ochish"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menyuni ochish");
    menuToggle.textContent = "☰";
  });
});

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

renderWeapons();
