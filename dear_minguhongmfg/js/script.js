var sound_1 = new Howl({
  src: ['mp3/808kick2.mp3']
}), sound_2 = new Howl({
  src: ['mp3/808snare.mp3']
});

function color() {
  return '#' + Math.floor(Math.random() * 16777215).toString(2);
}

function playA(count) {
  function duration(a) {
    var duration = a.length * 30;
    return duration;
  }
  sound_1.play();
  var a = message[count].a;
  $('h1').css('background-color', color).children('div').html(a).css('color', color).show(0, function() {
    if (message[count].b) {
      setTimeout(function() {
        (function playB(i) {
          sound_2.play();
          var b = message[count].b[i];
          $('h2').show(0).css('background-color', color).children('div').html(b).css('color', color).show(0, function() {
            $(this).delay(duration(b)).fadeOut(duration(b), function() {
              if (i < message[count].b.length - 1) {
                playB(i + 1);
              } else {
                $(this).parent('h2').fadeOut(function() {
                  playA((count + 1) % message.length);
                });
              }
            });
          });
        })(0);
      }, 1000);
    } else {
      $(this).delay(duration(a)).fadeOut(duration(a), function() {
        playA((count + 1) % message.length);
      });
    }
  });
};

$(window).on('load', playA(0));