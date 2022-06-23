function random(a) {
	return a[Math.floor(Math.random() * a.length)];
}

$('.item').css({
	'top': Math.floor(Math.random() * ($(window).height() - $('.item').height())) + 'px',
	'left': Math.floor(Math.random() * ($(window).width() - $('.item').width())) + 'px'
});

$('.item').each(function(){
	$(this).css({
		'top': Math.floor(Math.random() * ($(window).height() - $('.item').height())) + 'px',
	'left': Math.floor(Math.random() * ($(window).width() - $('.item').width())) + 'px'
});
});

