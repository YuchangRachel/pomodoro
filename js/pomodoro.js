//jQuery
$(document).ready(function() {
	var workTime = 25;
	var breakTime = 5;
	var clock_min = workTime;
	var clock_sec = 0;
	var isPause = true;
	var interval;

	//update time on clock
	function updateTime(){
		var minutes = clock_min;
		var seconds = clock_sec;

		if (minutes < 10)
			minutes = "0" + minutes;
		if (seconds < 10)
			seconds = "0" + seconds;

		$(".clock-time").text(minutes + ":" + seconds);
	}

	//decrease break length
	$(".break-min").click(function() {
		if (isPause && breakTime > 1){
			breakTime = breakTime - 1;
			$(".break-time").text(breakTime);
		}
	});

	//increase break length
	$(".break-plus").click(function() {
		if (isPause && breakTime < 60) {
			breakTime = breakTime + 1;
			$(".break-time").text(breakTime);
		}
	});

	//decrease session(work) length
	$(".session-min").click(function() {
		if (isPause && workTime > 1){
			workTime = workTime - 1;
			clock_min = workTime;
			$(".session-time").text(workTime);
			updateTime();
		}
	});

	//increase session length
	$(".session-plus").click(function() {
		if (isPause && workTime < 60){
			workTime = workTime + 1;
			clock_min = workTime;
			$(".session-time").text(workTime);
			updateTime();
		}
	});

	//fill circle process bar
	function process(){
		var total_sec = ($(".clock-text").text() === "Working") ? workTime * 60 : breakTime * 60;
		var current_sec = (clock_min) * 60 + clock_sec;
		var percentage = (current_sec/total_sec) * 100;
		$(".middle").css("background" , "linear-gradient(to top, #f44336 "+percentage+"%, #ff867f 0%");
	}

	//handle clock min sec
	function handleClock() {
		process();
		//value and type should fit 
		if (clock_min !== 0 && clock_sec === 0){
			clock_sec = 59;
			clock_min = clock_min - 1;
			updateTime();
		}
		else if (clock_min === 0 && clock_sec === 0){
			if ($(".clock-text").text() === "Working"){
				$(".clock-text").text("Break!");
				clock_min = breakTime;
				updateTime();
			}
			//break finish
			else {
				isPause = true;  //break status be changed
				clickButton();
				$(".clock-text").text("Working");
				clock_min = workTime;
				updateTime();
				clearInterval(interval);  //stop previous interval
			}
		}
		//clock_min===0 &&clock_sec !== 0
		//clock_min!== 0 && clock_sec !== 0
		else {
			clock_sec = clock_sec - 1;
			updateTime();
		}
	}

	//click update start button
	function clickButton(){
		if (isPause){
			$(".start-btn").removeClass("btn-danger");
			$(".start-btn").addClass("btn-success");
			$(".start-btn").text("Start!");
		}
		else {
			$(".start-btn").removeClass("btn-success");
			$(".start-btn").addClass("btn-danger");
			$(".start-btn").text("Stop");
		}
	}

	//start stop clock while clicking
	$(".start-btn").click(function() {
		isPause = !isPause;     //originally isPause is true; now isPause is false
		clickButton();  //shoule stop

		//status before click  toggle
		//working before click
		if (!isPause){    //now isPause = true
			interval = setInterval(handleClock, 1000);
			isPause = false;
		}
		//break before click
		else{
			isPause = true;
			//resume clock resume value
			clickButton();
			$(".clock-text").text() === "Working";
			clock_min = workTime;
			clock_sec = 0;
			updateTime();
			clearInterval(interval);   //clear previous time interval
		}

	});

});
