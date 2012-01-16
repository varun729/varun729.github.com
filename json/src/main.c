#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/cJSON.h"

#define PROJECT 1
#define HOBBY   2
#define DATA    3
#define OUTPUT  4

void usage(void);       /* print the usage */
char *clear(char *tmp); /* remove the inverted commas */
void add_content(cJSON *parent, const char *filename);
void write(const char *filename, char *output);

int main (int argc, const char * argv[])
{
        int i;
        int projects;
        int hobbies;
        int data_files;
        int out_files;
        int type;
        cJSON *root, *project, *hobby, *miscellaneous;
        const char *out_file;

        type = 0;
        projects = 0;
        hobbies = 0;
        data_files = 0;
        root = cJSON_CreateObject();
        project = cJSON_CreateObject();
        hobby = cJSON_CreateObject();
        miscellaneous = cJSON_CreateObject();
        for (i = 1; i < argc; i++) {
                if (argv[i][0] == '-') {
                        if (argv[i][1] == 'p' && argv[i][2] == '\0') {
                                type = PROJECT;
                        } else if (argv[i][1] == 'h' && argv[i][2] == '\0') {
                                type = HOBBY;
                        } else if (argv[i][1] == 'd' && argv[i][2] == '\0') {
                                type = DATA;
                        } else if (argv[i][1] == 'o' && argv[i][2] == '\0') {
                                type = OUTPUT;
                        } else {
                                usage();
                        }
                } else {
                        if (type == PROJECT) {
                                projects++;
                                add_content(project, argv[i]);
                        } else if (type == HOBBY) {
                                hobbies++;
                                add_content(hobby, argv[i]);
                        } else if (type == DATA) {
                                data_files++;
                                add_content(miscellaneous, argv[i]);
                        } else if (type == OUTPUT) {
                                out_files++;
                                out_file = argv[i];
                        }
                }
        }

        cJSON_AddItemToObject(root, "project", project);
        cJSON_AddItemToObject(root, "hobby", hobby);
        cJSON_AddItemToObject(root, "miscellaneous", miscellaneous);
        char *out;
        out = cJSON_Print(root);
        cJSON_Delete(root);
        write(out_file, out);
        free(out);

        return 0;
}

void usage()
{
        char *instructions = ""
        "Usage :\n"
        "\tmain console|ui\n";
        printf(instructions);
}

char *clear(char *tmp)
{
        char *s;
        int len = strlen(tmp);
        s = malloc(len-1);

        int i;
        for (i = 1; i < len-1; i++) {
                s[i-1] = tmp[i];
        }
        s[i] = '\0';

        return s;
}

void add_content(cJSON *parent, const char *filename)
{
        FILE *f=fopen(filename, "rb");
        fseek(f, 0, SEEK_END);
        long len = ftell(f);
        fseek(f, 0, SEEK_SET);

	char *data=malloc(len+1);
        fread(data,1,len,f);
        fclose(f);
        
        char *key;

        cJSON* json = cJSON_Parse(data);
        if (json != NULL) {
                key = clear(cJSON_Print(cJSON_GetObjectItem(json, "_Name")));

                cJSON_DeleteItemFromObject(json, "_Name");
                cJSON_AddItemToObject(parent, key, json);
        }

        free(data);
}

void write(const char *filename, char *output)
{
        FILE *file;
        file = fopen(filename, "w"); /* apend file (add text to
        a file or create a file if it does not exist.*/
        fprintf(file,"%s",output); /*writes*/
        fclose(file); /*done!*/
}
