import { q } from './quiz.js';

let info = document.querySelector(".start");
let numbers = document.querySelector("#nums");
let title = document.querySelector("#quiz");
let quiz = document.querySelector(".quiz");
let options = document.querySelector("#options");
let btn = document.querySelector(".start-button");
let next = document.querySelector(".quiz-button")
let progressBar = document.querySelector('.progress__bar');
let infobtn = document.querySelector(".info-quiz");
let infoo = document.querySelector(".inffoo");

// Start info timer
let off = true;
let cleanInfoActivated = false;
function InfoTimer(a) {
    numbers.innerHTML = a;
    if (a > 0 && !cleanInfoActivated) {
        setTimeout(function () {
            InfoTimer(a - 1);
        }, 1000);
    } else {
        off = false;
        if (!cleanInfoActivated) {
            CleanInfo();
            cleanInfoActivated = true;
        }
    }
}
InfoTimer(5);

// Skip timer
btn.addEventListener("click", function () {
    off = false;
    CleanInfo();
});

// Clean Start info
function CleanInfo() {
    if (off === false && !cleanInfoActivated) {
        info.style.display = "none";
        ShowQuestion();
        cleanInfoActivated = true;
    }
}

let ans = [];

// Next button
next.addEventListener("click", function () {
    // Some function what check if radiobutton has been pressed
    let som = document.querySelector('[name="answer"]:checked');
    if (som) {
        ans.push(som.value);
        console.log("Selections: " + ans);
        //cookies 
        localStorage.setItem("Selections", JSON.stringify(ans));
    }

    if (som != null) {
        ShowQuestion();
    } else {
        let result = window.confirm('Are you sure you want to continue without an answer?');
        if (result) {
            ans.push("Not-selected");
            localStorage.setItem("Selections", JSON.stringify(ans));
            console.log("Selections: " + ans);
            ShowQuestion();
        } else {
            console.log("Cancelled")
        }
    }

})

let i = 0;
let y = null;

function totalRandom() {
    let a = Math.floor(Math.random() * 10);
    while (a === y) {
        a = Math.floor(Math.random() * 10);
    }
    y = a;
    return a;
}


// Show Quiz 
let allQuiz = [];
let quizTitle = [];
function ShowQuestion() {

    if (i < 5) {
        let x = totalRandom();
        while (allQuiz.includes(x)) {
            x = totalRandom();
        }
        console.log(x)

        allQuiz.push(x);

        console.log("Quizes: " + allQuiz);
        localStorage.setItem("allquiz", JSON.stringify(allQuiz));
        let tip;
        quiz.style.display = "block";
        let string = '';

        for (const option in q[x]) {
            if (option !== 'question' && option !== 'tip') {
                const id = `option_${option}`;
                string += `<label class='form-control' for='${id}'>`;
                string += `<input type='radio' id='${id}' name='answer' value='${q[x][option]}'>`;
                string += `${q[x][option]}</label><br>`;

            }
        }

        tip = "<p>" + `${q[x].tip}` + "</p>";
        title.innerHTML = "<div class='t'>" + q[x].question + "</div>";
        options.innerHTML = "<div class='q'>" + string + "</div>";

        infobtn.addEventListener("mouseover", event => {
            infoo.style.display = "block";
            infoo.innerHTML = tip;
        })

        infobtn.addEventListener("mouseout", event => {
            infoo.style.display = "none";
        })

        quizTitle.push(q[x].question)
        console.log("quiz title : " + quizTitle);
        localStorage.setItem("quizTitle", JSON.stringify(quizTitle));

        increaseProgress();
        i++;

    } if (i === 5) {
        next.innerHTML = "Finish";
        {
            next.addEventListener("click", function () {
                const results = window.open("result.html", "Result", "width=750,height=850");
                results;
            })
        }
    }

}

// Progress bar
let progress = 0;
function increaseProgress() {
    if (progress <= 80) {
        progress += 20;
        progressBar.style.width = `${progress}%`;
        progressBar.dataset.content = `${progress / 20}/5`;
    }
}




