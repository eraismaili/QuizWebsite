const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

    startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');

}
function playAudio() {
    audio.play();
}

startBtn.addEventListener('click', playAudio);


exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick = () => {

    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();

}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

startBtn.addEventListener('click', playAudio);
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');


    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else {
        // console.log('Question Completed');
        showResultBox();
    }

}
const optionList = document.querySelector('.option-list');

//mi marr pytjet edhe opsionet prej array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
<div class="option"><span>${questions[index].options[1]}</span></div>
<div class="option"><span>${questions[index].options[2]}</span></div>
<div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
        //console.log('correct')
    }
    else {
        answer.classList.add('incorrect');
        //console.log('incorrect')
    }
    //if answer incorrect, auto selected correct answer
    for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
            optionList.children[i].setAttribute('class', 'option correct');
        }
    }
    // nqs ka selektu useri, boni disable krejt opsionet
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');

        nextBtn.classList.add('active');
    }
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValure = -1; // se kur o 0 shkon n infinit %
    let progressEndValure = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValure++;

        // console.log(progressStartValure);
        progressValue.textContent = `${progressStartValure}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValure * 3.6}deg, rgba(255,255,255, .1) 0deg)`

        progressValue.textContent = `${progressStartValure}%`;
        if (progressStartValure == progressEndValure) {
            clearInterval(progress);
        }
    }, speed);
    const app = new PIXI.Application({ background: '#1099bb' });

    document.body.appendChild(app.view);
    
    // We stop Pixi ticker using stop() function because autoStart = false does NOT stop the shared ticker:
    // doc: http://pixijs.download/release/docs/PIXI.Application.html
    app.ticker.stop();
    
    // Global
    let drawing = false;
    let graphic = null;
    let count = 0;
    
    let xIni;
    let yIni;
    
    // Now, we use 'tick' from TweenMax (You can use TweenLite too)
    TweenMax.ticker.addEventListener('tick', () => {
        draw();
        app.ticker.update();
    });
    
    function draw() {
        count += 5.0;
        if (!drawing) {
            drawing = true;
            graphic = new PIXI.Graphics();
            graphic.lineStyle(8, `0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
            app.stage.addChild(graphic);
            xIni = Math.random() * 800;
            yIni = Math.random() * 600;
        } else if (count > 50) {
            count = 0;
            drawing = false;
        } else {
            graphic.moveTo(xIni, yIni);
            graphic.lineTo(xIni + Math.cos(count) * 20, yIni + Math.sin(count) * 20);
        }
    }
    


}

