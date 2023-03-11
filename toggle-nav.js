window.onload = updateToggle;
addEventListener("resize", updateToggle);

function toggleNav() {
    let nav = document.getElementById('nav');
    if (isCollapsed(nav)) nav.style.display = 'flex';
    else nav.style.display = 'none';

    updateToggle();
}

function updateToggle() {
    let nav = document.getElementById('nav');
    let toggler = document.getElementById('toggler');
    let burger = toggler.firstChild;    
    let cross = toggler.lastChild;
    
   
    if (isCollapsed(nav)) {
        toggler.style.left = '0';
        cross.style.display = 'none';
        burger.style.display = 'block';
    } else {
        //offset toggle with the width of the nav
        toggler.style.left = (nav.offsetWidth-1).toString() +'px';
        cross.style.display = 'block';
        burger.style.display = 'none';
    }
}

function isCollapsed(nav) {
    return window.getComputedStyle(nav, null).display === 'none';
}
