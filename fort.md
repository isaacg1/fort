## New board game: Fort

Fort is a new territory-control game that I've invented, in the style of Go or Paper tactics.

### How to play the game

The fort board is a 61 square hex board, consisting of 5 hexagonal cycles from the center.

        * * * * *
       * * * * * *
      * * * * * * *
     * * * * * * * *
    F * * * * * * f *
     * * * * * * * *
      * * * * * * *
       * * * * * *
        * * * * *

There are two players who alternate turns.

There are two kinds of units: *dots* and *forts*. Dots can move, forts cannot.

A *turn* consists of up to three *moves*, followed by one *spawn*.

A move can be either a *step*, a *capture*, or a *claim*.
Each consists of moving a dot to an adjacent square.

* Step: Move a dot to an empty adjacent square.
* Capture: Move a dot to an adjacent square occupied by an enemy dot, removing the enemy dot from the game.
* Claim: Move a dot to an adjacent square occupied by another dot that you control,
combining both dots into a fort.

Note that forts cannot be captured.

* Spawn: Place a new dot next to one of your forts.

The spawn is mandatory: If you prevent your opponent from spawning, you win the game.

### Starting the game

At the beginning of the game, each player starts with a single fort, on the squarws marked
`F` and `f`. `F` is the first player's fort, and `f` is the second player's fort.

### Ending the game

The primary way for the game to end is because a player is prevented from spawning,
because all of their forts are surrounded.
If that happens, the player who cannot spawn loses, and the player who prevented them wins.

The game can also end via the ten turn rule:
If each player takes ten turns, and neither player has claimed in that time, the game ends.
The player with more forts wins.
If both players have the same number of forts,
the player with more dots wins.
If all units are equal, the player who is about to move wins.
