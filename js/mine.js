/**
 * Created by Reza on 7/21/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};

    var mine = game.mine = {
        limit: undefined,
        minesIndex: [],
        setLimit: function (limit) {
            this.limit = limit;
        },
        generateMines: function (num) {
            for (var i = 0; i < mine.limit; i++) {
                mine.minesIndex[i] = 0;
            }

            var mineCntr = 0;
            while (mineCntr !== num) {
                var randomIndex = Math.floor(Math.random() * mine.limit);

                if (mine.minesIndex[randomIndex] === 0) {
                    mine.minesIndex[randomIndex] = 1;
                    mineCntr++;
                }
            }
        },
        isMine: function (x, y) {
            var selectedIndex = convertMineIndex(x, y);
            return (mine.minesIndex[selectedIndex]);
        },
        replaceMine: function (x, y) {
            var selectedIndex = convertMineIndex(x, y);

            do {
                var newMineIndex = Math.floor(Math.random() * mine.limit);
            } while (mine.minesIndex[newMineIndex] === 1);

            mine.minesIndex[selectedIndex] = 0;
            mine.minesIndex[newMineIndex] = 1;
        },
        getMinesIndex: function () {
            return this.minesIndex;
        }
    };

    var convertMineIndex = function (x, y) {
        return x * game.board.current.columns + y;
    };
})();