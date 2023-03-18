

// const remainTime = document.querySelector("#remain-time");

// function diffDay() {
//     const masTime = new Date("2024-09-29");
//     const todayTime = new Date();
    
//     const diff = masTime - todayTime;

//     const diffDay = String(Math.floor(diff / (1000*60*60*24)));
//     const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
//     const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
//     const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
    
//     remainTime.innerText = `${diffDay} ${diffHour}:${diffMin}:${diffSec}`;
// 	// $(document).ready(function(){
// 	// 	  $('article').multilingual([
// 	// 	      'en',
// 	// 	      'num',
// 	// 	      'punct'
// 	// 	    ]);
// 	// 	});
// }

// diffDay();
// setInterval(diffDay, 1000);


// const remainTime2 = document.querySelector("#remain-time2");
// function diffDay2() {
//     const masTime2 = new Date("2023-03-13 00:00:00");
//     const todayTime = new Date();
    
//     const diff2 = masTime2 - todayTime;

//     const diffDay2 = String(Math.floor(diff2 / (1000*60*60*24)));
//     const diffHour2 =String(Math.floor((diff2 / (1000*60*60)) % 24)).padStart(2,"0");
//     const diffMin2 = String(Math.floor((diff2 / (1000*60)) % 60)).padStart(2,"0");
//     const diffSec2 = String(Math.floor(diff2 / 1000 % 60)).padStart(2,"0");
    
//     remainTime2.innerText = `${diffDay2} ${diffHour2}:${diffMin2}:${diffSec2}`;
// 	// $(document).ready(function(){
// 	// 	  $('article').multilingual([
// 	// 	      'en',
// 	// 	      'num',
// 	// 	      'punct'
// 	// 	    ]);
// 	// 	});
// }
// diffDay2();
// setInterval(diffDay2, 1000);


// const remainTime3 = document.querySelector("#remain-time3");

// function diffDay3() {
//     const masTime3 = new Date("2023-01-30");
//     const todayTime = new Date();
    
//     const diff3 = masTime3 - todayTime;

//     const diffDay3 = String(Math.floor(diff3 / (1000*60*60*24)));
//     const diffHour3 =String( Math.floor((diff3 / (1000*60*60)) % 24)).padStart(2,"0");
//     const diffMin3 = String(Math.floor((diff3 / (1000*60)) % 60)).padStart(2,"0");
//     const diffSec3 = String(Math.floor(diff3 / 1000 % 60)).padStart(2,"0");
    
//     remainTime3.innerText = `${diffDay3} ${diffHour3}:${diffMin3}:${diffSec3}`;
// 	// $(document).ready(function(){
// 	// 	  $('article').multilingual([
// 	// 	      'en',
// 	// 	      'num',
// 	// 	      'punct'
// 	// 	    ]);
// 	// 	});
// }

// diffDay3();
// setInterval(diffDay3, 1000);


var counter1 = function(){
    var startDate = new Date("2024/09/29 00:00:00") //디데이 (날짜 설정)
        setInterval(function(){
            var currentDate = new Date(); //현재 날짜 가져오기
            var distance = startDate.getTime() - currentDate.getTime();
            var d = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
            var h = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2,"0");
            var m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,"0");
            var s = String(Math.floor((distance % (1000 * 60)) / 1000));
        
            if(s < 10){ s = '0'+s;}
            $('#remain-time').html(d + ' ' + h +':'+ m +':'+ s+'' )
            
            // $('.progress-bar').css({
            //     width: d * (widthbar / 31) +'px' //여기서 31은 1일부터 ~ 31일까지 기준이다.
            // })
    });
}
counter1();
setInterval(counter1, 1000);

var counter2 = function(){
    var startDate = new Date("2023/03/10 10:00:00") //디데이 (날짜 설정)
        setInterval(function(){
            var currentDate = new Date(); //현재 날짜 가져오기
            var distance = startDate.getTime() - currentDate.getTime();
            var d = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
            var h = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2,"0");
            var m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,"0");
            var s = String(Math.floor((distance % (1000 * 60)) / 1000));
        
            if(s < 10){ s = '0'+s;}
            $('#remain-time2').html(d + ' ' + h +':'+ m +':'+ s+'' )
            
            // $('.progress-bar').css({
            //     width: d * (widthbar / 31) +'px' //여기서 31은 1일부터 ~ 31일까지 기준이다.
            // })
    });
}
counter2();
setInterval(counter2, 1000);

var counter3 = function(){
    var startDate = new Date("2023/01/30 14:00:00") //디데이 (날짜 설정)
        setInterval(function(){
            var currentDate = new Date(); //현재 날짜 가져오기
            var distance = startDate.getTime() - currentDate.getTime();
            var d = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
            var h = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2,"0");
            var m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,"0");
            var s = String(Math.floor((distance % (1000 * 60)) / 1000));
        
            if(s < 10){ s = '0'+s;}
            $('#remain-time3').html(d + ' ' + h +':'+ m +':'+ s+'' )
            
            // $('.progress-bar').css({
            //     width: d * (widthbar / 31) +'px' //여기서 31은 1일부터 ~ 31일까지 기준이다.
            // })
    });
}
counter3();
setInterval(counter3, 1000);



// $('#explain').click(
//     function () {
//         const remainTime = document.querySelector("#remain-time");
//         const remainTime2 = document.querySelector("#remain-time2");
//         const remainTime3 = document.querySelector("#remain-time3");

//         remainTime.innerText = '자유를 되찾고';
//         remainTime.classList.toggle('selected');
//         remainTime2.innerText = '중첩지대에 놓이며';
//         remainTime2.classList.toggle('selected');
//         remainTime3.innerText = '홀연히 사라집니다';
//         remainTime3.classList.toggle('selected');
//     }
// )