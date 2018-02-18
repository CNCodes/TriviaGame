


function changeMusic(){
$('#audioPlayer').attr('src', 'assets/countdownMusic.mp3');
}


$(document).ready(function(){
$("#startButton").on("click", function(){
	changeMusic();
});
});