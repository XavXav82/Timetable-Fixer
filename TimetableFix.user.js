// ==UserScript==
// @name        Timetable fixer
// @namespace   TimetableFix
// @version     1.5
// @author      XavXav82
// @description My plugin for timtable fixing and editing (now with colour customisation)
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @grant       unsafeWindow
// @run-at      document-start
// @downloadURL https://github.com/XavXav82/Timetable-Fixer/raw/main/TimetableFix.user.js
// @updateURL   https://github.com/XavXav82/Timetable-Fixer/raw/main/TimetableFix.user.js
// ==/UserScript==
window.onload = function() {
        //Timetable page
        if(window.location.href=="https://link.stleonards.vic.edu.au/timetable"){
            //Headings
            let rows = document.getElementsByTagName("tr");
            
            //Following for loops act to reassign location of active box from period b to a
            //Period 1b
            let divs1 = rows[2].getElementsByTagName("div");
            for(let i=0;i<29;i++){
                if(divs1[i].className == "timetable-subject-active"){
                    (rows[1].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                }
            }
            rows[2].remove();

            //Period 2b
            let divs2 = rows[3].getElementsByTagName("div");
            for(let i=0;i<29;i++){
                if(divs2[i].className == "timetable-subject-active"){
                    (rows[2].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                }
            }
            rows[3].remove();

            //Period 3b
            let divs3 = rows[4].getElementsByTagName("div");
            for(let i=0;i<29;i++){
                if(divs3[i].className == "timetable-subject-active"){
                    (rows[3].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                }

            }
            rows[4].remove();

            //Period 4b
            let divs4 = rows[6].getElementsByTagName("div");
            for(let i=0;i<29;i++){
                if(divs4[i].className == "timetable-subject-active"){
                    (rows[5].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                }
            }
            rows[6].remove();

            //Classes
            let headings = document.getElementsByTagName("th");
            headings[11].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            headings[12].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            headings[13].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            headings[15].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';


            //Colours
            //Change variable names to change colour
            //Variable names are for my classes, change them accordingly 
            let classes = document.getElementsByTagName("div");
            let spec = "rgb(255, 204, 245)"; //Pink
            let PS = "rgb(255, 255, 255)"; //White
            let meth = "rgb(204, 224, 255)"; //Blue
            let eng = "rgb(255, 245, 204)"; //Yellow
            let phys = "rgb(255,195,202)"; //Red
            //let eng = "rgb(255, 224, 204)"; //Orange
            let HR = "rgb(204, 204, 255)"; //Purple


            ///English
            classes[23].style.backgroundColor = eng;
            classes[35].style.backgroundColor = eng;
            classes[68].style.backgroundColor = eng;
            classes[74].style.backgroundColor = eng;
            classes[89].style.backgroundColor = eng;
            classes[89].style.backgroundColor = eng;
            classes[170].style.backgroundColor = eng;

            //Physics
            classes[65].style.backgroundColor = phys;
            classes[80].style.backgroundColor = phys;
            classes[86].style.backgroundColor = phys;
            classes[104].style.backgroundColor = phys;
            classes[143].style.backgroundColor = phys;
            classes[158].style.backgroundColor = phys;

            //Spec
            classes[41].style.backgroundColor = spec;
            classes[53].style.backgroundColor = spec;
            classes[95].style.backgroundColor = spec;
            classes[98].style.backgroundColor = spec;
            classes[152].style.backgroundColor = spec;
            classes[167].style.backgroundColor = spec;

            //Methods
            classes[38].style.backgroundColor = meth;
            classes[56].style.backgroundColor = meth;
            classes[71].style.backgroundColor = meth;
            classes[83].style.backgroundColor = meth;
            classes[110].style.backgroundColor = meth;
            classes[155].style.backgroundColor = meth;

            //Private study
            classes[161].remove()
            classes[146].remove()
            classes[77].remove()
            classes[62].remove()
            classes[44].remove()
            classes[29].remove()



        //Home page
        } else if(window.location.href=="https://link.stleonards.vic.edu.au/"){
            //Remove and replace period headings
            let rows = document.getElementsByTagName("th");
            let yes = document.getElementsByTagName("td");
            let divs = 0;
            let a = 0
            for(let i = 1; i<10;i++){
                divs = yes[i].getElementsByTagName("div");
                if(divs[0].className == "timetable-subject-active"){
                    a= yes[i-1].getElementsByTagName("div");
                    a[0].classList.add("timetable-subject-active");

                }

            }

            //Deleting classes
            rows[1].remove();
            rows[2].remove();
            rows[3].remove();
            rows[5].remove();
            rows[0].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            rows[1].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            rows[2].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            rows[4].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

            //Deleting period headers
            let periods = document.getElementsByTagName("td");
            periods[1].remove();
            periods[2].remove();
            periods[3].remove();
            periods[5].remove();
            
            //Reassign location of active box from period b to a
            for(let j = 15; j<25;j++){
                divs = yes[j].getElementsByTagName("div");
                if(divs[0].className == "timetable-subject-active"){
                    a= yes[j-1].getElementsByTagName("div");
                    a[0].classList.add("timetable-subject-active");
                }
            }

            //Cocurricular
            periods[16].remove();
            periods[17].remove();
            periods[18].remove();
            periods[21].remove();

            rows[16].remove();
            rows[17].remove();
            rows[18].remove();
            rows[21].remove();

            rows[15].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            rows[16].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            rows[17].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            rows[20].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

        }
};
