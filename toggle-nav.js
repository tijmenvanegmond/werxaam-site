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
    let aLeft = document.getElementById('nav-arrow-left');
    let aRight = document.getElementById('nav-arrow-right');

    if (isCollapsed(nav)) {
        toggler.style.left = '0';
        aLeft.style.display = 'none';
        aRight.style.display = 'block';
    } else {
        toggler.style.left = '16rem';
        aLeft.style.display = 'block';
        aRight.style.display = 'none';
    }
}

function isCollapsed(nav) {
    return window.getComputedStyle(nav, null).display === 'none';
}
