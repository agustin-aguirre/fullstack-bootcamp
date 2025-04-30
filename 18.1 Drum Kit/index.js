function playSound(key) {
    switch (key) {
        case "w":
            new Audio("./sounds/tom-1.mp3").play();
            break;
        case "a":
            new Audio("./sounds/tom-2.mp3").play();
            break;
        case "s":
            new Audio("./sounds/tom-3.mp3").play();
            break;
        case "d":
            new Audio("./sounds/tom-4.mp3").play();
            break;
        case "j":
            new Audio("./sounds/snare.mp3").play();
            break;
        case "k":
            new Audio("./sounds/crash.mp3").play();
            break;
        case "l":
            new Audio("./sounds/kick-bass.mp3").play();
            break;              
        default:
            console.log(key)
            break;
    }
}

function playAnimation(key) {
    var targetBtn = document.querySelector("." + key);
    if (targetBtn === null) return;
    targetBtn.classList.add("pressed");
    setTimeout(function () {
        targetBtn.classList.remove("pressed");
    }, 100);
}


document.querySelectorAll(".drum").forEach(button => button.addEventListener("click", function () {
    playSound(this.innerHTML);
    playAnimation(this.innerHTML);
}));

document.addEventListener("keydown", function (event) {
    playSound(event.key);
    playAnimation(event.key);
});