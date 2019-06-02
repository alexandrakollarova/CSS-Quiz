"use strict"

let questionNum = 0;

let score = 0;

function generateQuestions() {
    if (questionNum < questionStore.length) {

        $("#nav").html(
            `<h3 class="questions">Question ${questionNum + 1}/10</h3>
             <h3 class="score">Score ${score}/100</h3>`);

        return `
            <form>
                <fieldset>
                    <div class="quiz-answer-choices">
                        <h2><legend>${questionStore[questionNum].question}</legend></h2>
                        <h3>
                            <label>
                                <input type="radio" name="answerChoices" value="${questionStore[questionNum].answers[0]}" required>
                                ${questionStore[questionNum].answers[0]}
                            </label>
                            <br>
                            <label>
                                <input type="radio" name="answerChoices" value="${questionStore[questionNum].answers[1]}" required>
                                ${questionStore[questionNum].answers[1]}
                            </label>
                            <br>
                            <label>
                                <input type="radio" name="answerChoices" value="${questionStore[questionNum].answers[2]}" required>
                                ${questionStore[questionNum].answers[2]}
                            </label>
                            <br>
                            <label>                              
                                <input type="radio" name="answerChoices" value="${questionStore[questionNum].answers[3]}" required>
                                ${questionStore[questionNum].answers[3]}
                            </label>
                        </h3>
                    </div>
                        <input type="submit" name="submit" id="js-submitBtn" value="SUBMIT">
                </fieldset>

                <div id="alert"></div> 

            </form>
        </main>
    `;
    } else {
        overallScore();
    } 
}

function renderQuestion() {
    $('#container').html(generateQuestions());
}

function handleStartButton() {
    $('#js-startBtn').on('click', function() {
        renderQuestion();
    });
}

function handleQuestionNum() {
    questionNum ++;
}

function handleScore() {
    score = score + 10;

    $("#nav").html(
        `<h3 class="questions">Question ${questionNum + 1}/10</h3>
         <h3 class="score">Score ${score}/100</h3>`);
}

function handleSubmitButton() {
    $('#container').on('click', '#js-submitBtn', function(event) {
        event.preventDefault();
        
        let selected = $('input:checked');
        let userAnswer = selected.val();        
        let correctAnswer = `${questionStore[questionNum].correctAnswer}`;

        if (userAnswer === undefined) {
   
            $("#alert").html("You must choose one.")

        } else {
            if (correctAnswer === userAnswer) {
                handleScore();
                                
                const correctFeedback = `
                        <div class="correct-answer">
                            <h2>Correct!</h2>
                            <button type="submit" id="js-nextBtn">NEXT</button>
                        </div>`;

                $('#container').html(correctFeedback);                              

            } else {
                const incorrectFeedback = `
                        <div class="wrong-answer">
                            <h2>Wrong!</h2>
                            <h3>The correct answer is ${questionStore[questionNum].correctAnswer}!</h3>
                            <button type="submit" id="js-nextBtn">NEXT</button>
                        </div>`;

                $('#container').html(incorrectFeedback);
            }            
        }
    });
}

function handleNextButton() {
    $("#container").on('click', "#js-nextBtn", function() {
        handleQuestionNum();
        renderQuestion();
    });    
}

function handleRestartButton() {
    $('#container').on('click', "#js-restartBtn", function() {
        location.reload();   
    });
}

function overallScore() {
    const result = `
            <div class="total-score">
                <h2>You Scored ${score}/100!</h2>
                <button type="submit" id="js-restartBtn">START OVER</button>
            </div>`;
            
    $('#container').html(result);

    handleRestartButton();
}

function handleQuiz() {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
  }
  
  handleQuiz();
