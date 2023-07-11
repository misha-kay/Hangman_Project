window.addEventListener('load', (event) => {

    // Variables
    var animals = [
        'rabbit',
        'horse',
        'sheep',
        'snake',
        'goose',
        'iguana',
        'chameleon',
        'shark',
        'crocodile'
    ];
    var answer = '';
    var lives = 9;
    var livesElem = document.getElementById('lives');
    var guessed = [];
    var charArray = []

    // Functions
    randomWord = () => {
        answer = animals[Math.floor(Math.random() * animals.length)];
        charArray = answer.split('')
    }

    updateLives = () => {
        livesElem.innerText = 'You have ' + lives + ' lives left';
    }

    processGuess = (selectedElem, selectedLetter) => {
        if (guessed.indexOf(selectedLetter.toLowerCase()) === -1) {
            guessed.push(selectedLetter.toLowerCase());
        };
        selectedElem.setAttribute('disabled', true);

        if (answer.indexOf(selectedLetter.toLowerCase()) >= 0) {
            guessedWord();
        } else {
            lives--;
            updateLives();
            Draw(draws[step++])
            if (undefined === draws[step]) this.disabled = true;
        }
    }

    guessedWord = () => {
        var wordStatus = '';

        for (var i = 0; i < charArray.length; i++) {
            var letter = charArray[i];

            if (guessed.indexOf(letter.toLowerCase()) >= 0) {
                wordStatus += letter.toLowerCase();
            } else {
                wordStatus += ' __ ';
            }
        }
        document.getElementById('word').innerHTML = wordStatus;
    }

    findCharInArr = (char) => {
        var foundIndexes = [];
        charArray.forEach(function (e, i) {
            if (char.toLowerCase() === e.toLowerCase()) {
                foundIndexes.push(i);
            }
        });
        return foundIndexes;
    };

    // Stickman config
    const canvas = document.getElementById('stickman');

    const context = canvas.getContext('2d');

    // Clear canvas config
    clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    };

    // Draw stickman
    Draw = (part) => {
        switch (part) {
            case 'gallows':
                context.strokeStyle = '#6c6eab';
                context.lineWidth = 5;
                context.beginPath();
                context.moveTo(150, 225);
                context.lineTo(5, 225);
                context.moveTo(25, 225);
                context.lineTo(25, 5);
                context.lineTo(100, 5);
                context.lineTo(100, 25);
                context.stroke();
                break;

            case 'head':
                context.lineWidth = 5;
                context.beginPath();
                context.arc(100, 50, 25, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
                break;

            case 'body':
                context.beginPath();
                context.moveTo(100, 75);
                context.lineTo(100, 110);
                context.stroke();
                break;

            case 'leftArm':
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(140, 100);
                context.stroke();
                break;

            case 'rightArm':
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(60, 100);
                context.stroke();
                break;

            case 'leftLeg':
                context.beginPath();
                context.moveTo(100, 110);
                context.lineTo(125, 190);
                context.stroke();
                break;

            case 'leftFoot':
                context.beginPath();
                context.moveTo(122, 190);
                context.lineTo(135, 185);
                context.stroke();
                break;

            case 'rightLeg':
                context.beginPath();
                context.moveTo(100, 110);
                context.lineTo(80, 190);
                context.stroke();
                break;

            case 'rightFoot':
                context.beginPath();
                context.moveTo(82, 190);
                context.lineTo(70, 185);
                context.stroke();
                break;

        }
    };

    const draws = [
        'gallows',
        'head',
        'body',
        'leftArm',
        'rightArm',
        'leftLeg',
        'rightLeg',
        'leftFoot',
        'rightFoot',
    ]
    var step = 0;

    // Main game logic
    randomWord();
    guessedWord();
    console.log({ answer })
    console.log({ charArray })
    document.querySelector('#keyboard').addEventListener('click', function (e) {
        if (e.target.localName === 'button') {
            processGuess(e.target, e.target.innerText);
        }
    });

    // Restart game
    document.getElementById('reset').addEventListener('click', function () {
        clearCanvas()
        step = -1
        document.querySelector('.key').disabled = false;
        lives = 9;
        updateLives()
    });
});