

const remainTime = document.querySelector("#remain-time");

function diffDay() {
    const masTime = new Date("2024-09-29");
    const todayTime = new Date();
    
    const diff = masTime - todayTime;

    const diffDay = String(Math.floor(diff / (1000*60*60*24)));
    const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
    const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
    const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
    
    remainTime.innerText = `${diffDay} ${diffHour}:${diffMin}:${diffSec}`;
	// $(document).ready(function(){
	// 	  $('article').multilingual([
	// 	      'en',
	// 	      'num',
	// 	      'punct'
	// 	    ]);
	// 	});
}

diffDay();
setInterval(diffDay, 1000);

const remainTime2 = document.querySelector("#remain-time2");

function diffDay2() {
    const masTime2 = new Date("2023-03-13");
    const todayTime2 = new Date();
    
    const diff2 = masTime2 - todayTime2;

    const diffDay2 = String(Math.floor(diff2 / (1000*60*60*24)));
    const diffHour2 =String( Math.floor((diff2 / (1000*60*60)) % 24)).padStart(2,"0");
    const diffMin2 = String(Math.floor((diff2 / (1000*60)) % 60)).padStart(2,"0");
    const diffSec2 = String(Math.floor(diff2 / 1000 % 60)).padStart(2,"0");
    
    remainTime2.innerText = `${diffDay2} ${diffHour2}:${diffMin2}:${diffSec2}`;
	// $(document).ready(function(){
	// 	  $('article').multilingual([
	// 	      'en',
	// 	      'num',
	// 	      'punct'
	// 	    ]);
	// 	});
}

diffDay2();
setInterval(diffDay2, 1000);

