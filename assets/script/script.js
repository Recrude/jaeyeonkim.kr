$('body').click(function(e) {
    console.log(e.pageX);
});

var mouseX, mouseY;
$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    console.log(mouseX);
    $('.light').css({
        //'mix-blend-mode': difference,//
        'top': mouseY,
        'left': mouseX
    })
}).mouseover();

