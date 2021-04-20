// Global Variables
const sections = document.querySelectorAll('section');
console.log(sections);
const navList = document.getElementById("navbar_list");
console.log(navList);
const navListFragment = document.createDocumentFragment();
console.log(navListFragment);

let activeMenu = undefined;
let activeSection = undefined;

// helper function
const isNearTopViewport = (element) => {
    const active = element.getBoundingClientRect();
    const headerHeight = document.querySelector(".header_top").offsetHeight;
    return active.top <= headerHeight + 60 && active.top >= 0 && active.bottom > 100;
};
const activateMenu = (menu) => {
  // get previous active menu
    if (activateMenu !== menu) {
    // deactivate prev active menu
    activeMenu && activeMenu.classList.remove('active');

    // activate menu
    menu.classList.add('active');

    activeMenu = menu;
    }
};


// building Navigation Bar
for (const section of sections) {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.setAttribute("href", `#${section.getAttribute('id')}`);
    anchor.className = 'menu_link';
    anchor.textContent = section.getAttribute('data-nav');
    li.appendChild(anchor);
    navListFragment.appendChild(li);
}
// add nav content to the page
navList.appendChild(navListFragment);


//  Add class 'active' to section when near top of viewport
const updateActiveSection = () => {
    for (const section of sections){
        if (isNearTopViewport(section)){
            if (activeSection !== section){
                // deactivate the prev section
                activeSection && activeSection.classList.remove('active');

                // activate the Section
                section.classList.add('active');
                activeSection = section;

                const menuToActivate = document.querySelector(
                    `a[href="#${section.getAttribute("id")}"]`)
                
                activateMenu(menuToActivate);
            }
            return;
        }
    }
} 
// Scroll to anchor ID using scrollIntoView event
navList.addEventListener('click', (event) => {
    event.preventDefault();

  // get linked section
const section = document.getElementById(
    event.target.getAttribute('href').replace('#', '')
    );

  // scroll to linked section
    
    section.scrollIntoView({ behavior: 'smooth' });
    });

document.addEventListener("scroll", updateActiveSection);
