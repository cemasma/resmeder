//Graph Generator
var GraphGenerator = (function (text) {

    const SPACE_SIZE = 10;
    const SQUARE_SIZE = 23;

    var textToColor = function (text) {
        var rgb = [];
        for (var i = 0; i < 3; i++) {
            if (text.charCodeAt(i) * text.charCodeAt((i != (text.length - 1) ? (i + 1) : i)) < 256) {
                rgb.push(text.charCodeAt(i) * text.charCodeAt(i + 1));
            } else if (text.charCodeAt(i) < 256) {
                rgb.push(text.charCodeAt(i) % 100 + 50);
            } else {
                rgb.push(text.charCodeAt(i) < 154) ? (text.charCodeAt(i) % 50 + text.charCodeAt(i)) : (text.charCodeAt(i) % 100 + text.charCodeAt(i) % 10)
            }
        }
        return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
    }

    var getAsciiSum = function (text) {
        var sum = 0;
        for (var i = 0; i < text.length; i++) {
            sum += text.charCodeAt(i);
        }
        return sum;
    }

    var getMD5 = function (text) {
        return CryptoJS.MD5(text).toString();
    }

    var canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 250;

    var context = canvas.getContext("2d");

    var baseContext = function () {
        context.rect(0, 0, 250, 250);
        context.fillStyle = "rgb(164, 178, 160)";
        context.fill();
        context.fillStyle = textToColor(text);
    }

    var getSpace = function (sum, modNum) {
        return (sum % modNum == 0) ? sum % 3 : 0;
    }

    var getColumn = function (sum, modNum) {
        return sum % modNum;
    }

    var doUpperAvatar = function () {
        var row = text.charCodeAt(text.length - 1) % 2 + 4;
        for (var i = 0; i < row; i++) {
            var column = getColumn(getAsciiSum(getMD5(text)), (i + 4));
            for (var j = 0; j <= column; j++) {
                context.fillRect(SPACE_SIZE + SQUARE_SIZE + SQUARE_SIZE * j + SQUARE_SIZE * getSpace(column, j + 3),
                    SPACE_SIZE + SQUARE_SIZE + SQUARE_SIZE * i, SQUARE_SIZE, SQUARE_SIZE);

                context.fillRect(230 - (SPACE_SIZE + SQUARE_SIZE + SQUARE_SIZE * j + SQUARE_SIZE * getSpace(column, j + 3)),
                    SPACE_SIZE + SQUARE_SIZE + SQUARE_SIZE * i, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }

    var doLowerAvatar = function () {
        var row = (text.charCodeAt(text.length - 1) % 5) % 2;
        for (var i = 0; i <= row; i++) {
            var column = getColumn(getAsciiSum(text), (i + 2));
            for (var j = 0; j <= column; j++) {
                context.fillRect(SPACE_SIZE + SQUARE_SIZE * 3 + SQUARE_SIZE * j,
                    230 - (SPACE_SIZE + SQUARE_SIZE + SQUARE_SIZE * i), SQUARE_SIZE, SQUARE_SIZE);
                context.fillRect(230 - (SPACE_SIZE + SQUARE_SIZE * 3 + SQUARE_SIZE * j),
                    230 - (SPACE_SIZE + SQUARE_SIZE + SQUARE_SIZE * i), SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }

    return {
        generate: function () {
            baseContext();
            doUpperAvatar();
            doLowerAvatar();
        },

        reset: function () {
            baseContext();
        },

        appendAsCanvas: function (elementId) {
            if (elementId != null) {
                document.getElementById(elementId).appendChild(canvas);
            } else {
                document.body.appendChild(canvas);
            }
        },

        appendToImg : function (elementId) {
            if (elementId != null) {
                document.getElementById(elementId).src = canvas.toDataURL();
            }
        },

        setText: function (newText) {
            if (newText != null) {
                text = newText;
            } else {
                //TODO: error log
            }
        },

        setCanvasId: function (newCanvasId) {
            canvas.id = newCanvasId;
        }
    };
});