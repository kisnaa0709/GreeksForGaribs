var navButton = document.getElementById("navbutton")

function hovered() {
    navButton.innerHTML = 
    `
    <div class="dropdown" onmouseleave="unhovered()">
    <div class="sidenav">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
        <a href="#contact">Search</a>
    </div>
    </div>
    `
}
function unhovered(){
    navButton.innerHTML = 
    `
    <img src="img/menu.png" alt="" height="50px" onmouseenter="hovered()">
    `
}