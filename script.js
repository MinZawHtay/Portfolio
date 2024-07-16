// toggle icon navbar
// scroll sections
// sticky header
// remove toggle icon and navbar when click navbar links (scroll)
// animation footer on scroll
const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const mess = document.getElementById('message')

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.
        value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;
    Email.send({
        SecureToken : "7f57368f-9cb8-4550-acf6-8b04f8c65fb3",
        To : 'minzawhtaymzh679@gmail.com',
        From : "minzawhtaymzh679@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success",
                text: "Message sent successfull!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items){
        if ( item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");

        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () =>{ 
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex =/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}


form.addEventListener("submit", (e) => { 
    e.preventDefault();
    
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.
    contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }

});




let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}



let sections = document.querySelectorAll('section');
let navLink = document.querySelectorAll('header nav a');
window.onscroll = () => {

    sections.forEach( sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top< offset + height) {
            navLink.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+ id +']').classList.add('active');
            } );
            sec.classList.add('show-animate');
        }
        else {
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}