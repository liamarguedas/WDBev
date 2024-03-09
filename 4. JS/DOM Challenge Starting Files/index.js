var google = document.getElementsByTagName("a")[0];
var btn = document.querySelector("button");
google.style.color = "red";

function hideElement() {
    document.querySelector("li").classList.add("hidden")
}

function makeHuge(element) {
    document.querySelector(element).classList.add("huge");
}

function changeColor() {
    if ( document.querySelector("body").style.backgroundColor === "white") {
       
        document.querySelector("body").style.backgroundColor = "blue";

    } else {
        document.querySelector("body").style.backgroundColor = "white";
    }
}

btn.addEventListener("click", makeHuge("h1"));