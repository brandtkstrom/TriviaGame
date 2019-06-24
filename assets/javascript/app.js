class TriviaGame {
    constructor(questions) {
        this.questions = questions;
        this.optionChars = ['A', 'B', 'C', 'D'];
    }

    getOptions() {
        return options.map((option, index) => {
            let char = this.optionChars[index];
            optionList.push(`${char}: ${option}.`);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const triviaQuestions = buildQuestions();
    const triviaGame = new TriviaGame(triviaQuestions);
    console.log(triviaGame);
});
