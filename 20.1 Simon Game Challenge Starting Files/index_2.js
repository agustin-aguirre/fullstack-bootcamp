const BTNS = $("div .btn").toArray();


function playSequence(sequence) {
    sequence.forEach(function(element) {
        $(element).fadeOut().fadeIn();
    });
}

function restart(game) {
    game = new SimonGame();
    game.start();
}


function GameState() {
    this.running = false;
    this.showingSequence = false;
    this.sequence = [];

    this.incrementSequence = function() {
        var nextBtn = BTNS[Math.floor(Math.random() * BTNS.length)];
        this.sequence.push(nextBtn);
    }
}


function SimonGame() {
    this.state = new GameState();
    
    this.start = function() {
        if (this.state.running) return;
        $("h1").text("Do as Simon says!");
        this.playTurn();
    }

    this.playTurn = function() {
        this.state.incrementSequence();
        playSequence(this.state.sequence);
    };

    this.playerClick = function(btn) {
        if(!this.state.running) return;
        if(this.state.showingSequence) return;
        $(btn).fadeTo(".pressed").fadeTo(".btn");
    };
}


var game = new SimonGame();

BTNS.forEach((elem) => {
    $(elem).click(() => game.playerClick(elem));
});

$(document).on("keydown", function(event) {
    if (event.key == "a")
        game.start();
});