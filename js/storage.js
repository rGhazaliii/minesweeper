/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};

    var checkCompatibility = function () {
        return (typeof(Storage) !== 'undefined');
    };

    game.storage = {
        save: function (key, value) {
            if (checkCompatibility()) {
                localStorage.setItem(key, value);
                alert(key.capitalize() + ' saved as ' + value);
            } else {
                alert('Saving is not supported!');
            }
        },
        load: function (key) {
            if (checkCompatibility()) {
                return localStorage.getItem(key);
            } else {
                alert('Loading is not supported!');
            }
        }
    };
})();