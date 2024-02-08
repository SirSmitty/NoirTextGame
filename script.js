var game_data;
var current_state;

var stim = 0;
var points = 0;

function startGame() {
    // Hide the start game button
    document.getElementById('startGameButton').style.display = 'none';

    // Show the other buttons
    document.getElementById('gameControls').style.display = 'block';

}


// This function toggles the music on and off
function toggleSound() {
    var audioEl = document.getElementById('bg_music');
    if (audioEl.paused) {
        audioEl.play();
    } else {
        audioEl.pause();
    }
}


setTimeout(function () {
    $('#splash').hide();
    $('#main').show();
}, 5000);

$.getJSON("game.json", function (data) {
    game_data = data;
    current_state = data['start_state'];
    $('#game_text').html(game_data['states'][data['start_state']]['text']);
    $('#game_img').html(game_data['states'][data['start_state']]['image_change']);
});

function next_state(state) {
    console.log("Current State = " + current_state + " --> New State= " + state)
    current_state = state
    if (game_data['states'][current_state]['text'] != null) {
        $('#game_text').html(game_data['states'][current_state]['text']);
    } else {
        console.log("no text");
        if (game_data['states'][current_state]['stim_change'] != null) {
            console.log("+ stim " + game_data['states'][current_state]['stim_change'])
            stim = stim + game_data['states'][current_state]['stim_change']
        }
        if (game_data['states'][current_state]['point_change'] != null) {
            console.log("+ point " + game_data['states'][current_state]['point_change'])
            points = points + game_data['states'][current_state]['point_change']
        }
        if (game_data['states'][current_state]['image_change'] != null) {
            $("#game_img").html(game_data['states'][current_state]['image_change']);
        }
        next_state(game_data['states'][current_state]['next_state'])
    }
}

function key_input(what_key) {
    for (i = 0; i < game_data['states'][current_state]['next_state'].length; i++) {
        if (what_key == game_data['states'][current_state]['next_state'][i]['key_input']) {
            next_state(game_data['states'][current_state]['next_state'][i]['state_name'])
        }
    }
    console.log(what_key);
}
