/**
 * Created by Reza on 7/18/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var timerDivId = 'timer';

    game.timer = {
        interval: undefined,
        countFrom: 60,
        count: this.countFrom,
        progressView: document.getElementById(timerDivId),
        restart: function () {
            if (this.interval) {
                clearInterval(this.interval);
            }

            this.count = this.countFrom;
            this.interval = setInterval((this.tick).bind(this), 1000);
        },
        stop: function () {
            clearInterval(this.interval);
        },
        tick: function () {
            this.count -= 1;

            if (this.count <= 0) {
                this.count = 0;
                clearInterval(this.interval);
                game.flow.gameOver();
            }

            var progress = this.count / this.countFrom * 100;
            this.progressView.style.width = progress + "%";
        }
    }
})();