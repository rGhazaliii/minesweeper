/**
 * Created by Reza on 7/18/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};

    game.timer = {
        interval: undefined,
        count: 0,
        start: function () {
            if (game.timer.count === 0) {
                game.timer.restart();
            }
        },
        restart: function () {
            if (this.interval) {
                clearInterval(this.interval);
            }

            this.interval = setInterval((this.tick).bind(this), 1000);
        },
        stop: function () {
            clearInterval(this.interval);
            this.count = 0;
        },
        tick: function () {
            this.count += 1;
            game.board.updateTimerCount();
        }
    }
})();