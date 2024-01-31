import { rAns } from './quiz-ans.js';

let displayDiv = document.getElementById("dResult");
let total = document.getElementById("totalp");
let sel = localStorage.getItem("Selections");
let qt = localStorage.getItem("quizTitle");
let aq = localStorage.getItem("allquiz");
let t = document.getElementsByTagName('i');

if (sel) {
    let ans = JSON.parse(sel);
    let qti = JSON.parse(qt);
    let numa = JSON.parse(aq);

    let i = 0;
    let one = 1;
    let points = 0;
    let colr;
    ans.forEach(function (sel) {
        if (i < 5) {
         
            let corr;
            if (sel !== rAns[numa[i]].rightans) {
                corr = "Incorrect!";
                colr = "#ff4646";
            } else {
                corr = "Correct!";
                colr = "#35e32e ";
            }
            
            if (sel === rAns[numa[i]].rightans) {
                points++;
            }

            displayDiv.innerHTML += "<div class='dResult'>" + "<b>" + (i + one) + ". " + qti[i] + "</b>" + "<br>"
                + "Your answer: " + "<i>" + sel + "</i>" +"<br>"
                + "Right answer: " + "<i>" + rAns[numa[i]].rightans  + "</i>" + "<br>"
                + "Result: " +"<i>"+ "<span style='color: "+ colr + "'>" + corr + "</span>"+ "</i>" +"<br class='gap'>" + "</div>";
            total.innerHTML = "<b>" + "Your total results: " + (points / 5)*100 + "%"+ "</b>";
            i++
        }
    });
}