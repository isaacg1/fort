## New board game: Fort

Territory-control game, in the style of Go, Paper tactics.

Board: 61 square hex board (5 hexagonal cycles from the center)

        * * * * *
       * * * * * *
      * * * * * * *
     * * * * * * * *
    * * * * * * * * *
     * * * * * * * *
      * * * * * * *
       * * * * * *
        * * * * *

There are two players, who alternate turns.

### How to play the game

There are two kinds of units: *pieces* and *forts*. Pieces can move, forts cannot.

A *turn* consists of up to three *moves*, followed by one *spawn*.

A move can be either a *step*, a *capture*, or a *claim*.

* Step: Move a piece to an empty adjacent square.
* Capture: Move a piece to an adjacent square occupied by an enemy piece, removing the enemy piece from the game.
* Claim: Turn a piece into a fort.

Note that forts cannot be captured.

* Spawn: Place a new piece next to one of your forts.

The spawn if mandatory: If you prevent your opponent from spawning, you win the game.

### Starting the game

At the beginning of the game, the board is empty.
On the first move, each player places a fort on a square of their choice, and then spawns. All subsequent turns consist of up to three moves and one spawn, as described above.

### Ending the game

The primary way for the game to end is because a player is prevented from spawning, because all of their forts are surrounded. If that happens, the player who cannot spawn loses, and the player who prevented them wins.

The game can also end via the ten turn rule: If each player takes ten turns, and neither player has claimed in that time, the game ends. The player with more forts wins. If both players have the same number of forts, the player with more pieces wins. If all units are equal, the game is a draw.