/**
 * Created by Reza on 7/18/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};

    var init = function () {
        game.startScene.handleInput();
        game.gameScene.handleInput();
        game.optionsScene.handleInput();
        game.helpScene.handleInput();
        game.aboutScene.handleInput();
        game.winScene.handleInput();
        game.gameoverScene.handleInput();
    };

    var checkBrowser = function () {
        var browser = game.browser.create();
        return (browser && browser.isCompatible());
    };

    game.flow = {
        newGame: function () {
            game.startScene.hide();
            game.gameScene.visualize();
            game.gameScene.show();
            game.timer.stop();
            game.gameScene.handleBackToStart();
        },
        showOptions: function () {
            game.startScene.hide();
            game.optionsScene.show();
            game.optionsScene.handleBackToStart();
        },
        showHelp: function () {
            game.startScene.hide();
            game.helpScene.show();
            game.helpScene.handleBackToStart();
        },
        showAbout: function () {
            game.startScene.hide();
            game.aboutScene.show();
            game.aboutScene.handleBackToStart();
        },
        startOver: function () {
            game.startScene.hide();
            game.gameoverScene.hide();
            game.gameScene.hide();
            game.optionsScene.hide();
            game.helpScene.hide();
            game.aboutScene.hide();
            game.startScene.show();
            game.timer.stop();
            location.reload();
        }
    };

    if (checkBrowser()) {
        init();
    } else {
        alert('Your browser is not compatible, please UPGRADE!');
    }
})();