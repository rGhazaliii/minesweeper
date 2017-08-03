/**
 * Created by Reza on 8/3/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};

    var statsView = game.statsView = {
        getInfo: function (bestTime, played, won) {
            return '<br/><br/>Time: ' + game.stats.duration +
                ' seconds<br/>Best time: ' + bestTime +
                ' <br/>Games played: ' + played +
                '<br/>Games won: ' + won;
        },
        visualize: function () {
            beginnerView.node.innerHTML = beginnerView.getLevelInfo();
            intermediateView.node.innerHTML = intermediateView.getLevelInfo();
            advancedView.node.innerHTML = advancedView.getLevelInfo();
        }
    };

    var beginnerView = Object.create(statsView);
    beginnerView.node = document.getElementById('stats-beginner');
    beginnerView.getLevelInfo = function () {
        var otp = '';
        var bestTime = game.beginnerStats.loadBestTimes() !== undefined ? game.beginnerStats.loadBestTimes() : '';
        var gamesWon = game.beginnerStats.loadGamesWon() !== undefined ? game.beginnerStats.loadGamesWon() : '';
        var gamesPlayed = game.beginnerStats.loadGamesWon() !== undefined ? game.beginnerStats.loadGamesPlayed() : '';
        var duration = (bestTime.hasOwnProperty('duration')) ? bestTime.duration : '';
        var date = (bestTime.hasOwnProperty('timestamp')) ? ' (' + convertTimestamp(bestTime.timestamp) + ') ' : '';

        otp += 'Best time: <span class="color-f3473e font-bold">' + duration + date + '</span><br/>';
        otp += 'Games won: <span class="color-f3473e font-bold">' + gamesWon + '</span><br/>';
        otp += 'Games played: <span class="color-f3473e font-bold">' + gamesPlayed + '</span><br/>';

        return otp;
    };

    var intermediateView = Object.create(statsView);
    intermediateView.node = document.getElementById('stats-intermediate');
    intermediateView.getLevelInfo = function () {
        var otp = '';
        var bestTime = game.intermediateStats.loadBestTimes() !== undefined ? game.intermediateStats.loadBestTimes() : '';
        var gamesWon = game.intermediateStats.loadGamesWon() !== undefined ? game.intermediateStats.loadGamesWon() : '';
        var gamesPlayed = game.intermediateStats.loadGamesWon() !== undefined ? game.intermediateStats.loadGamesPlayed() : '';
        var duration = (bestTime.hasOwnProperty('duration')) ? bestTime.duration : '';
        var date = (bestTime.hasOwnProperty('timestamp')) ? ' (' + convertTimestamp(bestTime.timestamp) + ') ' : '';

        otp += 'Best time: <span class="color-f3473e font-bold">' + duration + date + '</span><br/>';
        otp += 'Games won: <span class="color-f3473e font-bold">' + gamesWon + '</span><br/>';
        otp += 'Games played: <span class="color-f3473e font-bold">' + gamesPlayed + '</span><br/>';

        return otp;
    };

    var advancedView = Object.create(statsView);
    advancedView.node = document.getElementById('stats-advanced');
    advancedView.getLevelInfo = function () {
        var otp = '';
        var bestTime = game.advancedStats.loadBestTimes() !== undefined ? game.advancedStats.loadBestTimes() : '';
        var gamesWon = game.advancedStats.loadGamesWon() !== undefined ? game.advancedStats.loadGamesWon() : '';
        var gamesPlayed = game.advancedStats.loadGamesWon() !== undefined ? game.advancedStats.loadGamesPlayed() : '';
        var duration = (bestTime.hasOwnProperty('duration')) ? bestTime.duration : '';
        var date = (bestTime.hasOwnProperty('timestamp')) ? ' (' + convertTimestamp(bestTime.timestamp) + ') ' : '';

        otp += 'Best time: <span class="color-f3473e font-bold">' + duration + date + '</span><br/>';
        otp += 'Games won: <span class="color-f3473e font-bold">' + gamesWon + '</span><br/>';
        otp += 'Games played: <span class="color-f3473e font-bold">' + gamesPlayed + '</span><br/>';

        return otp;
    };

    var convertTimestamp = function (timestamp) {
        var date = new Date(timestamp);

        return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay();
    };
})();