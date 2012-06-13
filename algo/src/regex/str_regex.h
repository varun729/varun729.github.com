

/**
 * regex struct object
 */
struct reg_exp {
        char *pattern;
};

/**
 * create regular expression
 * pattern : regular expression pattern
 * return pointer to regular expression object
 */
struct reg_exp create_regexp(char *pattern);

/**
 * check if the regular expression is found in a string
 * expression : pointer to regular expression
 * str : string
 * return location
 */
int reg_match(struct reg_exp *expression, char *str);

/**
 * check if the regular expression is found, if present replace it
 * expression : pointer to regular expression
 * str : string to be searched
 * rstr : replacement string
 */
void reg_replace(struct reg_exp *expression, char *str, char *rstr);
