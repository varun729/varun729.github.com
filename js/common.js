$(document).ready(function(){
  $('.content_header_btn').hover(
      function() {
        var $this = $(this);
        $this.data('initialText', $this.text());
        var newText = $this.text().replace("-- ", ">> ");
        newText = newText.replace(" --", " <<");
        $this.text(newText);
      },
      function() {
        var $this = $(this);
        $this.text($this.data('initialText'));
      }
  );

  $("p").click(function() {
    $(this).hide();
  });
});
