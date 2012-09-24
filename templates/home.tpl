%% This is a template file for generating the html files
%%
%% Instructions:
%% 1. Lines starting with '%%' are comments and will be ignored
%% 2. To add a variable in the template use %[variable-name]
%%
<html>
<head>
%IF[css_url][<link rel="stylesheet" href="%{css_url}" type="text/css" />]
<title>%[page_title]</title>
</head>
<body>

<div class="page">

<div class="header">
[<a href="%[home_page_url]" >home</a>]
[<a href="%[algo_url]" >algorithms</a>]
[<a href="%[blog_url]" >blog</a>]
[<a href="%[projects_url]" >projects</a>]
</div>

<hr />

<div class="content">
<div class="page_links">
%LI[p:page_content][<a href="%{p.href}">%{p.title}</a>]
</div>
</div>

</div>

</body>
</html>
