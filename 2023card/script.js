var card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});

var btn = document.querySelector('.formbutton');
btn.addEventListener( 'click', function() {
  var form = document.querySelector('.form');
  form.classList.toggle('form-open');
});


$(window).on('load', function() {
  setTimeout(function() {
    $('body').addClass('is-loaded');
  }, 1000);
});

var tooltip = document.querySelectorAll('.tooltip');

document.addEventListener('mousemove', fn, false);

function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}