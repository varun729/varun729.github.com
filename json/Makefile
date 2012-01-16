
SRC_DIR		:=	src
INCLUDE_DIR	:=	include

DATA_FOLDER	:=	data
PROJECT_FOLDER	:=	project
HOBBY_FOLDER	:=	hobby

PROJECT_FILES	:=	$(wildcard $(DATA_FOLDER)/$(PROJECT_FOLDER)/*.json)
HOBBY_FILES	:=	$(wildcard $(DATA_FOLDER)/$(HOBBY_FOLDER)/*.json)
DATA_FILES	:=	$(wildcard $(DATA_FOLDER)/*.json)
#all:	main.o
#	./main.o data/project/
#

all: data.json

data.json: $(SRC_DIR)/main
	$(SRC_DIR)/main -p $(PROJECT_FILES) -h $(HOBBY_FILES) -d $(DATA_FILES) \
			-o data.json

$(SRC_DIR)/main: $(SRC_DIR)/main.c $(INCLUDE_DIR)/cJSON.c
	cc $(SRC_DIR)/main.c $(INCLUDE_DIR)/cJSON.c -o $(SRC_DIR)/main -lm
	
