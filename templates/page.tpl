%% This is a template file for generating the html files
%%
%% Instructions:
%% 1. Lines starting with '%%' are comments and will be ignored
%% 2. To add a variable in the template use %[variable-name]
%%
<html itemscope itemtype="http://schema.org/">
<head>
%IF[css_url][<link rel="stylesheet" href="%{css_url}" type="text/css" />]
<title>%[title]</title>
<!-- Place this tag where you want the +1 button to render -->

<!-- Add the following three tags inside head -->
<meta itemprop="name" content="%[title]">
<!--<meta itemprop="description" content="This would be a description of the content
your users are sharing">-->

<!-- Place this render call where appropriate -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  })();
</script>

</head>
<body>

<div class="page">

<div class="header">
[<a href="%[home_page_url]" >home</a>]
[<a href="%[algo_url]" >algorithms</a>]
[<a href="%[blog_url]" >blog</a>]
</div>

<hr />

<div class="content">
<i>%[date]</i>
<h2>%[title]</h2>
<g:plusone></g:plusone>
%[content]
</div>

</div>

</body>
</html>
