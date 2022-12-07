/*
 * WEB222 – Final Assessment
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Viren Vinodray Gajera
 *      Student ID: 157103219
 *      Date:       December 12, 2022
 */

/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close');

const name= document.getElementById('name');
const email= document.getElementById('email');
const address= document.getElementById('address');
const city= document.getElementById('city');
const postal= document.getElementById('postal');
const message= document.getElementById('message');

// SHOW
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show');
});

// HIDDEN
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show');
});

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', scrollActive);

function scrollActive(){
    const scrollY = window.pageXOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionID = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionID + ']'.classList.add(active));
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionID + ']'.classList.remove(active));
        }
    });
}

function showMessageBox(x){
    if (x==0) {
        document.getElementById("messageBox").style.display = "block";
    }
    else{
        document.getElementById("messageBox").style.display = "none";
    }
}

const form = document.getElementById('form');

form.addEventListener('submit', function(e){
    e.preventDefault();

    validateInputs();

    const prePayData = new FormData(form);
    const payData = new  URLSearchParams(prePayData);

    console.log([...payData]);

    fetch('https://httpbin.org/post', {
        method: "POST",
        body: payData,
    })
        .then(result => result.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
      
        
});

const disError = (element, message) => {
    const inputCon = element.parentElement;
    const errorDis = inputCon.querySelector('.error');

    errorDis.innerText = message;
    inputCon.classList.add('error');
    inputCon.classList.remove('success');

};

const succ = element => {
    const inputCon = element.parentElement;
    const errorDis = inputCon.querySelector('.error');

    errorDis.innerText = '';
    inputCon.classList.add('success');
    inputCon.classList.remove('error');
};

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// const validateInputs = () => 
function validateInputs(){
    const nameValue = name.value.trim();
    const emailValue= email.value.trim();
    const addressValue= address.value.trim();
    const cityValue= city.value.trim();
    const postalValue= postal.value.trim();
    const messageValue= message.value.trim();

    if (nameValue === '' || nameValue == null) {
        disError(name, 'name is required!');
    } else {
        succ(name);
    }

    if(emailValue == '' || emailValue == null) {
        disError(email, 'Email is required');
    } else if (!validateEmail(emailValue)) {
        disError(email, 'Provide a valid email address');
    } else {
        succ(email);
    }

    if (addressValue === '' || addressValue == null) {
        disError(address, 'Street address is required!');
    } else {
        succ(address);

    }if (cityValue === '' || cityValue == null) {
        disError(city, 'City name is required!');
    } else {
        succ(city);
    
    }if (postalValue === '' || postalValue == null) {
        disError(postal, 'City name is required!');
    } else {
        succ(postal);

    }if (messageValue === '' || messageValue == null) {
        disError(message, 'Please, provide a message!');
    } else {
        succ(message);
    }


};

var popup = document.getElementById('popup');

function openPopUp(){
    if(validateInputs){
    popup.classList.add('openPopUp');
    }
}

function closePopUp(){
    if(validateInputs){
    popup.classList.remove('openPopUp');
    }
}





