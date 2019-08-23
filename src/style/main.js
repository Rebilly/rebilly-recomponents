//Tab system
'use strict';
let tabListItems = document.querySelectorAll('.tab-link'),
    tabContent = document.querySelectorAll('.tab-content-item');

let clearTabs = () => {
    for(let i = 0; i < tabListItems.length; i++){
        tabListItems[i].className = 'tab-link';
        tabContent[i].className = 'tab-content-item';
    }
}

let tabs = (event) => {
    event.preventDefault();
    clearTabs();


    let target = event.target,
        content = document.querySelector(target.getAttribute("href"));

    target.classList.add('is-active');
    content.classList.add('is-active');
}

for(let i = 0; i < tabListItems.length; i++){
    tabListItems[i].addEventListener("click", tabs, false);
}
