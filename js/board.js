/**
 * Created by Reza on 7/20/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var container = document.getElementById('board');
    var timer = document.getElementById('timer').querySelector('input[name="timer"]');
    var remainingMines = document.getElementById('flagged-mines').querySelector('input[name="remaining-mines"]');

    var gameContainer = {
        node: document.getElementById('game'),
        defaultWidth: '480',
        defaultHeight: '600'
    };

    var cell = {
        width: '20px',
        height: '20px',
        backgroundColor: '#74a0ea',
        getColor: function (value) {
            var colors = [
                '',
                '#4050be',
                '#1d6905',
                '#aa0507',
                '#000380',
                '#7a0102'
            ];

            return colors[value];
        }
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

    var setFlag = function (x, y, value) {
        if (value) {
            remainingMines.value--;
        } else {
            remainingMines.value++;
        }

        board.flagged[parseInt(board.convert2dIndexTo1d(x, y))] = value;
    };

    var setOpen = function (x, y, value) {
        board.opened[parseInt(board.convert2dIndexTo1d(x, y))] = value;
    };

    var resizeGameContainer = function (width, height) {
        width = width + 'px';
        gameContainer.node.style.width = width;

        height = height + 'px';
        gameContainer.node.style.height = height;
    };

    var handleLeftClick = function (event) {
        var btn = event.target;
        var x = parseInt(btn.getAttribute('data-row'));
        var y = parseInt(btn.getAttribute('data-column'));

        if (board.current === undefined) {
            board.current = board.getBoard();
        }

        checkSelectedCell(x, y);
        board.firstClick = false;
        game.timer.start();
    };

    var checkSelectedCell = function (x, y) {
        if (!isOpened(x, y) &&
            ((x >= 0 && x < board.current.rows) &&
            (y >= 0 && y < board.current.columns))
        ) {
            var selectedMine = game.mine.isMine(x, y);

            if (board.firstClick && selectedMine && !isFlagged(x, y)) {
                game.mine.replaceMine(x, y);
            } else if (selectedMine && !isFlagged(x, y)) {
                showAllMines();
                showLostMessage();
            } else if (!isFlagged(x, y)) {
                var neighbourMines = countNeighbourMines(x, y);

                if (neighbourMines > 0) {
                    setOpen(x, y, 1);
                    disableCell(x, y);
                    setMineNumber(x, y, neighbourMines);
                    checkGameSuccess();
                } else {
                    setOpen(x, y, 1);
                    disableCell(x, y);

                    if (!isFlagged(x + 1, y) && !isOpened(x + 1, y)) {
                        checkSelectedCell(x + 1, y);
                    }
                    if (!isFlagged(x - 1, y) && !isOpened(x - 1, y)) {
                        checkSelectedCell(x - 1, y);
                    }
                    if (!isFlagged(x, y + 1) && !isOpened(x, y + 1)) {
                        checkSelectedCell(x, y + 1);
                    }
                    if (!isFlagged(x, y - 1) && !isOpened(x, y - 1)) {
                        checkSelectedCell(x, y - 1);
                    }
                    if (!isFlagged(x + 1, y + 1) && !isOpened(x + 1, y + 1)) {
                        checkSelectedCell(x + 1, y + 1);
                    }
                    if (!isFlagged(x + 1, y - 1) && !isOpened(x + 1, y - 1)) {
                        checkSelectedCell(x + 1, y - 1);
                    }
                    if (!isFlagged(x - 1, y - 1) && !isOpened(x - 1, y - 1)) {
                        checkSelectedCell(x - 1, y - 1);
                    }
                    if (!isFlagged(x - 1, y + 1) && !isOpened(x - 1, y + 1)) {
                        checkSelectedCell(x - 1, y + 1);
                    }
                }
            }
        }
    };

    var checkGameSuccess = function () {
        var cellCntr = 0;

        for (var i = 0; i < board.current.rows; i++) {
            for (var j = 0; j < board.current.columns; j++) {
                if (!game.mine.isMine(i, j) && isOpened(i, j)) {
                    cellCntr++;
                }
            }
        }

        if (cellCntr === (board.current.rows * board.current.columns) - board.current.mines) {
            showWonMessage();
        }
    };

    var showLostMessage = function () {
        var timePassed = game.timer.getTime();
        game.stats.updateStats(timePassed, game.STATUS_LOST);
        var info = game.stats.getInfo(timePassed);

        $.msgbox({
            type: 'error',
            content: game.MESSAGE_LOST + info,
            resize: false,
            width: 400,
            height: 300,
            title: 'Game Lost',
            onBeforeClose: function () {
                game.board.resetSize();
                game.flow.startOver();
            },
            onOpen: function () {
                game.timer.stop();
            }
        });
    };

    var showWonMessage = function () {
        var timePassed = game.timer.getTime();
        game.stats.updateStats(timePassed, game.STATUS_WON);
        var info = game.stats.getInfo(timePassed);

        $.msgbox({
            type: 'success',
            content: game.MESSAGE_WON + info,
            resize: false,
            width: 400,
            height: 300,
            title: 'Game Won',
            onBeforeClose: function () {
                game.board.resetSize();
                game.flow.startOver();
            },
            onOpen: function () {
                game.timer.stop();
            }
        });
    };

    var handleRightClick = function (event) {
        event.preventDefault();
        var btn = event.target;
        var x = parseInt(btn.getAttribute('data-row'));
        var y = parseInt(btn.getAttribute('data-column'));

        if (board.current === undefined) {
            board.current = board.getBoard();
        }

        if (!isOpened(x, y)) {
            if (!isFlagged(x, y)) {
                btn.style.backgroundImage = "url('images/flag.png')";
                btn.style.backgroundRepeat = 'no-repeat';
                btn.style.backgroundSize = 'contain';
                btn.style.backgroundPosition = 'center';
                setFlag(x, y, 1);
            } else {
                btn.style.backgroundImage = '';
                btn.style.backgroundColor = cell.backgroundColor;
                setFlag(x, y, 0);
            }
        }

        return false;
    };

    var countNeighbourMines = function (x, y) {
        var cntr = 0;

        if (x + 1 >= 0 && x + 1 < board.current.rows && game.mine.isMine(x + 1, y)) {
            cntr++;
        }
        if (x - 1 >= 0 && x - 1 < board.current.rows && game.mine.isMine(x - 1, y)) {
            cntr++;
        }
        if (y + 1 >= 0 && y + 1 < board.current.columns && game.mine.isMine(x, y + 1)) {
            cntr++;
        }
        if (y - 1 >= 0 && y - 1 < board.current.columns && game.mine.isMine(x, y - 1)) {
            cntr++;
        }
        if ((x + 1 >= 0 && x + 1 < board.current.rows) && (y + 1 >= 0 && y + 1 < board.current.columns) && game.mine.isMine(x + 1, y + 1)) {
            cntr++;
        }
        if ((x + 1 >= 0 && x + 1 < board.current.rows) && (y - 1 >= 0 && y - 1 < board.current.columns) && game.mine.isMine(x + 1, y - 1)) {
            cntr++;
        }
        if ((x - 1 >= 0 && x - 1 < board.current.rows) && (y + 1 >= 0 && y + 1 < board.current.columns) && game.mine.isMine(x - 1, y + 1)) {
            cntr++;
        }
        if ((x - 1 >= 0 && x - 1 < board.current.rows) && (y - 1 >= 0 && y - 1 < board.current.columns) && game.mine.isMine(x - 1, y - 1)) {
            cntr++;
        }

        return cntr;
    };

    var isFlagged = function (x, y) {
        var selectedIndex = board.convert2dIndexTo1d(x, y);

        return (board.flagged[selectedIndex] !== undefined && board.flagged[selectedIndex] === 1);
    };

    var isOpened = function (x, y) {
        var selectedIndex = board.convert2dIndexTo1d(x, y);

        return (board.opened[selectedIndex] !== undefined && board.opened[selectedIndex] === 1);
    };

    var setMineNumber = function (row, column, value) {
        var btn = getButton(row, column);
        btn.innerHTML = value;
        btn.style.color = cell.getColor(value);
    };

    var disableCell = function (x, y) {
        var btn = getButton(x, y);
        btn.setAttribute('disabled', 'true');
        btn.style.backgroundColor = '#ccc';
    };

    var getButton = function (x, y) {
        var selector = "button[data-row='" + x + "']" + "[data-column='" + y + "']";

        return document.querySelector(selector);
    };

    var showAllMines = function () {
        var btn;

        for (var i = 0; i < board.current.rows; i++) {
            for (var j = 0; j < board.current.columns; j++) {
                if (game.mine.isMine(i, j)) {
                    btn = getButton(i, j);
                    btn.style.backgroundImage = "url('images/mine.png')";
                    btn.style.backgroundRepeat = 'no-repeat';
                    btn.style.backgroundSize = 'contain';
                    btn.style.backgroundPosition = 'center';
                }
            }
        }
    };

    var board = game.board = {
        current: undefined,
        container: container,
        width: undefined,
        height: undefined,
        rows: 9,
        columns: 9,
        mines: 10,
        flagged: [],
        opened: [],
        firstClick: true,
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
            var currentBoard = board.getBoard();
            container.removeAllChildren();
            game.mine.setLimit(currentBoard.rows * currentBoard.columns);
            game.mine.generateMines(currentBoard.mines);

            for (var i = 0; i < currentBoard.rows; i++) {
                var tr = document.createElement('tr');
                tr.style.height = cell.height;

                for (var j = 0; j < currentBoard.columns; j++) {
                    var td = document.createElement('td');
                    td.style.width = cell.width;
                    td.style.height = cell.height;

                    var btn = document.createElement('button');
                    btn.style.width = cell.width;
                    btn.style.height = cell.height;
                    btn.style.backgroundColor = cell.backgroundColor;
                    btn.setAttribute('data-row', i.toString());
                    btn.setAttribute('data-column', j.toString());
                    btn.addEventListener('click', handleLeftClick);
                    btn.addEventListener('contextmenu', handleRightClick, false);

                    td.appendChild(btn);
                    tr.appendChild(td);

                    var index = currentBoard.convert2dIndexTo1d(i, j);
                    currentBoard.flagged[index] = 0;
                    currentBoard.opened[index] = 0;
                }

                container.appendChild(tr);
            }

            remainingMines.value = currentBoard.mines;
            timer.value = '0';

            setBoardWidth(container.clientWidth);
            setBoardHeight(container.clientHeight);
            resizeGameContainer(getBoardWidth() + 2 * 105, getBoardHeight() + 2 * 105);
        },
        convert2dIndexTo1d: function (x, y) {
            if (board.current === undefined) {
                board.current = board.getBoard();
            }

            return x * game.board.current.columns + y;
        },
        updateTimerCount: function () {
            timer.value = game.timer.count;
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