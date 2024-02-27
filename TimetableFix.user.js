// ==UserScript==
// @name        Timetable fixer
// @namespace   https://github.com/XavXav82/Timetable-Fixer/
// @version     1.7.2
// @author      XavXav82
// @description My plugin for timtable fixing and editing (now with colour customisation and a new search feature!)
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @match       https://link.stleonards.vic.edu.au/*
// @match       https://link.stleonards.vic.edu.au/eportfolio
// @match       https://link.stleonards.vic.edu.au/eportfolio/*
// @grant       unsafeWindow
// @run-at      document-start
// @downloadURL https://github.com/XavXav82/Timetable-Fixer/raw/main/TimetableFix.user.js
// @updateURL   https://github.com/XavXav82/Timetable-Fixer/raw/main/TimetableFix.user.js
// ==/UserScript==


//Change this to remove private study, leaving the spot blank
let removePS = true;

//Cheeky global variable for searches
let parent = false;

//Colours
//Change your classes to the colours you want, ignore the rest
//You can use the colours I have provided, or use your own RGB values
//Do not delete any variables
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
let music = "rgb(204, 255, 204)"; //Green
let IBMath = "rgb(204, 255, 204)"; //Green
let IBMusic = "rgb(204, 255, 204)"; //Green
let IBcomputer = "rgb(204, 255, 204)"; //Green

//Any new colours must be added into the dictionaries WITH THE SAME KEY (the key is arbitrary)
//Add a keyword into "subjects" which appears in the name of the subject
const subjects = { methods: "Methods", english: "English", specialist: "Specialist", physics: "Physics", homeroom: "Homeroom",
                  softwaredev: "Software", economics: "Economics", systems: "Systems", accounting: "Accounting", data: "Data",
                  legal: "Legal", general: "General", anal:"Anal", music:"Music", IBcomp:"computer"};
//Add the name of the variable used for colour
const colours = { methods: meth, english: eng, specialist: spec, physics: phys, homeroom: HR, softwaredev: soft, economics: eco,
                 systems: sys, accounting: acc, data: data, legal: legal, general: general, anal:IBMath, music:IBMusic, IBcomp:IBcomputer};



var nameList;
function searchList(){

    for(let i=0;i<nameList.length;i++){
        //Splitting the parameter into name [0] and number[1]
        let name = nameList[i].split("+");
        let h31 = document.createElement("h3");
        //Format the name (remove spaces and Capitalise name)
        let name1 = name[0].split("%20");
        for(let j = 0;j<name1.length;j++){
            name1[j] = name1[j][0].toUpperCase() + name1[j].substr(1);
        }
        name[0] = name1.join(" ");
        h31.innerHTML = name[0];

        //Creating and combining HTML objects
        let img1 = document.createElement("img");
        img1.src = "https://link.stleonards.vic.edu.au/portrait.php?id="+name[1]+"&size=square64";//Get the users pfp
      
        let a1 = document.createElement("a");
        if(!parent){
            a1.href = "/eportfolio/"+name[1]+"/profile";
        }else{
            a1.href = "/search/user/"+name[1];
        }
        a1.appendChild(img1);
        a1.appendChild(h31);
      
        let div1 = document.createElement("div");
        div1.classList.add("card");
        div1.classList.add("small-12");
        div1.appendChild(a1);
      
        let div2 = document.createElement("div");
        div2.classList.add("list-item");
        div2.appendChild(div1);
      
        let li1 = document.createElement("li");
        li1.classList.add("actions-small-1");
        li1.appendChild(div2);
  
        //Add to the page
        document.getElementsByClassName("action-list")[0].appendChild(li1);
    }
}


window.onload = function() {
        try{
            var searchBar = document.getElementById("search");
            searchBar.action = "https://xavxav82.github.io/stljson.github.io/";
        } catch{}
        //Timetable page
        if(window.location.href=="https://link.stleonards.vic.edu.au/timetable"){
            //Headings
            let rows = document.getElementsByTagName("tr");

            //Reassign location of active box from period b to a
            for(let p=2;p<7;p++){
                if(p==5){continue;} //Works for 2-6, excluding 5 because that is homeroom
                let divs1 = rows[p].getElementsByTagName("div");
                for(let i=0;i<29;i++){
                    if(divs1[i].className == "timetable-subject-active"){
                        (rows[p-1].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                    }
                }
                //Remove period b
                rows[p].remove();
            }



            //Rename classes
            let headings = document.getElementsByTagName("th");
            headings[11].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            headings[12].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            headings[13].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            headings[15].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

            let classes = document.getElementsByTagName("div");

            //Assigning colours
            for(let i = 23;i<171;i++){
                for (const property in subjects) {
                    if((classes[i].innerHTML).search(`${subjects[property]}`) != -1 && (classes[i].innerHTML).search("Private Study") == -1){
                        classes[i].style.backgroundColor = `${colours[property]}`;
                    } else if((classes[i].innerHTML).search("Private Study") != -1 && removePS == true){
                        classes[i].remove();
                    }
                }
            }

        //Home page
        } else if(window.location.href=="https://link.stleonards.vic.edu.au/"){
            //Remove and replace period headings
            let rows = document.getElementsByTagName("th");
            let yes = document.getElementsByTagName("td");
            console.log(yes[1].innerHTML);
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

            //Assigning colours
            for(let i = 0;i<yes.length;i++){
                let tempDivs = yes[i].getElementsByTagName("div")[1];
                for (const property in subjects) {
                    if((tempDivs.innerHTML).search(`${subjects[property]}`) != -1 && (tempDivs.innerHTML).search("Private Study") == -1){
                        tempDivs.style.backgroundColor = `${colours[property]}`;
                    } else if((yes[i].innerHTML).search("Private Study") != -1 && removePS == true){
                        yes[i].innerHTML = "";
                    }
                }
            }

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

            //Cocurricular removal
            periods[16].remove();
            periods[17].remove();
            periods[18].remove();
            periods[21].remove();

            rows[16].remove();
            rows[17].remove();
            rows[18].remove();
            rows[21].remove();

            //Cocurricular renaming
            rows[15].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            rows[16].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            rows[17].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            rows[20].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

        }else if(window.location.href.search("search")!=-1){

            let em = document.getElementsByTagName("em");
            em[0].remove();
            const queryString = window.location.search;
            let tempParam = (queryString.split("keyword="))[1];
            let tempParams = (tempParam.split("&searchval="));
            nameList = tempParams[0].split(",");
            let finalParams = tempParams[1].split("&parent=");//0 is search query, 1 is parent variable

            if(finalParams.length > 1){
                parent = true
            }

            let divs = document.getElementsByClassName("small-12 island");
            let h1 = divs[0].getElementsByTagName("h1");
            h1[0].innerHTML = "Search Results for "+finalParams[0];
            setTimeout(searchList, 2500);

        }
};


