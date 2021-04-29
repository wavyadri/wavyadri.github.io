const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        // Toggle nav
        nav.classList.toggle("nav-active");
    
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4}s`;
            }    
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

//Typewriter Effect
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    // set to 0 by default bc arrays start at 0
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    // boolean
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    
    // Check if deleting
    if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML =`<span class="txt">${this.txt}</span>`;

    // Inital Type Speed
    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // Pause at end of word
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before typing next word
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// first initialize
//Init on DOM Load
//event handler
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init Typewriter
    new TypeWriter(txtElement, words, wait);
}


// Projects Tabs
// grab all the clickable icons 
const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

// Select tab content item
function selectItem(e) {
    // First remove border everywhere
    removeBorder();
    // First remove show everywhere
    removeShow();
    // Add border to current tab
    this.classList.add('tab-highlight');
    // grab content item from DOM
    const tabContentItem = document.querySelector(`#${this.id}-content`);
	// Add show class
	tabContentItem.classList.add('show');
}

function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab-highlight'));
}

function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show'));
}

// listen for tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));
