# Makefile for creating pages
#
# make page 	# for deploying
# make test	# for testing
#

include ../Makefile

THIS_DIR = $(ALGO_DIR)

CURR_DIR = $(shell pwd)

PAGE = $(shell $(CURR_DIR)/../src/page.py --home_dir $(CURR_DIR) --prefix "page_content/" --extension ".page")

default:
	@echo "Do nothing"

listpages:
	@echo $(PAGE)

page: index.html
	@echo "Page is created with 'index.html'"

index.html: ../templates/home.tpl ../src/test.py
	$(CURR_DIR)/../src/test.py --page_title $(PAGE_TITLE) \
		     $(PAGE_LINKS) \
		     --link_page_url ../$(THIS_DIR)/ \
		     --home_directory $(CURR_DIR)/ \
		     --home_path $(CURR_DIR)/index.html \
		     --home_template $(CURR_DIR)/../$(TEMPLATES_DIR)/home.tpl \
		     --page_directory $(CURR_DIR)/ \
		     --page_template $(CURR_DIR)/../$(TEMPLATES_DIR)/page.tpl \
		     --page_content $(PAGE)

cleanall:
	@rm -f *.html
