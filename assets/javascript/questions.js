class Question {
    constructor(text, options, answerIdx) {
        this.text = text;
        this.options = options;
        this.answerIdx = answerIdx;
        this.playerAnswerIdx = -1;
        this.playerIsCorrect = false;
        this.seq = Math.random();
    }
    answerIsCorrect(index) {
        this.playerIsCorrect = index === this.answerIdx;
        return this.playerIsCorrect;
    }
    answer(index) {
        this.playerAnswerIdx = index;
        this.playerIsCorrect = this.playerAnswerIdx === this.answerIdx;
    }
}

function buildQuestions() {
    const questions = [
        new Question(
            "What did Jan throw at Michael's television in the Dinner Party episode?",
            [
                'A pencil',
                'A Dundie Award',
                'A remote',
                "One of Michael's trains"
            ],
            1
        ),
        new Question(
            "Where did Andy Bernard sail his parents' yacht to?",
            ['Cape Cod', 'Florida', 'Bermuda', 'Greece'],
            2
        ),
        new Question(
            'Where did Dwight (briefly) work when he left Dunder Mifflin?',
            ['Staples', 'Office Max', 'Best Buy', 'Schrute Farm'],
            0
        ),
        new Question(
            'What was happening when Jim kissed Pam for the first time?',
            [
                'Bowling Night',
                'Casino Night',
                'Christmas party',
                'New Years party'
            ],
            1
        ),
        new Question(
            "What was the name of Michael Scott's screenplay / film?",
            [
                'Threat Level Midnight',
                'Cleanup on Isle 5',
                'Threat Level Omega',
                'Gold Face'
            ],
            0
        ),
        new Question(
            "What was the name of Kevin's band that auditioned for Pam and Roy's wedding?",
            ['The Jokers', 'Scranjokers', 'Scrantones', 'Scrantonicity'],
            3
        ),
        new Question(
            'What did Robert California sell before joining Dunder Mifflin?',
            [
                'Stocks and Shares',
                'Property',
                'Deep Sea Drilling Equipment',
                'Industrial Tools'
            ],
            2
        ),
        new Question(
            'In the first episode, Michael plays a prank on one of his staff when he pretends to fire them. Who is this?',
            ['Jim', 'Toby', 'Pam', 'Kevin'],
            2
        ),
        new Question(
            "At the beginning of the show, Michael Scott says that he's worked at Dunder Mifflin for how many years?",
            ['9', '10', '12', '14'],
            2
        ),
        new Question(
            'When meeting the temporary employee in the pilot, Michael Scott impersonates which of the Three Stooges?',
            ['Moe', 'Larry', 'Curly', 'Shemp'],
            0
        ),
        new Question(
            'Where did Michael get his "World\'s Best Boss" coffee mug?',
            [
                'A yard sale',
                'Dunder Mifflin Corporate',
                'Dwight',
                'Spencer Gifts'
            ],
            3
        ),
        new Question(
            'In "Diversity Day", what was the man\'s name that came in to talk to Michael about racial discrimination?',
            ['Mr. Black', 'Mr. Sabre', 'Mr. Brown', 'Mr. Bean'],
            2
        ),
        new Question(
            "In 'Gay Witch Hunt' which character confesses that he is gay?",
            ['Oscar', 'Kevin', 'Ryan', 'Andy'],
            0
        ),
        new Question(
            'Where did Michael want to take Carol for the holidays?',
            ['Hawaii', 'Tahiti', 'Jamaica', 'The Bahamas'],
            2
        ),
        new Question(
            'What color did Angela say was "whorish"?',
            ['Yellow', 'Orange', 'Pink', 'Purple'],
            1
        )
    ];

    return questions;
}