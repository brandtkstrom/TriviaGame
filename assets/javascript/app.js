class TriviaGame {
    constructor() {
        this.questions = this.getShuffledQuestions();
        this.optionChars = ['A', 'B', 'C', 'D'];
        this.timeLimit = 20 * 1000;
        this.elapsedTime = 0;
        this.currentQuestion = 0;
        this.interval = undefined;
        this.correct = new Audio('assets/media/correct.mp3');
        this.wrong = new Audio('assets/media/wrong.mp3');
        this.idiot = new Audio('assets/media/idiot.mp3');
        this.timeout = new Audio('assets/media/timeout.mp3');
        this.attachEventHandlers();
    }
    getShuffledQuestions() {
        let questions = buildQuestions();
        return questions.sort((q1, q2) => q1.seq - q2.seq);
    }
    getOptions(question) {
        return question.options.map((option, index) => {
            let char = this.optionChars[index];
            return `${char}: ${option}.`;
        });
    }
    printQuestion(question) {
        let $form = $('<form>');
        let $question = $('<p>').text(question.text);
        let $options = $('<div>');

        question.options.forEach((o, i) => {
            let $label = $('<label>').addClass('block');
            let attributes = {
                type: 'radio',
                name: 'answer',
                id: `option${i + 1}`
            };
            let $input = $('<input>')
                .addClass('form-radio')
                .attr(attributes)
                .prop('index', i);
            if (i === 0) {
                $input.prop('checked', true);
            }
            let $span = $('<span>').text(o);
            $label.append($input).append($span);
            $options.append($label);
        });
        let $button = $('<button>')
            .text('Submit')
            .addClass('submit');

        $form.append($question, $options, $button);
        $('#content').html($form);
    }
    nextQuestion() {
        // Check to see if any remaining questions
        this.currentQuestion++;
        if (this.currentQuestion === this.questions.length) {
            // Game is over - no more questions
            clearInterval(this.interval);
            this.printResults();
            return;
        }
        this.elapsedTime = 0;
        $('#timer').text(this.timeLimit / 1000);

        // Get next trivia question
        let question = this.questions[this.currentQuestion];

        this.printQuestion(question);
    }
    printResults() {
        $('#timerText').remove();
        $('#content').empty();

        let total = this.questions.length;
        let wrong = this.questions.filter(q => !q.playerIsCorrect);
        let $title = $('<div>').attr('id', 'title');
        let $result = $('<h2>').text(
            `You got ${total - wrong.length}/${total} questions correct.`
        );
        let $restart = $('<button>')
            .text('New Game')
            .addClass('restart');

        $title.append($result, $restart);
        $('#content').append($title);

        if (wrong.length >= 1) {
            this.idiot.play();
        }

        return;
    }
    intervalUpdate(game) {
        game.elapsedTime += 1000;
        if (game.elapsedTime < game.timeLimit) {
            let timeLeft = (game.timeLimit - game.elapsedTime) / 1000;
            $('#timer').text(timeLeft);

            if (timeLeft <= 5) {
                $('#timer').css({
                    'color': '#F00',
                    'font-weight': 'bold'
                });
                game.timeout.currentTime = 0;
                game.timeout.play();
            }

            return;
        }

        $('#timer').text(0).css({
            'color': 'inherit',
            'font-weight': 'normal'
        });
        let question = game.questions[game.currentQuestion];
        question.playerIsCorrect = false;
        game.nextQuestion();
    }
    beginTrivia() {
        this.correct.load();
        this.wrong.load();
        this.idiot.load();
        this.timeout.load();

        $('#content').empty();
        let $timerText = $('<p>')
            .html('Question time left: <span id="timer"></span>')
            .attr('id', 'timerText');
        $('#container').prepend($timerText);

        this.interval = setInterval(this.intervalUpdate, 1000, this);

        $('#timer').text(this.timeLimit / 1000);

        // Get first trivia question
        this.currentQuestion = 0;
        let question = this.questions[this.currentQuestion];

        this.printQuestion(question);
    }
    attachEventHandlers() {
        $('#content').on('click', '.submit', evt => {
            evt.preventDefault();
            let selected = $("input[name='answer']:checked").prop('index');
            let question = this.questions[this.currentQuestion];
            question.answer(selected);
            if (question.playerIsCorrect) {
                this.correct.currentTime = 0;
                this.correct.play();
            } else {
                this.wrong.currentTime = 0;
                this.wrong.play();
            }
            console.log(`Answer correct? - ${question.playerIsCorrect}`);
            this.nextQuestion();
        });

        $('#content').on('click', '.restart', evt => {
            this.questions = this.getShuffledQuestions();
            this.currentQuestion = 0;
            this.beginTrivia();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const triviaGame = new TriviaGame();

    $('#start').on('click', () => {
        triviaGame.beginTrivia();
    });
});