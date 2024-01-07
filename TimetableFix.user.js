// ==UserScript==
// @name        Timetable fixer
// @namespace   https://github.com/XavXav82/Timetable-Fixer/
// @version     1.6
// @author      XavXav82
// @description My plugin for timtable fixing and editing (now with colour customisation)
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @grant       unsafeWindow
// @run-at      document-start
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
            //Change your classes to the colours you want, ignore the rest
            //You can use the colours I have provided, or use your own RGB values
            //Do not delete any variables
            let classes = document.getElementsByTagName("div");
            let spec = "rgb(255, 204, 245)"; //Pink
            let PS = "rgb(255, 255, 255)"; //White
            let meth = "rgb(204, 224, 255)"; //Blue
            let eng = "rgb(255, 245, 204)"; //Yellow
            let phys = "rgb(255,195,202)"; //Red
            let HR = "rgb(204, 204, 255)"; //Purple
            let soft = "rgb(204, 255, 204)"; //Green
            let eco = "rgb(255, 224, 204)"; //Orange
            let sys = "rgb(204, 255, 204)"; //Green
            let acc = "rgb(204, 255, 204)"; //Green
            let data = "rgb(204, 255, 204)"; //Green
            let general = "rgb(204, 255, 204)"; //Green
            let legal = "rgb(204, 255, 204)"; //Green

            const subjects = { methods: "Methods",
                              english: "English", specialist: "Specialist", physics: "Physics", homeroom: "Homeroom", softwaredev: "Software", economics: "Economics", systems: "Systems", accounting: "Accounting", data: "Data", legal: "Legal", general: "General", };
            const colours = { methods: meth, english: eng, specialist: spec, physics: phys, homeroom: HR, softwaredev: soft, economics: eco, systems: sys, accounting: acc, data: data, legal: legal, general: general, };

            //Assigning colours
            for(let i = 23;i<171;i++){
                for (const property in subjects) {
                    if((classes[i].innerHTML).search(`${subjects[property]}`) != -1 && (classes[i].innerHTML).search("Private Study") == -1){
                        classes[i].style.backgroundColor = `${colours[property]}`;
                    } else if((classes[i].innerHTML).search("Private Study") != -1){
                        classes[i].remove();
                    }
                }
            }

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
                    if(divs[0].innerHTML.search("Period 1A") != -1 && divs[0].innerHTML.search("Period 4A") != -1 && divs[0].innerHTML.search("Period X") != -1 && divs[0].innerHTML.search("After school 2") != -1){
                        a= yes[j-1].getElementsByTagName("div");
                        a[0].classList.add("timetable-subject-active");
                    }
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
