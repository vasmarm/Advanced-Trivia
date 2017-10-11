// bank of questions, choices, answers
var bank = [
	{
		question: "Which is the capital of USA?",
		choices: ["Dallas", "Chicago", "Los Angeles", "Washington D.C"],
		answer: "Washington D.C"
	},{
		question: "What is the Man-Made object that is observable from the moon?",
		choices: ["Eiffel Tower", "Statue of Liberty", "Great Wall of China","Willis Tower"],
		answer: "Great Wall of China"
	},{
		question: "Which is the only VOWEL on a standard keyboard that is not on the top line of letters?",
		choices: ["E", "O", "A", "Q"],
		answer: "A"
	} 
];

var correct = 0;				// correct responses
var incorrect = 0;				// incorrect responses
var randomizedBank = bank;		// randomized bank
var selected = '';			 	// seleted choice in dropdown
var time = timeConverter(10);	// seconds on timer
var option = '';

//===========================================//
//          All functions                    //
//===========================================//

function printToScreen(){
	// hides result area
	$('#result-area').css("visibility","hidden");
	
	// re-prints
	$("#correct-counter").html(correct);
	$("#incorrect-counter").html(incorrect);
	$("#timer").html(timeConverter(10));
}

//===========================================//

// initGame() prints &&  hides && displays @ game start
function initGame() {
	// hides Start button
	$('#start-btn').css("visibility","hidden");
	// unhides Restart button
	$('#next-btn').css("visibility","hidden");
	$('#restart-btn').css("visibility","visible");

	// prints counters
	correct = 0;
	incorrect = 0;

	// re-prints to screen
	printToScreen();

	// unhides game area
	$("#game-area").css("visibility", "visible");
}


//===========================================//

// randomizes: bank array
function shuffle(array){
	for (var i=array.length - 1; i>0; i--) {
		var j = Math.floor(Math.random() * (i+1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}	
	return array;
}


//===========================================//

// prints: question from randomizedBank
function question() {

	// prints question w/ header
	$('#question-list').html(
		'<h4>Question '+ (correct+incorrect +1) +'</h4>' + // question # in header
		'<p>'+ randomizedBank[correct+incorrect].question + '</p>'	// question text, below header
	)

	// prints choices in dropdown
	option = '';
	$('#choices-list').append('<option> </option>');
	for (var i=0; i<randomizedBank[correct+incorrect].choices.length; i++) {  // https://stackoverflow.com/questions/3446069/populate-dropdown-select-with-array-using-jquery
   	option += '<option>' + randomizedBank[correct+incorrect].choices[i] + '</option>';
	}
	$('#choices-list').append(option);
}


//===========================================//

// validate choice w/ object.answer
function	validate(){
	// stop timer so image result can appear
	stopTimer();

	// if selected option = answer
	if (selected == randomizedBank[correct+incorrect].answer) {
		correct++;
		printToScreen();

		// display results
		$('#result-area').css("visibility","visible");
		$('#result-text').html("Correct!");
		$('#result-image').html('<img src="assets/images/win.gif"/>');
		$('#next-btn').css("visibility","visible");

		if ( (correct+incorrect) == randomizedBank.length) {
			gameOver();
		}

	} else {
		incorrect++;
		printToScreen();

		// display result
		$('#result-area').css("visibility","visible");
		$('#result-text').html("Incorrect!");
		$('#result-image').html('<img src="assets/images/loss.gif"/>');
		$('#next-btn').css("visibility","visible");

		if ( (correct+incorrect) == randomizedBank.length) {
			gameOver();
		}
	}

	// after validation, waits for onclick #next-btn
   $('#next-btn').on('click', function() {
   	nextQuestion();
   });
}

//===========================================//

// next question function or ends game
function	nextQuestion(){
	$('#next-btn').css("visibility","hidden");

	// get new question (delete old option/choices first)
	$("#choices-list").html("");
	question();

	// restart timer
	startTimer(time);

	// re-print: (1) correct/incorrect counter; (2) question; (3) choices; (4) timer
	printToScreen();
}


//===========================================//

// game over
function gameOver(){
	stopTimer();

	$('#next-btn').css("visibility","hidden");

	// display result
	$('#result-text').append("<p>...Game over...</p>");
}


//===========================================//
//    START GAME -- button click             //
//===========================================//

// start-btn
$("#start-btn").on('click', function(){
	startGame();
})


//===========================================//

// startGame
function startGame() {
	// hides start-btn + displays question area
	initGame();
	// randomize randomizedBank
	shuffle(randomizedBank);
	// display question()
	question();
	// starts timer
	startTimer();
	// on click answer
	$(function() {// Shorthand for $(document).ready(function() {
      $('select').change(function() {
      	selected = ($(this).val())
      });

	});
}

//===========================================//

// restart button
$("#restart-btn").on('click', function(){
	stopTimer();
	$('#choices-list').html('');
	startGame();
});


//===========================================//

// timer
var intervalId; //  Variable that will hold our setInterval that runs the stopwatch
var clockRunning = false; // prevents the clock from being sped up unnecessarily

function startTimer(){
	time = 10

	if (!clockRunning) {
		intervalId = setInterval(count, 1000)
		clockRunning = true;
	}
}

function count() {
	time--;

	var converted = timeConverter(time);
	console.log(converted);

	$("#timer").html(converted);

	if (time === 0){
		validate();
	}
}

function stopTimer(){
	clearInterval(intervalId);
	clockRunning = false
}

function timeConverter(t) {
	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (minutes === 0) {
		minutes = "00";
	} else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}
