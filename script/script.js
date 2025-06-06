// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}


// Fonction pour créer la section Compétences dynamiquement
function createSkillsFromJSON() {
    fetch("data/skills.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector("#skills .row");
            container.innerHTML = ""; // On vide d'abord la section avant de remplir

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

// Appeler la fonction au chargement du document
document.addEventListener("DOMContentLoaded", () => {
    createSkillsFromJSON();
});



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

// Appeler la fonction au chargement du document
document.addEventListener("DOMContentLoaded", () => {
    createPortfolioFromJSON();
});

// Function to dynamically insert the profile picture
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

// Function to dynamically create the Contact section with clickable icons
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
            <a href="${contact.link}" target="_blank" class="icon-link">
                <i class="${contact.icon} fa-4x"></i>
            </a>
            <h3>${contact.title}</h3>
        `;

        contactContainer.appendChild(contactColumn);
    });
}

// Function to handle link color change after click
function handleLinkClick() {
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", function () {
            this.style.color = "#4b4b4b";
            this.style.opacity = "0.8";
        });
    });
}

// Dynamic greeting message based on the time of day
document.addEventListener("DOMContentLoaded", () => {
    const hours = new Date().getHours();
    const message = hours < 12 ? "Bonjour " : hours >= 18 ? "Bonsoir " : "Bonjour ";
    document.querySelector(".hero_title").textContent = message;

    // Call all dynamic functions
    createProfilePicture();
    createSkillsFromJSON();
    createPortfolioFromJSON();
    createContactSection();
    handleLinkClick();
});

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
