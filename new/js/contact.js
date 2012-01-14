/**
 * This file is to print my email ids on the homepage, hoping that any spam 
 * crawler doesn't catch my email id.
 * This is hoping that the crawler extracts the html file of the page, and not 
 * the contents of the page after javascript replaces them.
 *
 * Hopefully this works.
 */
$(document).ready(function() {
        var personal = ['v', 'a', 'r', 'u', 'n', '@', 'a', 'g', 'r', 'a', 'w', 'a', 'l', '-', 'v', 'a', 'r', 'u', 'n', '.', 'c', 'o', 'm'].join("");
        var gmail = ['v', 'a', 'r', 'u', 'n', '7', '2', '9', '@', 'g', 'm', 'a', 'i', 'l', '.', 'c', 'o', 'm'].join("");
        var contact = "Contact:\n" + 
                "    " + personal + "\n" +
                "    " + gmail + "\n" + 
                "    " + "<a href='http://github.com/varun729'>http://github.com/varun729</a>" + "\n";
        $('.introduction').append("\n" + contact);
});
