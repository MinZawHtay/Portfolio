// ==================== Navbar Toggle ====================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ==================== Scroll Sections & Sticky Header ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky header
    header.classList.toggle('sticky', top > 100);

    // Close navbar on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ==================== Read More Toggle ====================
const readMoreBtn = document.getElementById("readMoreBtn");
const aboutText = document.querySelector(".about-text");

readMoreBtn.addEventListener("click", () => {
    aboutText.classList.toggle("show-full");
    readMoreBtn.textContent = aboutText.classList.contains("show-full") ? "Read Less" : "Read More";
});

// ==================== Form Validation ====================
const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const mess = document.getElementById('message');

const items = document.querySelectorAll(".item");

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/i;
    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

function checkInputs() {
    items.forEach(item => {
        if (!item.value.trim()) {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        } else {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
        }

        if (item === email) checkEmail();

        item.addEventListener("keyup", () => {
            if (item.value.trim()) {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    });
}

function sendEmail() {
    const templateParams = {
        subject: subject.value,
        full_name: fullName.value,
        email: email.value,
        phone: phone.value,
        message: mess.value
    };
    
    emailjs.send('service_igcryoe', 'template_ifvgx99', templateParams)
        .then(response => {
            Swal.fire({
                title: "Success",
                text: "Message sent successfully!",
                icon: "success"
            });
            form.reset();
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Failed to send message: " + error.text,
                icon: "error"
            });
        });
}


form.addEventListener("submit", e => {
    e.preventDefault();
    checkInputs();

    const hasError = [...items].some(item => item.classList.contains("error"));
    if (!hasError) sendEmail();
});
