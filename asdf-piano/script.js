$("article").multilingual([
  "a", {
    className: "class-a", /* 클래스 이름은 어떤 것이든 가능하다. */
    charset: 'Aa' /* ml-parenthesis 클래스 안에 포함될 문자세트를 지정해준다. */
  }
]);
// $(".class-a").on('keypress', function(){
//   $(".class-a").css(color:red)
// });
/** @format */
Tone.start();
const synth = new Tone.Synth().toDestination();
let shift_pressed = false;
let current_section = 4;

document.onkeydown = function (e) {
  let key = e.code;
  let note = getNote(key);
  switch (key) {
    case "ShiftRight":
    case "ShiftLeft":
      shift_pressed = true;
      break;
    case "ArrowRight":
      if (current_section < 8) {
        current_section += 1;
        document.getElementById("current_section").innerHTML = current_section;
      } else alert("The highest section is 8");
      break;
    case "ArrowLeft":
      if (current_section > 1) {
        current_section -= 1;
        document.getElementById("current_section").innerHTML = current_section;
      } else alert("The lowest section is 1");
      break;
  }
  if (note != "N/A") playSound(note);
};

document.onkeyup = function (e) {
  let key = e.code;
  if (key === "ShiftLeft" || key === "ShiftRight") shift_pressed = false;
  synth.triggerRelease();
  note = getNote(key);
  if (!note.endsWith("#"))
    document.getElementById(note).style.color = "white";
  else
    document.getElementById(note.replace("#", "S")).style.color = "black";
};

function playSound(note) {
  synth.triggerAttack(`${note}${current_section}`, "1");
  document.getElementById(note.replace("#", "S")).style.color = "lightgrey";
}

function getNote(key) {
  let note = "N/A";
  switch (key) {
    case "KeyA":
      note = "C";
      break;
    case "KeyW":
      note = "C#";
      break;
    case "KeyS":
      note = "D";
      break;
    case "KeyE":
      note = "D#";
      break;
    case "KeyD":
      note = "E";
      break;
    case "KeyF":
      note = "F";
      break;
    case "KeyT":
      note = "F#";
      break;
    case "KeyG":
      note = "G";
      break;
    case "KeyY":
      note = "G#";
      break;
    case "KeyH":
      note = "A";
      break;
    case "KeyU":
      note = "A#";
      break;
    case "KeyJ":
      note = "B";
      break;
  }
  return note;
}
