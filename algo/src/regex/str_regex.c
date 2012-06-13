/**
 * regex library
 */
#include <stdlib.h>
#include <string.h>
#include "str_regex.h"

static char keychar[] = {'[', '\\', '^', '$', '.', '|', '?', '*', '+', '(', ')'};

struct reg_exp create_regexp(char *pattern)
{
	struct reg_exp *exp;
	exp = malloc(sizeof(struct reg_exp));
	exp->pattern = pattern;

        int pattern_length = strlen(pattern);
        int i;
        int token_index = 0;
        int escape_character = 0;
        for (i = 0; i < pattern_length; i++) {
                if (i == 0 && pattern[i] == '^') {
                        token_index = 1;
                        continue;
                }
                if (i == pattern_length-1 && pattern[i] == '$') {
                        continue;
                }
                if (pattern[i] == '\\') {
                        if (escape_character == 1) {
                                escape_character = 0;
                                continue;
                        } else {
                                escape_character = 1;
                                // TODO
                        }
                        // TODO
        }

	return *exp;
}

int reg_match(struct reg_exp *expression, char *str)
{
	// TODO
	return 0;
}

void reg_replace(struct reg_exp *expression, char *str, char *rstr)
{
	// TODO
}
