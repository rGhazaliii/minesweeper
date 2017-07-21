/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var container = document.getElementById('board');

    var gameContainer = {
        node: document.getElementById('game'),
        defaultWidth: '480',
        defaultHeight: '600'
    };

    var cell = {
        width: '20px',
        height: '20px',
        backgroundColor: '#6993e6'
    };

    var getBoardWidth = function () {
        return board.width;
    };

    var setBoardWidth = function (width) {
        board.width = width;
    };

    var getBoardHeight = function () {
        return board.height;
    };

    var setBoardHeight = function (height) {
        board.height = height;
    };

    var resizeGameContainer = function (width, height) {
        width = width + 'px';
        gameContainer.node.style.width = width;

        height = height + 'px';
        gameContainer.node.style.height = height;
    };

    var handleInput = function (event) {
        var btn = event.target;
        var x = parseInt(btn.getAttribute('data-row'));
        var y = parseInt(btn.getAttribute('data-column'));

        if (board.current === undefined) {
            board.current = board.getBoard();
        }

        var selectedIndex = x * board.current.columns + y;
        var selectedMine = game.mine.isMine(selectedIndex);

        if (selectedMine) {
            alert('You lose!');
            game.flow.startOver();
        } else {
            traverseBoard();
        }
    };

    var traverseBoard = function () {

    };

    var board = game.board = {
        current: undefined,
        container: container,
        width: undefined,
        height: undefined,
        rows: 9,
        columns: 9,
        mines: 10,
        getBoard: function () {
            switch (game.config.getDifficulty()) {
                case game.DIFFICULTY_BEGINNER:
                    return beginnerBoard;
                case game.DIFFICULTY_INTERMEDIATE:
                    return intermediateBoard;
                case game.DIFFICULTY_ADVANCED:
                    return advancedBoard;
            }
        },
        resetSize: function () {
            resizeGameContainer(gameContainer.defaultWidth, gameContainer.defaultHeight);
        },
        draw: function () {
            container.removeAllChildren();
            game.mine.setLimit(board.rows * board.columns);
            game.mine.generateMines(board.mines);

            for (var i = 0; i < this.rows; i++) {
                var tr = document.createElement('tr');
                tr.style.height = cell.height;

                for (var j = 0; j < this.columns; j++) {
                    var td = document.createElement('td');
                    td.style.width = cell.width;
                    td.style.height = cell.height;

                    var btn = document.createElement('button');
                    btn.style.width = cell.width;
                    btn.style.height = cell.height;
                    btn.style.backgroundColor = cell.backgroundColor;
                    btn.setAttribute('data-row', i.toString());
                    btn.setAttribute('data-column', j.toString());
                    btn.addEventListener('click', handleInput);

                    td.appendChild(btn);
                    tr.appendChild(td);
                }

                container.appendChild(tr);
            }

            setBoardWidth(container.clientWidth);
            setBoardHeight(container.clientHeight);
            resizeGameContainer(getBoardWidth() + 2 * 105, getBoardHeight() + 2 * 105);
        }

    };

    var beginnerBoard = Object.create(board);
    beginnerBoard.rows = 9;
    beginnerBoard.columns = 9;
    beginnerBoard.mines = 10;
    beginnerBoard.draw = function () {
        board.rows = beginnerBoard.rows;
        board.columns = beginnerBoard.columns;
        Object.getPrototypeOf(this).draw.call(this);
    };

    var intermediateBoard = Object.create(board);
    intermediateBoard.rows = 16;
    intermediateBoard.columns = 16;
    intermediateBoard.mines = 40;
    intermediateBoard.draw = function () {
        board.rows = intermediateBoard.rows;
        board.columns = intermediateBoard.columns;
        Object.getPrototypeOf(this).draw.call(this);
    };

    var advancedBoard = Object.create(board);
    advancedBoard.rows = 16;
    advancedBoard.columns = 30;
    advancedBoard.mines = 99;
    advancedBoard.draw = function () {
        board.rows = advancedBoard.rows;
        board.columns = advancedBoard.columns;
        Object.getPrototypeOf(this).draw.call(this);
    };
})();