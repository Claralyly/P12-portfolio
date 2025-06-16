// Attendre que le DOM soit chargé avant d'exécuter les fonctions
document.addEventListener("DOMContentLoaded", () => {
    handleNavbarScroll();
    handleNavbarCollapse();
    createContactSection();
    createProfilePicture();
    createSkillsFromJSON();
    createPortfolioFromJSON();
    handleLinkClick();

    // Ajouter la classe de conteneur pour centrage
    const skillsRow = document.querySelector("#skills .row");
    if (skillsRow) {
        skillsRow.classList.add("cards-container");
    }

    // Message de bienvenue dynamique
    const hours = new Date().getHours();
    const message = hours < 12 ? "Bonjour " : hours >= 18 ? "Bonsoir " : "Bonjour ";
    document.querySelector(".hero_title").textContent = message;
});

// Fonction pour ajouter la classe "navbarDark" lors du scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        header.classList.toggle("navbarDark", window.scrollY >= 100);
    });
}

// Fonction pour gérer le collapse du menu sur mobile après un clic
function handleNavbarCollapse() {
    const menuToggle = new bootstrap.Collapse(document.getElementById("navbarSupportedContent"), { toggle: false });

    document.querySelectorAll(".nav-item").forEach((link) => {
        link.addEventListener("click", () => menuToggle.toggle());
    });
}

// Fonction pour créer la section Compétences dynamiquement
function createSkillsFromJSON() {
    fetch("data/skills.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector("#skills .row");
            container.innerHTML = ""; // On vide d'abord la section avant de remplir
            container.classList.add("cards-container"); // Ajout de la classe pour centrage

            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("col-md-4", "mt-4");

                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <a href="${item.link}" target="_blank">
                                <img src="images/${item.image}" alt="${item.title}" class="skills-image">
                            </a>
                            <h4 class="card-title mt-3">${item.title}</h4>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Erreur de chargement des compétences :", error));
}

// Fonction pour créer la section Portfolio dynamiquement
function createPortfolioFromJSON() {
    fetch("data/portfolio.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector("#portfolio .row");
            container.innerHTML = ""; // On vide d'abord la section avant de remplir

            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("col-md-6", "mt-4");

                card.innerHTML = `
                    <div class="card portfolioContent">
                        <a href="${item.link}" target="_blank">
                            <img class="card-img-top" src="images/${item.image}" alt="${item.title}">
                        </a>
                        <div class="card-body">
                            <h4 class="card-title">${item.title}</h4>
                            <p class="card-text">${item.text}</p>
                            <div class="text-center">
                                <a href="${item.link}" class="btn btn-success" target="_blank">Voir le projet</a>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Erreur de chargement du portfolio :", error));
}

// Insertion dynamique de la photo de profil
function createProfilePicture() {
    const profileData = {
        id: "profile-picture",
        image: "images/photo-profil-P12.webp",
        alt: "Portrait de Clara Aurélie",
    };

    const container = document.getElementById(profileData.id);
    const img = document.createElement("img");
    img.src = profileData.image;
    img.alt = profileData.alt;
    img.classList.add("imageAboutPage");
    container.appendChild(img);
}

// Création dynamique de la section Contact
function createContactSection() {
    const contactData = [
        {
            icon: "fa-regular fa-envelope",
            title: "Email",
            link: "mailto:claraaurelie@gmail.com",
        },
        {
            icon: "fa-brands fa-linkedin-in",
            title: "LinkedIn",
            link: "https://linkedin.com/in/aurélie-clara-502608254",
        },
        {
            icon: "fa-brands fa-whatsapp",
            title: "WhatsApp",
            link: "https://wa.me/33606060606",
        },
        {
            icon: "fa-brands fa-microsoft",
            title: "Microsoft Teams",
            link: "https://teams.microsoft.com/l/meetup-join/XXXXXXXXXX",
        },
    ];

    const contactContainer = document.querySelector("#contact .row");

    contactData.forEach((contact) => {
        const contactColumn = document.createElement("div");
        contactColumn.classList.add("col-lg-4", "mt-4", "contactColumn");

        contactColumn.innerHTML = `
            <a href="${contact.link}" target="_blank" class="icon-link" aria-label="${contact.title}">
                <i class="${contact.icon} fa-4x"></i>
            </a>
            <h3>${contact.title}</h3>
        `;

        contactContainer.appendChild(contactColumn);
    });
}

// Fonction pour changer la couleur des liens après clic
function handleLinkClick() {
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", function () {
            this.style.color = "#4b4b4b";
            this.style.opacity = "0.8";
        });
    });
}
