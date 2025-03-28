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

// Function to dynamically create the Skills section from a JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" />
                            <h4 class="card-title mt-3">${item.title}</h4>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;
                row.appendChild(card);
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Function to dynamically create the Portfolio section from a JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" style="width:100%">
                    <div class="card-body">
                        <h4 class="card-title">${item.title}</h4>
                        <p class="card-text">${item.text}</p>
                        <div class="text-center">
                            <a href="${item.link}" class="btn btn-success">Lien</a>
                        </div>
                    </div>
                </div>
                `;
                row.appendChild(card);
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Function to dynamically insert the profile picture
function createProfilePicture() {
    const profileData = {
        id: "profile-picture",
        image: "images/photo-profil-P12.png",
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
    const message = hours < 12 ? "Bonjour " : hours < 18 ? "Bon après-midi " : "Bonsoir ";
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
