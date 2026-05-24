//Елементи

const cardsContainer = document.querySelector(".cards");
const backToTopButton = document.querySelector(".back-to-top");

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const learnButton = document.querySelector(".learn-btn");
const moreInfo = document.querySelector(".more-info");

const exploreButton = document.querySelector(".explore-btn");
const aboutSection = document.querySelector(".about");

const contactForm = document.querySelector(".contact-form");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const messageInput = document.querySelector(".message-input");
const formMessage = document.querySelector(".form-message");

const sections = document.querySelectorAll("section[id]");
//Данни за картите
const cardsData = [
    {
        title: "Speed",
        text: "Clean design with aggressive energy.",
        category: "performance"
    },
    {
        title: "Style",
        text: "Modern layout with premium dark aesthetic.",
        category: "design"
    },
    {
        title: "Control",
        text: "Built step by step while learning front-end.",
        category: "learning"
    },
    {
        title: "Power",
        text: "Built for speed and adrenaline.",
        category: "performance"
    },
    {
        title: "Night Ride",
        text: "Built for dark cinematic street rides.",
        category: "design"
    }
];
// Функция за рендиране на картите
function renderCards(cards) {
    cardsContainer.innerHTML = "";

    cards.forEach(function(card) {
        cardsContainer.innerHTML += `
            <div class="card">
                <h3>${card.title}</h3>
                <p>${card.text}</p>
            </div>
        `;
    });
}

renderCards(cardsData);
// Филтриране на картите
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const category = button.dataset.category;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        if (category === "all") {
            renderCards(cardsData);
        } else {
            const filteredCards = cardsData.filter(function(card) {
                return card.category === category;
            });

            renderCards(filteredCards);
        }
    });
});
// Показване и скриване на допълнителна информация
function updateButtonText() {
    if (moreInfo.classList.contains("show")) {
        learnButton.textContent = "Show Less";
    } else {
        learnButton.textContent = "Learn More";
    }
}

learnButton.addEventListener("click", function() {
    moreInfo.classList.toggle("show");

    updateButtonText();
});

exploreButton.addEventListener("click", function() {
    aboutSection.scrollIntoView({
        behavior: "smooth"
    });
});
// Валидация на формата
function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}
// Обработка на изпращане на формата
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    messageInput.classList.remove("input-error");

    if (nameValue === "") {
        nameInput.classList.add("input-error");
    }

    if (emailValue === "") {
        emailInput.classList.add("input-error");
    }

    if (messageValue === "") {
        messageInput.classList.add("input-error");
    }
// Проверка за попълнени полета
    if (nameValue === "" || emailValue === "" || messageValue === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        return;
    }
// Проверка за валиден имейл
    if (isValidEmail(emailValue) === false) {
        emailInput.classList.add("input-error");

        formMessage.textContent = "Please enter a valid email address.";
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        return;
    }
// Ако всичко е валидно
    formMessage.textContent = "Message sent successfully!";
    formMessage.classList.remove("error");
    formMessage.classList.add("success");

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
});
//  Навигация
menuButton.addEventListener("click", function() {
    navLinks.classList.toggle("open");
});

navItems.forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("open");

        navItems.forEach(function(item) {
            item.classList.remove("active-link");
        });

        link.classList.add("active-link");
    });
});
// Активен линк при скролиране
function updateActiveLinkOnScroll() {
    let currentSection = "";

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }
    });
// Премахване на активния клас от всички линкове и добавяне на активен клас на текущия
    navItems.forEach(function(link) {
        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active-link");
        }
    });
}
// Показване на бутона за връщане нагоре
function updateBackToTopButton() {
    if (window.scrollY > 400) {
        backToTopButton.classList.add("show-top");
    } else {
        backToTopButton.classList.remove("show-top");
    }
}
// Обработка на скролиране
function handleScroll() {
    updateActiveLinkOnScroll();
    updateBackToTopButton();
}
// Слушател за скролиране и клик на бутона за връщане нагоре
window.addEventListener("scroll", handleScroll);

backToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// Първоначално извикване на функцията за да се актуализира състоянието при зареждане на страницата
handleScroll();