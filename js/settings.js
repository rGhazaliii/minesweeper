/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var DIFFICULTY_KEY = 'difficulty';

    game.DIFFICULTY_BEGINNER = 'beginner';
    game.DIFFICULTY_INTERMEDIATE = 'intermediate';
    game.DIFFICULTY_ADVANCED = 'advanced';

    game.config = {
        difficulty: 'beginner',
        getDifficulty: function () {
            var loaded = game.storage.load(DIFFICULTY_KEY);
            return (loaded !== 'undefined' && loaded) ? loaded : this.difficulty;
        },
        setDifficulty: function (value) {
            game.storage.save(DIFFICULTY_KEY, value);
            this.difficulty = value;
        }
    };

})();