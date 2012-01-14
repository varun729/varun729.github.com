$(document).ready(function() {
        /**
         * Initialize the terminal
         */
        function initialize(initial, pre) {
                var term = $('.terminal');
                term.focus();
                term.val('');
                term.val(initial + "\n" + pre);
        };
        var pre = "[guest@agrawal-varun.com]$ ";
        var pre_size = pre.length;
        
        var content = null;
        var buffer = Array("");
        var buffer_index = -1;

        var home = null;
        var pwd = "/glossary";
        /**
         * load contents from the home.json file
         */
        $.getJSON('json/home.json', function(data) {
                home = data;
        });

        /**
         * Welcome message
         */
        var welcome_msg = "" +
        "Welcome to the homepage of Varun Agrawal." + "\n\n" +
        "Spread over multiple lines";

        /**
         * TODO help contents
         */
        var help_msg = "" +
        "This is help";

        content = welcome_msg;
        initialize(content, pre);

        /**
         * error
         * @message
         * @reason
         */
        function error(message, reason) {
                if (message === undefined) {
                        content += "\nError";
                        return;
                }
                content += "\n  Error   : " + message;
                if (reason === undefined) {
                        return;
                }
                content += "\n  Reason  : " + reason;
        };

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
         * fix last buffer
         */
        function fix_last_buffer() {
                if (buffer_index == buffer.length -1) {
                        load_buffer();
                }
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
         * clear terminal
         */
        function clear() {
                content = "";
        };

        /**
         * show help menu on the terminal
         */
        function help() {
                content += "\n" + help_msg;
        };

        /**
         * show the welcome message
         */
        function welcome() {
                content += "\n" + welcome_msg;
        };

        /**
         * list the contents of the current directory
         * TODO color code the files and directories separately
         */
        function ls() {
                var dirs = pwd.substring(1).split("/");
                var present = home;
                for (var i=0; i<dirs.length; i++) {
                        if (dirs[i].length > 0) {
                                present = present[dirs[i]];
                        }
                }
                var list = Array();
                for (var i in present) {
                        list.push(i);
                }
                content += "\n" + list.join("\t");
        };

        /**
         * check if directory is valid
         * TODO check if this functions properly
         */
        function isdir(path) {
                if (path[0] != "/") {
                        return false;
                }
                if (path == "/") {
                        return true;
                }
                var dirs = path.split("/");
                var curr = home;
                for (var i=0; i<dirs.length; i++) {
                        if (dirs[i] == "") {
                                continue;
                        }
                        curr = curr[dirs[i]];
                        if (curr == null || curr === undefined) {
                                return false;
                        }
                        if (typeof curr != "object") {
                                error("Path is a file");
                                return false;
                        }
                }
                return true;
        };

        /**
         * change directory
         */
        function cd(child) {
                var new_pwd = pwd;
                if (child == null || child === undefined || (/^\s*$/).test(child)) {
                        new_pwd = "/";
                } else if (child.trim() == ".") {
                        // do nothing
                } else if (child.trim() == "..") {
                        // previous directory
                        if (new_pwd == "/") {
                                error("Cannot move to directory '..'", 
                                        "Current directory is 'home'");
                                return;
                        } else {
                                var dirs = new_pwd.split("/");
                                if (dirs[dirs.length-1] == "") {
                                        dirs.pop();
                                }
                                dirs.pop();
                                new_pwd = dirs.join("/");
                                if (new_pwd == "") {
                                        new_pwd = "/";
                                }
                        }
                } else {
                        if (new_pwd[pwd.length-1] != "/") {
                                new_pwd += "/";
                        }
                        var children = child.split(/\s+/);
                        for (var i=0; i<children.length; i++) {
                                if (children[i].length == 0) {
                                        continue;
                                }
                                new_pwd += children[i] + "/";
                        }
                }
                if (isdir(new_pwd)) {
                        pwd = new_pwd;
                        content += "\n" + pwd;
                } else {
                        error("Invalid path '" + new_pwd + "'");
                }
                console.log(pwd);
        };

        /**
         * run the command
         */
        function run_command(command) {
                command = $.trim(command);
                switch(true) {
                case (command == "clear"):
                        clear();
                        break;
                case (command == "help"):
                        help();
                        break;
                case (command == "welcome"):
                        welcome();
                        break;
                case (command == "ls"):
                        ls();
                        break;
                case ((/^cd($| )/).test(command)):
                        var child = command.replace(/^cd($| )/, "");
                        cd(child);
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
                        fix_last_buffer();      // HACK
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
                $(this).focus();
        });

});
