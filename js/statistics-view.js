/**
 * Created by Reza on 8/3/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    MINESWEEPER_DEFAULT_LOCALE = game.config.getLocale();

    var statsView = game.statsView = {
        getInfo: function (bestTime, played, won) {
            return '<br/><br/>' + LOCALIZATION_STRINGS.TIME + ': ' + game.stats.duration +
                ' ' + LOCALIZATION_STRINGS.SECONDS + '<br/>' + LOCALIZATION_STRINGS.BEST_TIME + ': ' + bestTime +
                ' <br/>' + LOCALIZATION_STRINGS.GAMES_PLAYED + ': ' + played +
                '<br/>' + LOCALIZATION_STRINGS.GAMES_WON + ': ' + won;
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
        var gamesPlayed = game.beginnerStats.loadGamesPlayed() !== undefined ? game.beginnerStats.loadGamesPlayed() : '';
        var duration = (bestTime.hasOwnProperty('duration')) ? bestTime.duration : '';
        var date = (bestTime.hasOwnProperty('timestamp')) ? ' (' + convertTimestamp(bestTime.timestamp) + ') ' : '';

        otp += LOCALIZATION_STRINGS.BEST_TIME + ': <span class="color-f3473e font-bold">' + duration + date + '</span><br/>';
        otp += LOCALIZATION_STRINGS.GAMES_WON + ': <span class="color-f3473e font-bold">' + gamesWon + '</span><br/>';
        otp += LOCALIZATION_STRINGS.GAMES_PLAYED + ': <span class="color-f3473e font-bold">' + gamesPlayed + '</span><br/>';

        return otp;
    };

    var intermediateView = Object.create(statsView);
    intermediateView.node = document.getElementById('stats-intermediate');
    intermediateView.getLevelInfo = function () {
        var otp = '';
        var bestTime = game.intermediateStats.loadBestTimes() !== undefined ? game.intermediateStats.loadBestTimes() : '';
        var gamesWon = game.intermediateStats.loadGamesWon() !== undefined ? game.intermediateStats.loadGamesWon() : '';
        var gamesPlayed = game.intermediateStats.loadGamesPlayed() !== undefined ? game.intermediateStats.loadGamesPlayed() : '';
        var duration = (bestTime.hasOwnProperty('duration')) ? bestTime.duration : '';
        var date = (bestTime.hasOwnProperty('timestamp')) ? ' (' + convertTimestamp(bestTime.timestamp) + ') ' : '';

        otp += LOCALIZATION_STRINGS.BEST_TIME + ': <span class="color-f3473e font-bold">' + duration + date + '</span><br/>';
        otp += LOCALIZATION_STRINGS.GAMES_WON + ': <span class="color-f3473e font-bold">' + gamesWon + '</span><br/>';
        otp += LOCALIZATION_STRINGS.GAMES_PLAYED + ': <span class="color-f3473e font-bold">' + gamesPlayed + '</span><br/>';

        return otp;
    };

    var advancedView = Object.create(statsView);
    advancedView.node = document.getElementById('stats-advanced');
    advancedView.getLevelInfo = function () {
        var otp = '';
        var bestTime = game.advancedStats.loadBestTimes() !== undefined ? game.advancedStats.loadBestTimes() : '';
        var gamesWon = game.advancedStats.loadGamesWon() !== undefined ? game.advancedStats.loadGamesWon() : '';
        var gamesPlayed = game.advancedStats.loadGamesPlayed() !== undefined ? game.advancedStats.loadGamesPlayed() : '';
        var duration = (bestTime.hasOwnProperty('duration')) ? bestTime.duration : '';
        var date = (bestTime.hasOwnProperty('timestamp')) ? ' (' + convertTimestamp(bestTime.timestamp) + ') ' : '';

        otp += LOCALIZATION_STRINGS.BEST_TIME + ': <span class="color-f3473e font-bold">' + duration + date + '</span><br/>';
        otp += LOCALIZATION_STRINGS.GAMES_WON + ': <span class="color-f3473e font-bold">' + gamesWon + '</span><br/>';
        otp += LOCALIZATION_STRINGS.GAMES_PLAYED + ': <span class="color-f3473e font-bold">' + gamesPlayed + '</span><br/>';

        return otp;
    };

    var convertTimestamp = function (timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + '/' + month + '/' + day;
    };
})();