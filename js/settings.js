/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var DIFFICULTY_KEY = 'difficulty';
    var LOCALE_KEY = 'locale';
    var DIR_KEY = 'dir';

    game.DIFFICULTY_BEGINNER = 'beginner';
    game.DIFFICULTY_INTERMEDIATE = 'intermediate';
    game.DIFFICULTY_ADVANCED = 'advanced';
    game.STATUS_WON = 'won';
    game.STATUS_LOST = 'lost';
    game.MESSAGE_WON = LOCALIZATION_STRINGS.MESSAGE_WON;
    game.MESSAGE_LOST = LOCALIZATION_STRINGS.MESSAGE_LOST;

    game.config = {
        difficulty: 'beginner',
        locale: MINESWEEPER_DEFAULT_LOCALE,
        getDifficulty: function () {
            var loaded = game.storage.load(DIFFICULTY_KEY);

            return (loaded !== 'undefined' && loaded) ? loaded : this.difficulty;
        },
        setDifficulty: function (value) {
            var saveResult = game.storage.save(DIFFICULTY_KEY, value);
            this.difficulty = value;

            return saveResult;
        },
        getLocale: function () {
            var loaded = game.storage.load(LOCALE_KEY);

            return (loaded !== 'undefined' && loaded) ? loaded : this.locale;
        },
        setLocale: function (value) {
            if (value === 'fa') {
                game.storage.save(DIR_KEY, 'rtl');
            } else {
                game.storage.save(DIR_KEY, 'ltr');
            }

            var saveResult = game.storage.save(LOCALE_KEY, value);
            this.locale = value;

            return saveResult;
        }
    };
})();