"use strict";

let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

document.addEventListener("DOMContentLoaded", function(event) {
    let body = document.querySelector('body');
    let links = document.querySelectorAll('.menu__list>li');
    let burger = document.querySelector('.burger');
    let menu = document.querySelector('.menu__list');
    let back = document.querySelector('.background-grey');
    let arrow = document.querySelectorAll('.menu__arrow');

    burger.addEventListener('click', function() {
        burger.classList.toggle('toggle');
        menu.classList.toggle('open')
        body.classList.toggle('hidden');
        back.classList.toggle('back');

        if (arrow) {
            offAllArrows(arrow);
        }
    })

    if (isMobile.any()) {
        body.classList.add('touch');

        let subArrow = document.querySelectorAll('.submenu__arrow');
        let lastArrow;
        let lastSubArrow;

        handleArrow(arrow, lastArrow, true, menu, subArrow);
        handleArrow(subArrow, lastSubArrow, false, menu, arrow);
    }
    else {
        body.classList.add('mouse');

        links.forEach((value, index) => {
            value.addEventListener('mouseover', function() {
                back.classList.toggle('back');
            })
            value.addEventListener('mouseout', function() {
                back.classList.toggle('back');
            })
        }) 
    }
    
});

function switchArrow(thisArrow, subMenu) {
    subMenu.classList.toggle('open');
    thisArrow.classList.toggle('active');
}

function offAllArrows(arrow) {
    for (let i = 0; i < arrow.length; i++) { 
        if (arrow[i].classList.contains('active')) {
            arrow[i].nextElementSibling.classList.toggle('open');
            arrow[i].classList.toggle('active');
        }
    }
}

function handleArrow(arrow, lastArrow, sub, menu, subArrow) {
    for (let i = 0; i < arrow.length; i++) {
        let thisLink = arrow[i].previousElementSibling;
        let subMenu = arrow[i].nextElementSibling;
        let thisArrow = arrow[i];

        arrow[i].addEventListener('click', function() {
            if (thisArrow == lastArrow) {
                switchArrow(thisArrow, subMenu);
            }
            else if (sub) {
                offAllArrows(arrow);
                offAllArrows(subArrow);
                switchArrow(thisArrow, subMenu);
                scrollTo(thisLink.parentElement, menu);
            }
            else {
                offAllArrows(arrow);
                switchArrow(thisArrow, subMenu);
                scrollTo(thisLink.parentElement, menu, thisLink.closest('li'));
            }

            lastArrow = thisArrow
        })
    }
}

function scrollTo(elem, cont, parElem){
    let topPos = elem.offsetTop;
    if (parElem) {
        topPos = parElem.offsetTop + elem.offsetTop + 63;
    }
    cont.scrollTop = topPos;
}