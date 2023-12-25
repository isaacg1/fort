## New board game: Fort

Fort is a new territory-control game that I've invented, in the style of Go or Paper Tactics.

### How to play the game

The fort board is a 61 square hex board:

        * * * * *
       * * * * * *
      * * * * * * *
     * * * * * * * *
    F * * * * * * f *
     * * * * * * * *
      * * * * * * *
       * * * * * *
        * * * * *

There are two players who alternate turns (also known as moves).

There are two kinds of units: *dots* and *forts*. Dots can move, forts cannot.

A *turn* (or a *move*) consists of up to three *steps*, followed by one *spawn*.

Each of the three steps consists of moving a dot to an adjacent square.
A step can be either a *walk*, a *capture*, or a *claim*.

* Walk: Move a dot to an empty adjacent square.
* Capture: Move a dot to an adjacent square occupied by an enemy dot,
removing the enemy dot from the game.
* Claim: Move a dot to an adjacent square occupied by another dot that you control,
combining both dots into a fort.

Note that forts cannot be captured.

* Spawn: Place a new dot on an empty square next to one of your forts.

The spawn is mandatory: If you prevent your opponent from spawning, you win the game.

### Starting the game

At the beginning of the game, each player starts with a single fort, on the squares marked
`F` and `f`. `F` is the first player's fort, and `f` is the second player's fort.

### Ending the game

The primary way for the game to end is because a player is prevented from spawning,
because all of their forts are surrounded.
If that happens, the player who cannot spawn loses, and the player who prevented them wins.

Commonly, the board will get divided into two regions, one controlled by each player.
At the point, the game can usually be adjudicated by counting which player controls more territory,
but the game can also be played out to the end to make sure.

### Repetition rule

Occasionally, players might get into a cycle where each is playing a move
that undoes the opponent's move.
Fort uses the
[Arimaa repetition rule](https://en.wikibooks.org/wiki/Arimaa/Glossary#Repetition_rule):
A player who has already completed their turn in a given position twice
may never end their turn in that exact position again.
The player must diverge and play a different move instead.
