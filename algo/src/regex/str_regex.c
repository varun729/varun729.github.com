/**
 * regex library
 */
#include <stdlib.h>
#include "str_regex.h"

struct reg_exp create_regexp(char *pattern)
{
	struct reg_exp *exp;
	exp = malloc(sizeof(struct reg_exp));
	exp->pattern = pattern;
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
