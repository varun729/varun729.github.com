$(document).ready(function() {
        /**
         * Initialize the terminal
         */
        function initialize(initial, options) {
                var term = $('.terminal');
                term.focus();
                term.val('');   // TODO Looks like a hack
                term.val(initial);
        }
	var pre = "[guest@agrawal-varun.com]$ ";
        var pre_size = pre.length;
        
        var content = null;
        var buffer = Array("");

	initialize(pre);

        /**
         * When the enter key is pressed. the events to be fired
         */
        function new_line_event() {
                $('.terminal').val(content + '\n' + pre);
        }

        /**
         * get the last command entered
         */
        function last_line(old_lines, lines, prefix) {
                if (old_lines != null) {
                        lines = lines.substring(old_lines.length);
                }
                return lines.substring(pre_size);
        }

        /**
         * Get the current typed command, till the last key pressed.
         * current key pressed is ignored
         */
        function typed() {
                var old_content = content;
                var new_content = $('.terminal').val();
                return last_line(old_content, new_content, pre);
        }

        /**
         * load the buffer with the command
         * @dummy       the last value is always kept as the dummy value
         *              which contains the current command being typed
         */
        function load_buffer(dummy) {
                if (dummy) {
                        buffer.push("");
                        return;
                }
                var last = typed();
                var buff_last = buffer.pop();
                buffer.push(last);
        }

        /**
         * position of the cursor for the current command
         */
        function cursor_position() {
                var past_size = content == null ? 0 : content.length+1; 
                                        // +1 is for new line character
                var cursor_pos = $('.terminal').getSelection().end;
                return cursor_pos - past_size;
        }

        /**
         * check the cursor position for the current command being typed
         */
        function is_valid(cursor) {
                if (cursor > pre_size)
                        return true;
                return false;
        }

        /**
         * run the command
         */
        function run_command(command) {

        }
        
        $('.terminal').keydown(function(e) {
		var input = e.which === undefined ? e.keyCode : e.which;

                // TODO backspace and left arrow disabled if the cursor is to the extreme left
                if (input == 8 || input == 37) {
                        var cursor = cursor_position();
                        if (!is_valid(cursor)) {
                                // TODO check if the cursor is at a valid position, otherwise
                                // put it to the beginning of the command line
                                e.preventDefault();
                        }
                }
                // up-down arrow keys disabled
		if (input == 38 || input == 40) {
                        // TODO use buffer to load the past and present commands
                        e.preventDefault();
                }
                // not an enter key
                if (input != 13 || e.shiftKey) {
                        load_buffer();
                        return;
                }
                // enter key is pressed
                e.preventDefault();
                load_buffer();
                var last = typed();
                content = $(this).val();

                run_command(last);
		load_buffer(true);
                new_line_event();
	});
        
        /**
         * Disabling default mouse actions on the terminal.
         * TODO determine selection behaviour of the text on mouse events
         */
        $('.terminal').mouseup(function(e) {
                e.preventDefault();
        });

        $('.terminal').mousedown(function(e) {
                e.preventDefault();
        });

});
