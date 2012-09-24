
# To add a new directory:
# 1. Add a variable below storing the name of the directory, and add a page link in PAGE_LINKS below
# 2. Make a copy of the the new_dir folder
# 3. Add a link to it in the index.html of the homepage

# INITIALIZING SOME VALUES FOR THE BLOG

PAGE_TITLE = "Varun Agrawal"
ALGO_DIR = algo
BLOG_DIR = blog
PROJECTS_DIR = projects
TEMPLATES_DIR = templates


# FOR SUB-DIRECTORIES
PAGE_LINKS = --home_page_url ../index.html \
             --algo_url ../$(ALGO_DIR)/index.html \
             --blog_url ../$(BLOG_DIR)/index.html \
             --projects_url ../$(PROJECTS_DIR)/index.html \
	     	 --css_url ../css/page.css \

test:
	cd algo; make cleanall page; cd ..
	cd blog; make cleanall page; cd ..
	cd projects; make cleanall page; cd ..
	
