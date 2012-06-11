
/**
 * player
 */
struct player {
        char *name;
        int score;      /* advanced level */

        struct player next_player;
};

/**
 * card
 */
struct card {
        char suit;
        char value;
        char point;
        char rank;
};

/**
 * hand
 */
struct hand {
        struct card cards[4];
        struct player *first;
        struct player *winner;
};
