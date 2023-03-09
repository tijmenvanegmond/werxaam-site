window.onload = updateToggle;

function toggleNav() {
    let nav = document.getElementById('nav');
    if (isCollapsed(nav)) nav.style.display = 'flex';
    else nav.style.display = 'none';

    updateToggle();
}

function updateToggle() {
    let toggler = document.getElementById('toggler');
    let nav = document.getElementById('nav');

    if (isCollapsed(nav)) {
        toggler.style.left = '0';
    } else {
        toggler.style.left = '16rem';
    }
}

function isCollapsed(nav) {
    return window.getComputedStyle(nav, null).display === 'none';
}
