// ==UserScript==
// @name        Grade fixer
// @namespace   https://github.com/XavXav82/Timetable-Fixer/
// @version     1.0
// @author      XavXav82
// @description My plugin for timtable fixing and editing (now with colour customisation)
// @match       https://link.stleonards.vic.edu.au/learning/grades/*
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

window.onload = function() {
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    let subjects = document.getElementsByClassName("subject-group");
    let grades = document.getElementsByTagName("div");
    for(let i=0;i<grades.length;i++){
        if(grades[i].className.search("grade")!=-1&&grades[i].className.search("flex")==-1 && grades[i].className.search("none") == -1){
            grades[i].className = "grade gradient-10-bg";

        }
    }
    let bruh = document.getElementsByTagName("span");
    for(let j=0;j<bruh.length;j++){

        if(bruh[j].innerHTML == "A" || bruh[j].innerHTML == "B+" || bruh[j].innerHTML == "B" || bruh[j].innerHTML == "C+" || bruh[j].innerHTML == "C" || bruh[j].innerHTML == "D+" || bruh[j].innerHTML == "D" || bruh[j].innerHTML == "E+" || bruh[j].innerHTML == "E" || bruh[j].innerHTML == "N"){
            bruh[j].innerHTML = "A+";
        }
        if(bruh[j].innerHTML.search("%")!=-1){
            bruh[j].innerHTML = "100%";
        }
        if(bruh[j].innerHTML.search("/")!=-1){
            let max = (bruh[j].innerHTML).split("/")[1];
            //let max2 = max.split("/");
            //let max3 = max2[1];
            if(isNumeric(max)){
                let newGrade = max + "/" + max;
                bruh[j].innerHTML = newGrade;
            }
        }
    }
};
