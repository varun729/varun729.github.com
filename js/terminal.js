$(document).ready(function() {
        ///**
        // * close the current window
        // */
        //function close_window() {
        //        window.close();
        //};
 
        /**
         * Initialize the terminal
         */
        function initialize(initial, pre) {
                var term = $('.terminal');
                term.focus();
                term.val('');
                term.val(initial + "\n" + pre);
        };
        var pre = "[guest@agrawal-varun.com]";
//        var pre_size = pre.length;

        /**
         * set new prefix string
         */
        function pre_string(config) {
                if (config === undefined) {
                        return pre + "$ ";
                }
                pre = config;
        };

        var MAX_LINES = 100;
        var content = null;
        var buffer = Array("");
        var buffer_index = -1;

        var home = null;
        var pwd = "/";
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
        "Welcome to the homepage of Varun Agrawal.";

        /**
         * TODO help contents
         */
        var help_msg = ""+
"Help\n"+
"Following commands are allowed:\n"+
" 1. ls [path]  : this will list all the contents in the working directory or\n"+
"                 'path'\n"+
" 2. cd [path]  : change the working directory\n"+
" 3. pwd        : print the working directory\n"+
" 4. cat [path] : print the contents of the file or the directory in 'path'\n"+
"                 else working directory is taken as the 'path'\n"+
" 5. clear      : clear the terminal\n"+
" 6. help       : print this message\n"+
" 7. welcome    : print the welcome message\n"+
" 8. ps [string]: change the prefix string (string before '$')";

        content = welcome_msg;
        initialize(content, pre_string());

        /**
         * Change the content
         */
        function modify_content(action, text) {
                switch(action) {
                case "add":
                        content += "\n" + text;
                        break;
                case "new":
                        content = text;
                        break;
                }
                var lines = content.split(/\n/);
                if (lines.length > MAX_LINES) {
                        lines.splice(0, lines.length - MAX_LINES);
                }
                content = lines.join("\n");
        };

        /**
         * Change the present working directory
         * @action
         * @dir the directory should be validated before.
         */
        function modify_pwd(action, dir) {
                switch(action) {
                case "rel":
                        // TODO
                        break;
                case "base":
                        pwd = dir;
                        pwd = pwd.trim();
                        pwd += "/";
                        pwd = pwd.replace(/\/+/g, "/");
                        break;
                }
        };

        /**
         * get base path
         */
        function get_base_path(rel_path) {
                var base_path = pwd + rel_path;
                return base_path;
        };

        /**
         * path exists or not. could be file or directory
         * @path        the path to check should be base path.
         * return       false or the object at the path
         */
        function exists(path) {
                if (path[0] != "/") {
                        path = get_base_path(path);
                }
                var curr = home;
                var s = path.split("/");
                for (var i=0; i<s.length; i++) {
                        if (s[i].length < 1) {
                                continue;
                        }
                        if (typeof curr != "object") {
                                return false;
                        }
                        curr = curr[s[i]];
                        if (curr == null || curr === undefined) {
                                return false;
                        }
                }
                return curr;
        };

        /**
         * return true or false for exists
         */
        function exists_tf(path) {
                var a = exists(path);
                if (a == null || a == undefined || a == false) {
                        return false;
                }
                return true;
        };

        /**
         * path in base format or relative
         * return       true if in base format
         *              false if in relative format, relative to pwd
         */
        function is_base(path) {
                path = path.trim();
                if (path[0] != "/") {
                        return false;
                }
                if (exists_tf(path)) {
                        return true;
                }
                return false;
        };

        /**
         * get contents of the current directory
         */
        function sub(path) {
                if (path === undefined) {
                        path = pwd;
                }
                if (!is_base(path)) {
                        path = get_base_path(path);
                }
                var dirs = path.substring(1).split("/");
                var present = home;
                for (var i=0; i<dirs.length; i++) {
                        if (dirs[i].length < 1) {
                                continue;
                        }
                        present = present[dirs[i]];
                }
                var list = Array();
                for (var i in present) {
                        if (is_dir(path + i)) {
                                list.push("(d)" + i);
                        } else {
                                list.push("(f)" + i);
                        }
                }
                return list;
        };

        /**
         * check if directory is valid
         * TODO check if this functions properly
         */
        function is_dir(path) {
                if (path[0] != "/") {
                        path = get_base_path(path);
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
                                return false;
                        }
                }
                return true;
        };

        /**
         * error
         * @message
         * @reason
         */
        function error(message, reason) {
                if (message === undefined) {
                        modify_content("add", "Error");
                        return;
                }
                modify_content("add", "  Error  : " + message);
                if (reason === undefined) {
                        return;
                }
                modify_content("add", "  Reason : " + reason);
        };

        /**
         * When the enter key is pressed. the events to be fired
         */
        function new_line_event() {
                $('.terminal').val(content + '\n' + pre_string());
                $('.terminal').scrollTop($('.terminal')[0].scrollHeight -
                                        $('.terminal').height());
        };

        /**
         * get the last command entered
         */
        function last_line(old_lines, lines, prefix) {
                if (old_lines != null) {
                        lines = lines.substring(old_lines.length + 1);
                                        // +1 because of new iine
                }
                return lines.substring(pre_string().length);
        };

        /**
         * Get the current typed command, till the last key pressed.
         * current key pressed is ignored
         */
        function typed() {
                var old_content = content;
                var new_content = $('.terminal').val();
                return last_line(old_content, new_content, pre_string());
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
        function is_cursor_position_valid(cursor) {
                if (cursor > pre_string().length)
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
                var new_content = content + "\n" + pre_string() + com;
                $('.terminal').val('');
                $('.terminal').val(new_content);
        };

        /**
         * clear terminal
         */
        function clear() {
                modify_content("new", "");
        };

        /**
         * show help menu on the terminal
         */
        function help() {
                modify_content("add", help_msg);
        };

        /**
         * show the welcome message
         */
        function welcome() {
                modify_content("add", welcome_msg);
        };

        /**
         * list the contents of the current directory
         * TODO color code the files and directories separately
         */
        function ls(path, dl) {
                if (dl === undefined) {
                        dl = "\t";
                }
                if (path == null || path === undefined || path == "") {
                        path = pwd;
                }
                var list = sub(path);
                modify_content("add", list.join(dl));
        };

        /**
         * print the present working directory
         */
        function echo_pwd() {
                modify_content("add", pwd);
        };

        /**
         * change directory
         */
        function cd(child) {
                var new_pwd = pwd;
                if (child == null || child === undefined || 
                                        (/^\s*$/).test(child)) {
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
                                if (children[i].length < 1) {
                                        continue;
                                }
                                new_pwd += children[i] + "/";
                        }
                }
                if (is_dir(new_pwd)) {
                        modify_pwd("base", new_pwd);
                        modify_content("add", pwd);
                } else {
                        error("Invalid path '" + new_pwd + "'");
                }
        };

        /**
         * see the contents of the file
         */
        function cat(outfile) {
                var s = exists(outfile);
                if (s == null || s === undefined || s == false) {
                        error("Invalid file", "Path doesn't exist");
                        return;
                }
                if (is_dir(outfile)) {
                        ls(outfile, "\n");
                } else {
                        modify_content("add", s);
                }
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
                case (command == "pwd"):
                        echo_pwd();
                        break;
                case ((/^ls($|\s+)/).test(command)):
                        var child = command.replace(/^ls($|\s+)/, "");
                        ls(child);
                        break;
                case ((/^cd($|\s+)/).test(command)):
                        var child = command.replace(/^cd($|\s+)/, "");
                        cd(child);
                        break;
                case ((/^cat($|\s+)/).test(command)):
                        var outfile = command.replace(/^cat($|\s+)/, "");
                        cat(outfile);
                        break;
                case ((/^ps($|\s+)/).test(command)):
                        var config = command.replace(/^ps($|\s+)/, "");
                        pre_string(config);
                        break;
                case (command == ""):
                        break;
                //case (command == "exit"):
                //        close_window();
                //        break;
                default:
                        error("Invalid command");
                }
        };

        $('.terminal').keydown(function(e) {
                var input = e.which === undefined ? e.keyCode : e.which;

                // backspace and left arrow disabled if the cursor 
                // is to the extreme left
                if (input == 8 || input == 37) {
                        var cursor = cursor_position();
                        if (!is_cursor_position_valid(cursor)) {
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
                modify_content("new", $(this).val());

                run_command(last);
                reset_buffer();
                load_buffer(true);
                new_line_event();
        });

        /**
         * Disabling default mouse actions on the terminal.
         * TODO the terminal can't be resized because mouse events are eaten
         *      up. so if you need to do it, give some predefined values which 
         *      the user can chose by clicking on it, or give a command, which 
         *      the user can use to resize the terminal.
         * TODO determine selection behaviour of the text on mouse events
         */
        $('.terminal').mouseup(function(e) {
                e.preventDefault();
        });

        $('.terminal').mousedown(function(e) {
                e.preventDefault();
                $(this).focus();
        });

        $('.introduction').width($('.terminal').width());

});
