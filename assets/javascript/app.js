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
            let $input = $('<input>').attr(attributes);
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
        $form
            .append($question)
            .append($options)
            .append($button);
        $('#content').html($form);
    }
    nextQuestion() {
        // Chck to see if any remaining questions
        if (this.currentQuestion === this.questions.length - 1) {
            // Game is over
            // need to tally score and update screen
        }
        this.elapsedTime = 0;
        $('#timer').text(this.timeLimit / 1000);

        // Get next trivia question
        let question = this.questions[++this.currentQuestion];

        this.printQuestion(question);

        // TODO - implement timer
    }
    intervalUpdate(game) {
        game.elapsedTime += 1000;
        console.log(game.elapsedTime);
        if (game.elapsedTime < game.timeLimit) {
            $('#timer')
                .show()
                .text((game.timeLimit - game.elapsedTime) / 1000);
            return;
        }

        $('#timer').hide();
        let question = game.questions[game.currentQuestion];
        question.playerIsCorrect = false;
        game.nextQuestion();
    }
    initGame() {
        // Called when game is first initialized
    }
    beginTrivia() {
        // Called to begin a new trivia round
        setInterval(this.intervalUpdate, 1000, this);
        this.nextQuestion();
    }
    attachEventHandlers() {
        $('#content').on('click', '.submit', evt => {
            // get select answer
            // answer current question
            // call next question
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const triviaQuestions = TriviaGame.getShuffledQuestions();
    const triviaGame = new TriviaGame(triviaQuestions);
    console.log(triviaGame);
    triviaGame.beginTrivia();
});
