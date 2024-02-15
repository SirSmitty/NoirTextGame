var game_data;
var current_state;

var stim = 0;
var points = 0;


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
    next_state(current_state);
    $('#game_text').html(game_data['states'][data['start_state']]['text']);
    $('#game_img').html(game_data['states'][data['start_state']]['image_change']);
});


function updateStateUI(state) {
    var currentStateData = game_data['states'][state];
    console.log("current state data: ", currentStateData)
    $('#game_text').html(currentStateData['text'] || "");
    $("#game_img").html(currentStateData['image_change'] || "");

    if (currentStateData['stim_change'] != null) {
        stim += currentStateData['stim_change'];
    }
    if (currentStateData['point_change'] != null) {
        points += currentStateData['point_change'];
    }
    updateButtons(currentStateData);
}

function updateButtons(currentStateData) {
    var nextStates = currentStateData['next_state'] || [];
    var buttonLabels = currentStateData['button_labels'] || [];

    $('.game_button').hide().off('click');

    nextStates.forEach(function (nextState, index) {
        var buttonId = (index === 0) ? '#but_a' : '#but_b';
        $(buttonId).show().text(buttonLabels[index]).on('click', function () {
            next_state(nextState['state_name']);
        });
    });

    if (nextStates && nextStates.length === 1) {
        $('#but_a').text(buttonLabels[0]).show().on('click', function () {
            next_state(nextStates[0]['state_name']);
        });
        $('#but_b').hide();
    } else if (nextStates && nextStates.length === 2) {
        $('#but_a').text(buttonLabels[0]).show().on('click', function () {
            next_state(nextStates[0]['state_name']);
        });
        $('#but_b').text(buttonLabels[1]).show().on('click', function () {
            next_state(nextStates[1]['state_name']);
        });
    } else {
        $('#but_a').hide();
        $('#but_b').hide();
    }
}

function next_state(state) {
    console.log("Transitioning to state: " + state);
    current_state = state;
    updateStateUI(current_state);
}

function key_input(what_key) {
    var currentStateData = game_data['states'][current_state];
    var nextState = currentStateData['next_state'].find(function (state) {
        return state['key_input'] === what_key;
    });

    if (nextState) {
        next_state(nextState['state_name']);
    }
    console.log(what_key);
}

