$(document).ready(function() {
        function initialize(initial, options) {
                $('.terminal').val(initial);
        }
	var pre = "[guest@agrawal-varun.com]$ ";
        var cursor = 0;
        var content = null;

        var pre_size = pre.length;

	initialize(pre);

        function new_line_event() {
                var old_val = $('.terminal').val();
                $('.terminal').val(old_val + '\n' + pre);
        }
        
        $('.terminal').keydown(function(e) {
		var input = e.which === undefined ? e.keyCode : e.which;
                cursor = $(this).getSelection();
                // arrow keys disabled
		if (input == 38 || input == 40 || input == 37 || input == 39) 
                        e.preventDefault();
                // not an enter key
                if (input != 13 || e.shiftKey) {
                        return;
                }
                e.preventDefault();
		var new_content = $(this).val();
		new_line_event();
	});
});
