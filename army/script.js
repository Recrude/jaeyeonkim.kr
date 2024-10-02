

// // const remainTime = document.querySelector("#remain-time");

// // function diffDay() {
// //     const masTime = new Date("2024-09-29");
// //     const todayTime = new Date();
    
// //     const diff = masTime - todayTime;

// //     const diffDay = String(Math.floor(diff / (1000*60*60*24)));
// //     const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
// //     const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
// //     const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
    
// //     remainTime.innerText = `${diffDay} ${diffHour}:${diffMin}:${diffSec}`;
// // 	// $(document).ready(function(){
// // 	// 	  $('article').multilingual([
// // 	// 	      'en',
// // 	// 	      'num',
// // 	// 	      'punct'
// // 	// 	    ]);
// // 	// 	});
// // }

// // diffDay();
// // setInterval(diffDay, 1000);


// // const remainTime2 = document.querySelector("#remain-time2");
// // function diffDay2() {
// //     const masTime2 = new Date("2023-03-13 00:00:00");
// //     const todayTime = new Date();
    
// //     const diff2 = masTime2 - todayTime;

// //     const diffDay2 = String(Math.floor(diff2 / (1000*60*60*24)));
// //     const diffHour2 =String(Math.floor((diff2 / (1000*60*60)) % 24)).padStart(2,"0");
// //     const diffMin2 = String(Math.floor((diff2 / (1000*60)) % 60)).padStart(2,"0");
// //     const diffSec2 = String(Math.floor(diff2 / 1000 % 60)).padStart(2,"0");
    
// //     remainTime2.innerText = `${diffDay2} ${diffHour2}:${diffMin2}:${diffSec2}`;
// // 	// $(document).ready(function(){
// // 	// 	  $('article').multilingual([
// // 	// 	      'en',
// // 	// 	      'num',
// // 	// 	      'punct'
// // 	// 	    ]);
// // 	// 	});
// // }
// // diffDay2();
// // setInterval(diffDay2, 1000);


// // const remainTime3 = document.querySelector("#remain-time3");

// // function diffDay3() {
// //     const masTime3 = new Date("2023-01-30");
// //     const todayTime = new Date();
    
// //     const diff3 = masTime3 - todayTime;

// //     const diffDay3 = String(Math.floor(diff3 / (1000*60*60*24)));
// //     const diffHour3 =String( Math.floor((diff3 / (1000*60*60)) % 24)).padStart(2,"0");
// //     const diffMin3 = String(Math.floor((diff3 / (1000*60)) % 60)).padStart(2,"0");
// //     const diffSec3 = String(Math.floor(diff3 / 1000 % 60)).padStart(2,"0");
    
// //     remainTime3.innerText = `${diffDay3} ${diffHour3}:${diffMin3}:${diffSec3}`;
// // 	// $(document).ready(function(){
// // 	// 	  $('article').multilingual([
// // 	// 	      'en',
// // 	// 	      'num',
// // 	// 	      'punct'
// // 	// 	    ]);
// // 	// 	});
// // }

// // diffDay3();
// // setInterval(diffDay3, 1000);


// var counter1 = function(){
//     var startDate = new Date("2024/09/30 22:05:00") //디데이 (날짜 설정)
//         setInterval(function(){
//             var currentDate = new Date(); //현재 날짜 가져오기
//             var distance = startDate.getTime() - currentDate.getTime();
//             var d = Math.abs(String(Math.floor(distance / (1000 * 60 * 60 * 24))));
//             var h = Math.abs(String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
//             var m = Math.abs(String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))));
//             var s = Math.abs(String(Math.floor((distance % (1000 * 60)) / 1000)));
//             if(d < 10){ d = '00'+d;}
//             if(h < 10){ h = '0'+h;}
//             if(m < 10){ m = '0'+m;}
//             if(s < 10){ s = '0'+s;}
//             $('#remain-time').html(d + ' ' + h +':'+ m +':'+ s+'' )
//             // $('.progress-bar').css({
//             //     width: d * (widthbar / 31) +'px' //여기서 31은 1일부터 ~ 31일까지 기준이다.
//             // })
//     });
// }
// counter1();
// setInterval(counter1, 1000);

// var counter2 = function(){
//     var startDate = new Date("2023/03/13 00:00:00") //디데이 (날짜 설정)
//         setInterval(function(){
//             var currentDate = new Date(); //현재 날짜 가져오기
//             var distance = startDate.getTime() - currentDate.getTime();
//             var d = Math.abs(String(Math.floor(distance / (1000 * 60 * 60 * 24))));
//             var h = Math.abs(String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
//             var m = Math.abs(String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))));
//             var s = Math.abs(String(Math.floor((distance % (1000 * 60)) / 1000)));
//             if(d < 10){ d = '0'+d;}
//             if(h < 10){ h = '0'+h;}
//             if(m < 10){ m = '0'+m;}
//             if(s < 10){ s = '0'+s;}
//             $('#remain-time2').html(d + ' ' + h +':'+ m +':'+ s+'' )
            
//             // $('.progress-bar').css({
//             //     width: d * (widthbar / 31) +'px' //여기서 31은 1일부터 ~ 31일까지 기준이다.
//             // })
//     });
// }
// counter2();
// setInterval(counter2, 1000);

// var counter3 = function(){
//     var startDate = new Date("2023/01/30 14:00:00") //디데이 (날짜 설정)
//         setInterval(function(){
//             var currentDate = new Date(); //현재 날짜 가져오기
//             var distance = startDate.getTime() - currentDate.getTime();
//             var d = Math.abs(String(Math.floor(distance / (1000 * 60 * 60 * 24))));
//             var h = Math.abs(String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
//             var m = Math.abs(String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,"0"));
//             var s = Math.abs(String(Math.floor((distance % (1000 * 60)) / 1000)));
//             if(d < 10){ d = '0'+d;}
//             if(h < 10){ h = '0'+h;}
//             if(m < 10){ m = '0'+m;}
//             if(s < 10){ s = '0'+s;}
//             $('#remain-time3').html(d + ' ' + h +':'+ m +':'+ s+'' )
            
//             // $('.progress-bar').css({
//             //     width: d * (widthbar / 31) +'px' //여기서 31은 1일부터 ~ 31일까지 기준이다.
//             // })
//     });
// }
// counter3();
// setInterval(counter3, 1000);
// var startend = function(){

// }


// // $('#explain').click(
// //     function () {
// //         const remainTime = document.querySelector("#remain-time");
// //         const remainTime2 = document.querySelector("#remain-time2");
// //         const remainTime3 = document.querySelector("#remain-time3");

// //         remainTime.innerText = '자유를 되찾고';
// //         remainTime.classList.toggle('selected');
// //         remainTime2.innerText = '중첩지대에 놓이며';
// //         remainTime2.classList.toggle('selected');
// //         remainTime3.innerText = '홀연히 사라집니다';
// //         remainTime3.classList.toggle('selected');
// //     }
// // )


// const Confettiful = function(el) {
//   this.el = el;
//   this.containerEl = null;
  
//   this.confettiFrequency = 3;
//   this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
//   this.confettiAnimations = ['slow', 'medium', 'fast'];
  
//   this._setupElements();
//   this._renderConfetti();
// };

// Confettiful.prototype._setupElements = function() {
//   const containerEl = document.createElement('div');
//   const elPosition = this.el.style.position;
  
//   if (elPosition !== 'relative' || elPosition !== 'absolute') {
//     this.el.style.position = 'relative';
//   }
  
//   containerEl.classList.add('confetti-container');
  
//   this.el.appendChild(containerEl);
  
//   this.containerEl = containerEl;
// };

// Confettiful.prototype._renderConfetti = function() {
//   this.confettiInterval = setInterval(() => {
//     const confettiEl = document.createElement('div');
//     const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
//     const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
//     const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
//     const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
    
//     confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
//     confettiEl.style.left = confettiLeft;
//     confettiEl.style.width = confettiSize;
//     confettiEl.style.height = confettiSize;
//     confettiEl.style.backgroundColor = confettiBackground;
    
//     confettiEl.removeTimeout = setTimeout(function() {
//       confettiEl.parentNode.removeChild(confettiEl);
//     }, 3000);
    
//     this.containerEl.appendChild(confettiEl);
//   }, 25);
// };

// window.confettiful = new Confettiful(document.querySelector('.js-container'));


const deadline1 = new Date("2024/10/03 01:00:00").getTime();
const deadline2 = new Date("2023/03/14 01:00:00").getTime();
const deadline3 = new Date("2023/02/03 01:00:00").getTime();

let intervalId = setInterval(() => {
    const now = new Date().getTime();

    const remainingTime1 = deadline1 - now;
    const remainingTime2 = deadline2 - now;
    const remainingTime3 = deadline3 - now;

    document.getElementById("timer1").textContent = getRemainingTime(remainingTime1);
    document.getElementById("timer2").textContent = getRemainingTime(remainingTime2);
    document.getElementById("timer3").textContent = getRemainingTime(remainingTime3);

    // 타이머1이 0에 도달하면 모든 타이머를 멈추고 iframe 추가
    if (remainingTime1 <= 0) {
        clearInterval(intervalId); // 타이머 멈춤
        document.getElementById("timer1").textContent = "000 00:00:00";
        document.getElementById("timer2").textContent = "570 00:00:00";
        document.getElementById("timer3").textContent = "609 00:00:00";
        
        // iframe 요소 추가
        addIframe();

        document.getElementById("timer1").style.color = "navy";
    }
}, 1000);

function getRemainingTime(time) {
    // const days = Math.floor(time / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((time % (1000 * 60)) / 1000);
    var d = Math.abs(String(Math.floor(time / (1000 * 60 * 60 * 24))));
    var h = Math.abs(String(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
    var m = Math.abs(String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))));
    var s = Math.abs(String(Math.floor((time % (1000 * 60)) / 1000)));
    if(d < 10){ d = '00'+d;}
    if(h < 10){ h = '0'+h;}
    if(m < 10){ m = '0'+m;}
    if(s < 10){ s = '0'+s;}
    // $('#remain-time2').html(d + ' ' + h +':'+ m +':'+ s+'' )
    return `${d} ${h}:${m}:${s}`;
}

function addIframe() {
    const iframe = document.createElement("iframe");
    iframe.src = "dist/index.html"; // 원하는 iframe URL로 변경
    document.body.appendChild(iframe);
}