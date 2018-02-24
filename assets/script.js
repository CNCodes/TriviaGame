var countTime;
var i = 0;
var score = 0;
var myTimer;
//created an array of objects to hold the question, possible answers and value of right answer that correponds to a value attribute in the html
var multipleChoiceQuestions = [

{question: "What year was the atari released",
radio1: '1968',
radio2: '1972',
radio3: '1975',
AnswerValue: 'b',},

{question : "Which Pokemon was the first to be designed?",
 radio1: "Mew",
 radio2: "Charizard",
 radio3: "Rhyhorn",
 AnswerValue: "c",
},

{question : "What was the name of the first online multiplayer game?",
radio1: "Maze Wars",
radio2: "Call of Duty",
radio3: "Runescape",
AnswerValue: "a",
},

{question: "The original villan in the Mario franchise was",
radio1: "Bowser",
radio2: "Donkey Kong",
radio3: "Luigi",
AnswerValue: "b",},

{question: "Dig Dug, Galaga, and Pac-Man were all developed by",
radio1: "Namco",
radio2: "Sega",
radio3: "Nintendo",
AnswerValue: "a"},

{question: "What is the highest selling game of all time?",
radio1: "Super Mario 64",
radio2: "Tetris",
radio3: "Halo 3",
AnswerValue: "b"},




];



function nextQuestion(){

	//This sets up end game display
	if(i === multipleChoiceQuestions.length-1){

		console.log(i);
		console.log(multipleChoiceQuestions.length);

		clearInterval(myTimer);

		var answerSelected = $("input[type='radio'][name='questionRadios']:checked").val();
		//this unchecks the checkbox for the next round
		$("input[type='radio'][name='questionRadios']:checked").prop('checked', false);
		//determines if user selected correct answer and updates score
		if(answerSelected == multipleChoiceQuestions[i].AnswerValue) {
			score++;
			console.log(score);
		}

		var percent = (Math.floor((score/multipleChoiceQuestions.length)*100));

		

		if(percent >= 60) {
			$('#audioPlayer').attr('src', 'assets/youWin.mp3');
			$('#audioPlayer').removeAttr('loop');
			$('#winOrLose').show();
			$('#questionContainer').hide();
			$('#countdownDisplay').hide();
			$('#winOrLoseTitle').addClass('winColor');
			$('#winOrLoseTitle').text("You've Passed!!");
			$('#winOrLosePercent').text('You scored a ' + percent);

			$('#restartButton').on('click', function(){
				$('#winOrLoseTitle').removeClass('winColor');
				i=0;
				clearInterval(myTimer);
				$('.submit').off();
				startGame();
			});

		} else {
			$('#audioPlayer').attr('src', 'assets/youLose.mp3');
			$('#audioPlayer').removeAttr('loop');
			$('#winOrLose').show();
			$('#questionContainer').hide();
			$('#countdownDisplay').hide();
			$('#winOrLoseTitle').addClass('loseColor');
			$('#winOrLoseTitle').text("You've Failed!!");
			$('#winOrLosePercent').text('You scored a ' + percent);

			$('#restartButton').on('click', function(){
				$('#winOrLoseTitle').removeClass('loseColor');
				i=0;
				clearInterval(myTimer);
				$('.submit').off();
				startGame();
			});

		}

	} else {
		//This stops the timer
		clearInterval(myTimer);
		//this determines which checkbox was selected
		var answerSelected = $("input[type='radio'][name='questionRadios']:checked").val();
		//this unchecks the checkbox for the next round
		$("input[type='radio'][name='questionRadios']:checked").prop('checked', false);
		//determines if user selected correct answer and updates score
		if(answerSelected == multipleChoiceQuestions[i].AnswerValue) {
			score++;
			console.log(score);
		}
		//increments the i value by 1 to select the next multiple choice question
		i++;
		//resets the countdown time (the extra 1 is so the page is updated at 20 secs)
		countTime = 21;
		//starts the timer
		questionTimer();
		//alters the html in the game to display the next question
		$('#radioQuestion').text(multipleChoiceQuestions[i].question);
		$('#radio1').text(multipleChoiceQuestions[i].radio1);
		$('#radio2').text(multipleChoiceQuestions[i].radio2);
		$('#radio3').text(multipleChoiceQuestions[i].radio3);
	}



}


function alterHtml() {
	$('#countdownDisplay').show();
	$('#questionContainer').show();
	$('#begginingInstructions').hide();
	$('#startButton').hide();
	$('#contentHolder').css({"background-image":"url('http://68.media.tumblr.com/276ac633d947ba5c8bbebaa0bb6d4574/tumblr_n1xcz4UPBU1rrftcdo1_1280.gif')"});
	$('#radioQuestion').text(multipleChoiceQuestions[i].question);
	$('#radio1').text(multipleChoiceQuestions[i].radio1);
	$('#radio2').text(multipleChoiceQuestions[i].radio2);
	$('#radio3').text(multipleChoiceQuestions[i].radio3);
}
	
function startGame(){
	i = 0;

	score = 0;
	//initialize countdown time
	countTime = 20;
	//call alertHtml function
	alterHtml();
	$('#winOrLose').hide();
	//call changeMusic function
	changeMusic();
	//start timer
	questionTimer();
	//creates event listener for the newly displayed submit button
	$('.submit').on('click', function(){
		nextQuestion();
	});

}


function changeMusic(){
//sets quiz music
$('#audioPlayer').attr('src', 'assets/countdownMusic.mp3');
$('#audioPlayer').attr('loop', 'loop');
}


function questionTimer() {
	//creates a timer that is assigned to a variable that can be used to stop the timer
	myTimer = setInterval(function(){
		//decrements countdown 
		countTime--;
		//displays number changes
		$('#countdownDisplay').html('<h3>' + countTime + '</h3>');
		//conditional that triggers the click event listener to go to next question
		if(countTime === 0) {
			$('.submit').trigger('click');
		}
	}, 1000);
}


$(document).ready(function(){
$('#winOrLose').hide();
$('#questionContainer').hide();
$('#countdownDisplay').hide();
$("#startButton").on("click", function(){
	startGame();
	
	

});
});