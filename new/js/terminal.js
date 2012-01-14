$(document).ready(function() {
        /**
         * Initialize the terminal
         */
        function initialize(initial, options) {
                var term = $('.terminal');
                term.focus();
                term.val('');   // TODO Looks like a hack
                term.val(initial);
        };
        var pre = "[guest@agrawal-varun.com]$ ";
        var pre_size = pre.length;
        
        var content = null;
        var buffer = Array("");
        var buffer_index = -1;

        /**
         * TODO help contents
         */
        var help_contents = "" +
"This is a normal help" + "\n" +
"Spread on multiple lines";

        initialize(pre);

        /**
         * When the enter key is pressed. the events to be fired
         */
        function new_line_event() {
                $('.terminal').val(content + '\n' + pre);
        };

        /**
         * get the last command entered
         */
        function last_line(old_lines, lines, prefix) {
                if (old_lines != null) {
                        lines = lines.substring(old_lines.length + 1);
                                        // +1 because of new iine
                }
                return lines.substring(pre_size);
        };

        /**
         * Get the current typed command, till the last key pressed.
         * current key pressed is ignored
         */
        function typed() {
                var old_content = content;
                var new_content = $('.terminal').val();
                return last_line(old_content, new_content, pre);
        };

        /**
         * load the buffer with the command
         * @dummy       the last value is always kept as the dummy value
         *              which contains the current command being typed
         */
        function load_buffer(dummy) {
                if (dummy) {
                        buffer.push("");
                        if (buffer_index == -1) {
                                buffer_index = buffer.length - 1;
                        }
                        return;
                }
                var last = typed();
                var buff_last = buffer.pop();
                buffer.push(last);
        };

        /**
         * position of the cursor for the current command
         */
        function cursor_position() {
                var past_size = content == null ? 0 : content.length+1; 
                                        // +1 is for new line character
                var cursor_pos = $('.terminal').getSelection().end;
                return cursor_pos - past_size;
        };

        /**
         * check the cursor position for the current command being typed
         */
        function is_valid(cursor) {
                if (cursor > pre_size)
                        return true;
                return false;
        };

        /**
         * reset the buffer index
         */
        function reset_buffer() {
                buffer_index = -1;
        };

        /**
         * decrement the buffer index by 1, if possible
         */
        function decrement_buf_index() {
                if (buffer_index > 0) {
                        buffer_index -= 1;
                }
        };

        /**
         * increment the buffer index by 1, if possible
         */
        function increment_buf_index() {
                if (buffer_index < buffer.length - 1) {
                        buffer_index += 1;
                }
        };

        /**
         * get the buffer element at the buffer_index
         */
        function get_buffer() {
                return buffer[buffer_index];
        };

        /**
         * update the current command from the buffer
         */
        function update_command(com) {
                var new_content = content + "\n" + pre + com;
                $('.terminal').val('');
                $('.terminal').val(new_content);
        };

        /**
         * reset terminal
         */
        function reset() {
                content = "";
        };

        /**
         * show help menu on the terminal
         */
        function help() {
                content += "\n" + help_contents;
        };

        /**
         * run the command
         */
        function run_command(command) {
                switch(command) {
                case "clear":
                        reset();
                        break;
                case "help":
                        help();
                        break;
                }
        };
        
        $('.terminal').keydown(function(e) {
                var input = e.which === undefined ? e.keyCode : e.which;

                // backspace and left arrow disabled if the cursor 
                // is to the extreme left
                if (input == 8 || input == 37) {
                        var cursor = cursor_position();
                        if (!is_valid(cursor)) {
                                e.preventDefault();
                        }
                }
                // up-down arrow keys default action disabled
                if (input == 38 || input == 40) {
                        e.preventDefault();
                        if (buffer_index == -1) {
                                return;
                        }
                        if (input == 38) { // up key
                                decrement_buf_index();
                        } else {
                                increment_buf_index();
                        }
                        var com = get_buffer();
                        update_command(com);
                        return;
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
                reset_buffer();
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
