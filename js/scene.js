/**
 * Created by Reza on 7/18/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var checkedDifficulty = '#difficulty input[name="difficulty"]:checked';
    var difficultyArray = '#difficulty input[name="difficulty"]';

    var scene = {
        node: document.querySelector('.scene'),
        backToStartBtn: document.getElementById('back-to-start'),
        show: function () {
            this.node.classList.remove('out');
            this.node.classList.add('in');
        },
        hide: function () {
            this.node.classList.remove('in');
            this.node.classList.add('out');
        },
        handleBackToStart: function () {
            this.backToStartBtn.onclick = function () {
                game.flow.startOver();
            };
        }
    };

    var gameScene = game.gameScene = Object.create(scene);
    gameScene.node = document.getElementById('game-scene');
    gameScene.handleInput = function () {

    };
    gameScene.handleBackToStart = function () {
        this.backToStartBtn.onclick = function () {
            game.board.resetSize();
            game.flow.startOver();
        };
    };
    gameScene.visualize = function () {
        gameScene.node.appendChild(scene.backToStartBtn);
        game.board.getBoard().draw();
    };

    var startScene = game.startScene = Object.create(scene);
    startScene.node = document.getElementById('start-scene');
    startScene.handleInput = function () {
        document.getElementById('newgame-btn').onclick = function () {
            game.flow.newGame();
        };
    };

    var optionsScene = game.optionsScene = Object.create(scene);
    optionsScene.node = document.getElementById('options-scene');
    optionsScene.handleInput = function () {
        document.getElementById('options-btn').onclick = function () {
            optionsScene.node.appendChild(scene.backToStartBtn);
            optionsScene.setLoadedDifficulty(game.config.getDifficulty());

            var saveBlock = document.getElementById('save-block-btn');
            var saveBtn = document.getElementById('save-btn');
            saveBtn.onclick = function () {
                var selected = document.querySelector(checkedDifficulty).value;
                game.config.setDifficulty(selected);
            };

            optionsScene.node.appendChild(saveBlock);
            game.flow.showOptions();
        };
    };
    optionsScene.setLoadedDifficulty = function (checked) {
        var arr = document.querySelectorAll(difficultyArray);

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].value === checked) {
                arr[i].checked = true;
                break;
            }
        }
    };

    var statsScene = game.statsScene = Object.create(scene);
    statsScene.node = document.getElementById('stats-scene');
    statsScene.handleInput = function () {
        document.getElementById('stats-btn').onclick = function () {
            statsScene.node.appendChild(scene.backToStartBtn);
            game.flow.showStats();
        };
    };

    var helpScene = game.helpScene = Object.create(scene);
    helpScene.node = document.getElementById('help-scene');
    helpScene.handleInput = function () {
        document.getElementById('help-btn').onclick = function () {
            helpScene.node.appendChild(scene.backToStartBtn);
            game.flow.showHelp();
        };
    };

    var aboutScene = game.aboutScene = Object.create(scene);
    aboutScene.node = document.getElementById('about-scene');
    aboutScene.handleInput = function () {
        document.getElementById('about-btn').onclick = function () {
            aboutScene.node.appendChild(scene.backToStartBtn);
            game.flow.showAbout();
        };
    };
})();