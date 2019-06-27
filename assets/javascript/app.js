class TriviaGame {
    constructor(questions) {
        this.questions = questions;
        this.optionChars = ['A', 'B', 'C', 'D'];
        this.timeLimit = 10 * 1000;
        this.elapsedTime = 0;
        this.currentQuestion = 0;
        this.interval = undefined;
    }
    static getShuffledQuestions() {
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
        // Chck to see if any remaining questions
        if (this.currentQuestion === this.questions.length - 1) {
            // Game is over
            // need to tally score and update screen
            clearInterval(this.interval);
            this.printResults();
            return;
        }
        this.elapsedTime = 0;
        $('#timer').text(this.timeLimit / 1000);

        // Get next trivia question
        this.currentQuestion++;
        console.log(this.currentQuestion);
        let question = this.questions[this.currentQuestion];

        this.printQuestion(question);

        // TODO - implement timer
    }
    printTitle() {}
    printResults() {
        $('#timerText').remove();
        $('#content').empty();
        return;
    }
    intervalUpdate(game) {
        game.elapsedTime += 1000;
        if (game.elapsedTime < game.timeLimit) {
            $('#timer').text((game.timeLimit - game.elapsedTime) / 1000);
            return;
        }

        $('#timer').text(0);
        let question = game.questions[game.currentQuestion];
        question.playerIsCorrect = false;
        game.nextQuestion();
    }
    initGame() {
        this.attachEventHandlers();
    }
    beginTrivia() {
        $('#content').empty();
        let $timerText = $('<p>')
            .html('Question time left: <span id="timer"></span>')
            .attr('id', 'timerText');
        $('#container').prepend($timerText);

        this.interval = setInterval(this.intervalUpdate, 1000, this);
        this.nextQuestion();
    }
    attachEventHandlers() {
        $('#content').on('click', '.submit', evt => {
            let selected = $("input[name='answer']:checked").prop('index');
            let question = this.questions[this.currentQuestion];
            question.answer(selected);
            this.nextQuestion();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const triviaQuestions = TriviaGame.getShuffledQuestions();
    const triviaGame = new TriviaGame(triviaQuestions);
    console.log(triviaGame);
    triviaGame.initGame();

    $('#start').on('click', () => {
        triviaGame.beginTrivia();
    });
});
