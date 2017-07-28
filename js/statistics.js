/**
 * Created by Reza on 7/27/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var BEST_TIMES_KEY = 'besttimes';
    var GAMES_PLAYED_KEY = 'gamesplayed';
    var GAMES_WON_KEY = 'gameswon';

    var stats = game.stats = {
        level: undefined,
        duration: undefined,
        bestTimes: [],
        gamesPlayed: [],
        gamesWon: [],
        getStats: function () {
            switch (game.config.getDifficulty()) {
                case game.DIFFICULTY_BEGINNER:
                    return beginnerStats;
                case game.DIFFICULTY_INTERMEDIATE:
                    return intermediateStats;
                case game.DIFFICULTY_ADVANCED:
                    return advancedStats;
            }
        },
        getInfo: function (duration) {
            var bestTimes = this.getBestTimes();
            var bestTime = '';
            if (bestTimes.length !== 0) {
                bestTimes.sort(compare);
                bestTime = bestTimes[0].duration + ' seconds';
            }

            var gamesPlayed = this.getGamesPlayed();
            var played = 0;
            if (gamesPlayed) {
                played = gamesPlayed.number;
            }

            var gamesWon = this.getGamesWon();
            var won = 0;
            if (gamesWon) {
                won = gamesWon.number;
            }

            return '<br/><br/>Time: ' + duration +
                ' seconds<br/>Best time: ' + bestTime +
                ' <br/>Games played: ' + played +
                '<br/>Games won: ' + won;
        },
        updateStats: function (duration, gameStatus) {
            stats.duration = duration;
            var gameLevel = this.getStats();

            switch (gameStatus) {
                case game.STATUS_WON:
                    gameLevel.setBestTimes();
                    gameLevel.updateGamesWon();
                    gameLevel.updateGamesPlayed();
                    break;
                case game.STATUS_LOST:
                    gameLevel.updateGamesPlayed();
                    break;
            }

        },
        getBestTimes: function () {
            var bestTimes = loadBestTimes();
            var result = [];

            if (bestTimes !== null) {
                for (var i = 0; i < bestTimes.length; i++) {
                    if (bestTimes[i].level === stats.level) {
                        result.push(bestTimes[i]);
                    }
                }
            }

            return result;
        },
        setBestTimes: function () {
            stats.bestTimes = loadBestTimes();
            if (stats.bestTimes === null) {
                stats.bestTimes = [];
            }

            var currentDate = new Date();
            var timestamp = currentDate.getTime();
            var obj = {'level': stats.level, 'duration': stats.duration, 'timestamp': timestamp};

            var levelBestTime = getLevelBestTime();
            if (stats.bestTimes !== null && stats.bestTimes.length === 0) {
                var arr = [];
                arr.push(obj);
                stats.bestTimes = arr;
            } else if (levelBestTime === undefined) {
                stats.bestTimes.push(obj);
            } else {
                for (var i = 0; i < stats.bestTimes.length; i++) {
                    if (stats.bestTimes[i].level == stats.level && parseInt(stats.duration) < parseInt(stats.bestTimes[i].duration)) {
                        stats.bestTimes[i] = obj;
                        break;
                    }
                }
            }

            game.storage.save(BEST_TIMES_KEY, JSON.stringify(stats.bestTimes));
        },
        getGamesPlayed: function () {
            var gamesPlayed = loadGamesPlayed();

            if (gamesPlayed !== null) {
                for (var i = 0; gamesPlayed.length; i++) {
                    if (gamesPlayed[i].level === stats.level) {
                        return gamesPlayed[i];
                    }
                }
            }
        },
        updateGamesPlayed: function () {
            if (stats.gamesPlayed.length === 0) {
                stats.gamesPlayed = loadGamesPlayed();
            }

            var levelGamesPlayed = null;
            if (stats.gamesPlayed !== null) {
                for (var i = 0; i < stats.gamesPlayed.length; i++) {
                    if (stats.gamesPlayed[i].level === stats.level) {
                        levelGamesPlayed = stats.gamesPlayed[i];
                        break;
                    }
                }
            }

            if (levelGamesPlayed !== null) {
                levelGamesPlayed.number += 1;
                stats.gamesPlayed[i] = levelGamesPlayed;
            } else {
                levelGamesPlayed = {'level': stats.level, 'number': 1};
                var arr = [];
                arr.push(levelGamesPlayed);
                stats.gamesPlayed = arr;
            }

            game.storage.save(GAMES_PLAYED_KEY, JSON.stringify(stats.gamesPlayed));
        },
        getGamesWon: function () {
            var gamesWon = loadGamesWon();

            if (gamesWon !== null) {
                for (var i = 0; gamesWon.length; i++) {
                    if (gamesWon[i].level === stats.level) {
                        return gamesWon[i];
                    }
                }
            }
        },
        updateGamesWon: function () {
            if (stats.gamesWon === undefined) {
                stats.gamesWon = this.getGamesWon();
            }

            var levelGamesWon = null;
            for (var i = 0; i < stats.gamesWon.length; i++) {
                if (gamesWon.hasOwnProperty(stats.gamesWon[i]) && stats.gamesWon[i].level === stats.level) {
                    levelGamesWon = stats.gamesWon[i];
                    break;
                }
            }

            if (levelGamesWon) {
                levelGamesWon.number += 1;
                stats.gamesWon[i] = levelGamesWon;
            } else {
                levelGamesWon = {'level': stats.level, 'number': 1};
                stats.gamesWon.push(levelGamesWon);
            }

            game.storage.save(GAMES_WON_KEY, JSON.stringify(stats.gamesWon));
        }
    };

    var beginnerStats = Object.create(stats);
    beginnerStats.level = 'Beginner';
    beginnerStats.getBestTimes = function () {
        stats.level = beginnerStats.level;
        Object.getPrototypeOf(this).getBestTimes.call(this);
    };
    beginnerStats.setBestTimes = function () {
        stats.level = beginnerStats.level;
        Object.getPrototypeOf(this).setBestTimes.call(this);
    };
    beginnerStats.getGamesPlayed = function () {
        stats.level = beginnerStats.level;
        Object.getPrototypeOf(this).getGamesPlayed.call(this);
    };
    beginnerStats.updateGamesPlayed = function () {
        stats.level = beginnerStats.level;
        Object.getPrototypeOf(this).updateGamesPlayed.call(this);
    };
    beginnerStats.updateGamesWon = function () {
        stats.level = beginnerStats.level;
        Object.getPrototypeOf(this).updateGamesWon.call(this);
    };

    var intermediateStats = Object.create(stats);
    intermediateStats.level = 'Intermediate';
    intermediateStats.getBestTimes = function () {
        stats.level = intermediateStats.level;
        Object.getPrototypeOf(this).getBestTimes.call(this);
    };
    intermediateStats.setBestTimes = function () {
        stats.level = intermediateStats.level;
        Object.getPrototypeOf(this).setBestTimes.call(this);
    };
    intermediateStats.getGamesPlayed = function () {
        stats.level = intermediateStats.level;
        Object.getPrototypeOf(this).getGamesPlayed.call(this);
    };
    intermediateStats.updateGamesPlayed = function () {
        stats.level = intermediateStats.level;
        Object.getPrototypeOf(this).updateGamesPlayed.call(this);
    };
    intermediateStats.updateGamesWon = function () {
        stats.level = intermediateStats.level;
        Object.getPrototypeOf(this).updateGamesWon.call(this);
    };

    var advancedStats = Object.create(stats);
    advancedStats.level = 'Advanced';
    advancedStats.getBestTimes = function () {
        stats.level = advancedStats.level;
        Object.getPrototypeOf(this).getBestTimes.call(this);
    };
    advancedStats.setBestTimes = function () {
        stats.level = advancedStats.level;
        Object.getPrototypeOf(this).setBestTimes.call(this);
    };
    advancedStats.getGamesPlayed = function () {
        stats.level = advancedStats.level;
        Object.getPrototypeOf(this).getGamesPlayed.call(this);
    };
    advancedStats.updateGamesPlayed = function () {
        stats.level = advancedStats.level;
        Object.getPrototypeOf(this).updateGamesPlayed.call(this);
    };
    advancedStats.updateGamesWon = function () {
        stats.level = advancedStats.level;
        Object.getPrototypeOf(this).updateGamesWon.call(this);
    };

    var getLevelBestTime = function () {
        if (stats.bestTimes !== null) {
            for (var i = 0; i < stats.bestTimes.length; i++) {
                if (stats.bestTimes[i].level == stats.level) {
                    return stats.bestTimes[i].duration;
                }
            }
        }
    };

    var compare = function (a, b) {
        if (a.duration < b.duration) {
            return 1;
        } else if (a.duration > b.duration) {
            return -1;
        }

        return 0;
    };

    var loadGamesPlayed = function () {
        var loaded = game.storage.load(GAMES_PLAYED_KEY);
        return JSON.parse(loaded);
    };

    var loadGamesWon = function () {
        var loaded = game.storage.load(GAMES_WON_KEY);
        return JSON.parse(loaded);
    };

    var loadBestTimes = function () {
        var loaded = game.storage.load(BEST_TIMES_KEY);
        return JSON.parse(loaded);
    };
})();