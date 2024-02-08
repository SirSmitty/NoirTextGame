var game_data;
var current_state;

var stim = 0;
var points = 0;

setTimeout(function () {
    $('#splash').hide();
    $('#main').show();
}, 5000);

$.getJSON("game.json", function (data) {
    game_data = data;
    current_state = data['start_state'];
    $('#game_text').html(game_data['states'][data['start_state']]['text']);
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
