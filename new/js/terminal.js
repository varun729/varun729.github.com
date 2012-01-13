$(document).ready(function() {
	var content = null;

	$('.terminal').keydown(function(e) {
		var input = e.which === undefined ? e.keyCode : e.which;
		if (input != 13 || e.shiftKey)
			return;
		content = $(this).val();
	});
});
