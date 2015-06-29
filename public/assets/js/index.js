function resizeFooter() {
	var body = $('body');
	var footer = $('#footer');
	var height = footer.outerHeight(true);
	body.css('margin-bottom', height);
}

$(document).ready(function() {
	resizeFooter();
});

$(window).on('resize', function() {
	resizeFooter();
});

