/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var DIFFICULTY_KEY = 'difficulty';

    game.DIFFICULTY_BEGINNER = 'beginner';
    game.DIFFICULTY_INTERMEDIATE = 'intermediate';
    game.DIFFICULTY_ADVANCED = 'advanced';
    game.STATUS_WON = 'won';
    game.STATUS_LOST = 'lost';
    game.MESSAGE_WON = 'Congratulations, you won the game!<br/>';
    game.MESSAGE_LOST = 'Sorry, you lost this game. Better luck next time!<br/>';

    game.config = {
        difficulty: 'beginner',
        getDifficulty: function () {
            var loaded = game.storage.load(DIFFICULTY_KEY);
            return (loaded !== 'undefined' && loaded) ? loaded : this.difficulty;
        },
        setDifficulty: function (value) {
            var saveResult = game.storage.save(DIFFICULTY_KEY, value);
            this.difficulty = value;

            if (saveResult) {
                alert(DIFFICULTY_KEY.capitalize() + ' saved as ' + value);
            }
        }
    };

})();