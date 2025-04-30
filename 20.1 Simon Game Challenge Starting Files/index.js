const BTNS = $("div .btn");

function addMouseEvents() {
    BTNS.on("click", function() {
        game.onButtonPressed(this);
    });
    BTNS.on("mousedown", function() {
        $(this).addClass("pressed");
    });
    BTNS.on("mouseup", function() {
        $(this).removeClass("pressed");
    });
}

function setTitle(msg) {
    $("h1").text(msg);
}

function blinkElem(btn) {
    $(btn).fadeOut().fadeIn();
}

function SimonGame() {
    this.running = false;
    this.sequence = [];
    this.guessCount = 0;

    this.onButtonPressed = function(btn) {
        if (!this.running) return;
        if (this.takeGuess(btn.id)){
            if (this.guessCount == this.sequence.length) {
                this.nextRound();
            }
        } else {
            setTitle("Game over... 😒");
            gameOver();
            this.running = false;
        }
    }

    this.takeGuess = function(btnId) {
        if (this.checkGuess(btnId)) {
            this.guessCount++;
            return true;
        }
        return false;
    }

    this.checkGuess = function(btnId) {
        return this.sequence[this.guessCount].id === btnId;
    }

    this.incrementSequence = function() {
        var nextBtn = BTNS[Math.floor(Math.random() * BTNS.length)];
        blinkElem(nextBtn);
        this.sequence.push(nextBtn);
    }

    this.nextRound = function() {
        this.guessCount = 0;
        this.running = true;
        this.incrementSequence();
        this.playerInputsLeft = this.sequence.length - 1;
    }

    this.start = function() {
        addMouseEvents();
        this.running = true;
        this.nextRound();
    }
}


var game = new SimonGame();


$(document).on("keydown", function (event) {
    if (event.key === "a" && !game.running) {
        setTitle("Do as Simon says.");
        console.log("New game started.");
        game.start();
    }
});
