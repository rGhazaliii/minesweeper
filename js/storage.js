/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};

    var checkCompatibility = function () {
        return (typeof (Storage) !== 'undefined');
    };

    game.storage = {
        save: function (key, value) {
            if (checkCompatibility()) {
                localStorage.setItem(key, value);
                return true;
            } else {
                alert(LOCALIZATION_STRINGS.SAVING_NOT_SUPPORTED);
            }
        },
        load: function (key) {
            if (checkCompatibility()) {
                return localStorage.getItem(key);
            } else {
                alert(LOCALIZATION_STRINGS.LOADING_NOT_SUPPORTED);
            }
        }
    };
})();