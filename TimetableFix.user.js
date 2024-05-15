// ==UserScript==
// @name        Timetable fixer
// @namespace   https://github.com/XavXav82/Timetable-Fixer/
// @version     1.8.5
// @author      XavXav82
// @description My plugin for timtable fixing and editing (now with colour customisation and a new search feature!)
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @match       https://link.stleonards.vic.edu.au/*
// @match       https://xavxav82.github.io/stljson.github.io/colours
// @grant       unsafeWindow
// @grant       GM.getValue
// @grant       GM.setValue
// @run-at      document-start
// ==/UserScript==



//Change this to remove private study, leaving the spot blank in its absense
let removePS = true;

//Chenge this to have grade notifications present
let gradeNotifs = false;

//Cheeky global variable for searches later
let parent = false;

var nameList;
function searchList(){
    //Delete all search results that are already there
    document.getElementsByClassName("l-flex-col")[22].innerHTML = "";

    //iterates for every name in nameList
    for(let i=0;i<nameList.length;i++){

        //Formatting
        let name = nameList[i].split("+");//Split the name [0--2] from the number [-1]
        let number = name[name.length-1];
        name.pop();

        let h31 = document.createElement("h3");

        let name1 = name[0];//split at space

        //For loop to capitalise first letter
        //no idea how this works, yuhao did it
        //needed because all params become lower case for some reason
        for(let j = 0;j<name.length;j++){
            name[j] = name[j][0].toUpperCase() + name[j].substr(1);
        }
        let realName = name.join(" ");//rejoin the words or whatever, thank yuhao


        //Creating and formatting HTML objects
        let img1 = document.createElement("img");
        //Try to get a picture, if it exists
        img1.src = "https://link.stleonards.vic.edu.au/portrait.php?id="+number+"&size=square64";
        //Give the appropriate link depending on the parent or student
        let a1 = document.createElement("a");
        let a2 = document.createElement("a");
        if(!parent){
            a1.href = "/eportfolio/"+number+"/profile";
            a2.href = "/eportfolio/"+number+"/profile";
        }else{
            a1.href = "/search/user/"+number;
            a2.href = "/search/user/"+number;
        }

        h31.appendChild(a1);
        a1.innerHTML = realName;

        //Creating and formatting objects
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let div4 = document.createElement("div");
        let div5 = document.createElement("div");
        let div6 = document.createElement("div");
        let div7 = document.createElement("div");

        div1.classList.add("l-flex-col","l-flex--justify-center","l-flex__item--1","f-no-margins");
        div3.classList.add("c-img", "c-img--round");
        div2.classList.add("c-img__wrapper");
        div4.classList.add("l-flex-row","l-gap-m");
        div5.classList.add("l-flex-col","l-gap-m","l-pad-m");
        div6.classList.add("c-card");
        div7.classList.add("l-flex-col");

        div1.appendChild(h31);
        div2.appendChild(img1);
        a2.appendChild(div2);
        div3.appendChild(a2);
        div4.appendChild(div3);
        div4.appendChild(div1);
        div5.appendChild(div4);
        div6.appendChild(div5);
        div7.appendChild(div6);

        //Append the new object to the a specific div on the page
        document.getElementsByClassName("l-flex-col")[22].prepend(div7);
    }
}

function createFilters(filterList){
    let label = document.createElement("label");
    let checkBox = document.createElement("input");
    let firstDiv = document.createElement("div");
    let secondDiv = document.createElement("div");
    let listElement = document.createElement("li");

    label.classList.add("f-no-margins");
    label.innerHTML = "Parents"
    label.htmlFor = "parent";

    checkBox.type = "checkbox";
    checkBox.classList.add("parent")
    checkBox.id = "parent";

    firstDiv.classList.add("l-flex__item--1");

    secondDiv.classList.add("l-flex-row");
    secondDiv.classList.add("l-flex--align-center");
    secondDiv.classList.add("f-min-btn-height");
    secondDiv.classList.add("f-no-margins");


    listElement.classList.add("l-flex-col")
    listElement.classList.add("f-min-btn-height")

    firstDiv.appendChild(checkBox);
    firstDiv.appendChild(label);
    secondDiv.append(firstDiv);
    listElement.appendChild(secondDiv);
    filterList.prepend(listElement);

}

function Save(){
    GM.setValue("Sub1Colour",document.getElementById("Sub1").value);
    GM.setValue("Sub2Colour",document.getElementById("Sub2").value);
    GM.setValue("Sub3Colour",document.getElementById("Sub3").value);
    GM.setValue("Sub4Colour",document.getElementById("Sub4").value);
    GM.setValue("Sub5Colour",document.getElementById("Sub5").value);
    GM.setValue("Sub6Colour",document.getElementById("study").value);
    GM.setValue("Sub7Colour",document.getElementById("Sub7").value);
    window.location.href = "https://link.stleonards.vic.edu.au/timetable";
}
function RemoveNotifs(){
    if(gradeNotifs == false){
        let sidebar = document.getElementById("message-list");
        let notifContainer = sidebar.getElementsByTagName("li")[2];
        let notifList = notifContainer.getElementsByTagName("li");
        for(let i=0;i<notifList.length;i++){
            if(notifList[i].innerHTML.search("mark") != -1){
                notifList[i].remove();
                i--;
            }
        }
    }
}


window.onload = function() {
    let body = document.getElementsByTagName("body")[0];
    (async () => {
        let Sub1Colour = await GM.getValue("Sub1Colour", "#fff5cc");
        let Sub2Colour = await GM.getValue("Sub2Colour", "#ccffcc");
        let Sub3Colour = await GM.getValue("Sub3Colour", "#cce0ff");
        let Sub4Colour = await GM.getValue("Sub4Colour", "#cce0ff");
        let Sub5Colour = await GM.getValue("Sub5Colour", "#ffccf5");
        let Sub6Colour = await GM.getValue("Sub6Colour", "#ffc3ca");
        let Sub7Colour = await GM.getValue("Sub7Colour", "#ccccff");

        document.getElementById("Sub1").value = Sub1Colour;
        document.getElementById("Sub2").value = Sub2Colour;
        document.getElementById("Sub3").value = Sub3Colour;
        document.getElementById("Sub4").value = Sub4Colour;
        document.getElementById("Sub5").value = Sub5Colour;
        document.getElementById("study").value = Sub6Colour;
        document.getElementById("Sub7").value = Sub7Colour;

    })();
    try{
        var searchBar = document.getElementById("search");
        searchBar.action = "https://xavxav82.github.io/stljson.github.io/";
    } catch{}
    setTimeout(RemoveNotifs, 1500);
    let tempMenu = document.getElementById("top-menu");
    let tempSpan = document.createElement("span");
    let tempA = document.createElement("a");
    let tempLi = document.createElement("li");

    tempSpan.innerHTML = "Colours";
    tempA.href = "https://xavxav82.github.io/stljson.github.io/colours";
    tempA.title = "Change your timetable's colours!";
    tempLi.style.display = "list-item";

    tempA.appendChild(tempSpan);
    //tempLi.appendChild(tempA);
    tempLi.innerHTML = '<div style="position:absolute"class="dropdown"><button class="dropbtn"><img class="imeg" src="https://xavxav82.github.io/stljson.github.io/palette.png">Colours</button><div style="position:fixed" class="dropdown-content"><p>Choose your subject colours:</p><div class="Sub1"><label for="Sub1">Sub1</label><input type="color" id="Sub1" name="Sub1" value="#f6b73c" /></div><div class="Sub2"><label for="Sub2">Sub2</label><input type="color" id="Sub2" name="Sub2" value="#f6b73c" /></div><div class="Sub3"><label for="Sub3">Sub3</label><input type="color" id="Sub3" name="Sub3" value="#f6b73c" /></div><div class="Sub4"><label for="Sub4">Sub4</label><input type="color" id="Sub4" name="Sub4" value="#f6b73c" /></div><div class="Sub5"><label for="Sub5">Sub5</label><input type="color" id="Sub5" name="Sub5" value="#f6b73c" /></div><div class="Sub6"><label for="study">Private study</label><input type="color" id="study" name="study" value="#f6b73c" /></div><div class="Sub7"><label for="Sub7">Homeroom</label><input type="color" id="Sub7" name="Sub7" value="#f6b73c" /></div><div><button class="button" id="button11">Save Preferences</button></div></div></div>';

    tempLi.style.position="relative";
    tempLi.style.zIndex="999";

    tempMenu.appendChild(tempLi);

    let butt = document.getElementById("button11");
    butt.addEventListener("click", Save);

    let style = document.createElement('style');
    style.textContent = '.dropbtn {  background-color: #00000000;  color: white;    font-size: 13px;  border: none;  width: 80px;  height: 72px;  display: block; transition: 150ms;}.dropdown {  position: relative;  display: inline-block;}.dropdown-content {  display: none;  position: absolute;  background-color: #f1f1f1;  min-width: 160px;  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);}.dropdown-content a {  color: black;  padding: 12px 16px;  text-decoration: none;  display: block;}.dropdown-content a:hover {background-color: #ddd;}.dropdown:hover .dropdown-content {display: block;}.dropdown:hover .dropbtn {background-color: #1e3f76;color: white;}.imeg{  width: 35px;  height: 35px;}';
    document.head.append(style);
  
    //Timetable page
    if(window.location.href=="https://link.stleonards.vic.edu.au/timetable"){
        //Headings
        let rows = document.getElementsByTagName("tr");

        //Following for loops act to reassign location of active box from period b to a
        for(let p=2;p<7;p++){
            if(p==5){continue;}
            let divs1 = rows[p].getElementsByTagName("div");
            for(let i=0;i<29;i++){
                if(divs1[i].className == "timetable-subject-active"){
                    (rows[p-1].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                }
            }
            rows[p].remove();
        }

        //Classes
        let headings = document.getElementsByTagName("th");
        headings[11].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
        headings[12].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
        headings[13].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
        headings[15].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

        let classes = document.getElementsByClassName("timetable-subject");
        let colourList = [];

        (async () => {
            let Sub1Colour = await GM.getValue("Sub1Colour", "#fff5cc");
            let Sub2Colour = await GM.getValue("Sub2Colour", "#ccffcc");
            let Sub3Colour = await GM.getValue("Sub3Colour", "#cce0ff");
            let Sub4Colour = await GM.getValue("Sub4Colour", "#cce0ff");
            let Sub5Colour = await GM.getValue("Sub5Colour", "#ffccf5");
            let Sub6Colour = await GM.getValue("Sub6Colour", "#ffc3ca");
            let Sub7Colour = await GM.getValue("Sub7Colour", "#ccccff");
            colourList = [Sub1Colour,Sub2Colour,Sub3Colour,Sub4Colour,Sub5Colour,Sub6Colour,Sub7Colour]
            
            //Assigning colours
            let j=0
            
            let subjDict = {};
            let colourDict = {};
            for(let i = 0;i<classes.length;i++){
                if(subjDict[(classes[i].innerHTML).split('"')[1]] == undefined && classes[i].innerHTML.search("<div><br>") == -1){
                    subjDict[(classes[i].innerHTML).split('"')[1]] = classes[i].innerHTML.split('"')[1].trim();
                    colourDict[(classes[i].innerHTML).split('"')[1]] = colourList[j];
                    j++;
                }
            }
            GM.setValue("SubjDict",subjDict);
            GM.setValue("ColourDict",colourDict);

            for(let i = 0;i<classes.length;i++){
                //uses a key from the subjects dictionary and gets the search query and colour from their dictionaries
                if((classes[i].innerHTML.split('"')[1]) == `${subjDict[classes[i].innerHTML.split('"')[1]]}` && (classes[i].innerHTML).search("Private Study") == -1){
                    classes[i].style.backgroundColor = `${colourDict[classes[i].innerHTML.split('"')[1]]}`;
                } else if((classes[i].innerHTML).search("Private Study") != -1 && removePS == true){
                    //Removes private study
                    classes[i].innerHTML="";
                    classes[i].style.backgroundColor="#FFFFFF";
                }
            }

        })();


    //Home page
    } else if(window.location.href=="https://link.stleonards.vic.edu.au/"){
        //Remove and replace period headings
        let rows = document.getElementsByTagName("th");
        let yes = document.getElementsByTagName("td");

        let divs = 0;
        let a = 0

        //Add the active box to the period preceeding the currently active one
        //If on an a period already its fine because it is put on a b period and it gets removed later
        for(let i = 1; i<10;i++){
            divs = yes[i].getElementsByTagName("div");
            if(divs[0].className == "timetable-subject-active"){
                a= yes[i-1].getElementsByTagName("div");
                if(a[0].innerHTML.search("Homeroom")==-1){
                    a[0].classList.add("timetable-subject-active");
                }
            }
        }

        //Deleting period headders
        rows[1].remove();
        rows[2].remove();
        rows[3].remove();
        rows[5].remove();
        rows[0].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
        rows[1].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
        rows[2].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
        rows[4].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

        //Deleting period blocks
        let periods = document.getElementsByTagName("td");
        periods[1].remove();
        periods[2].remove();
        periods[3].remove();
        periods[5].remove();

        let classes = document.getElementsByClassName("timetable-subject");

        (async () => {
            let Sub1Colour = await GM.getValue("Sub1Colour", "#fff5cc");
            let Sub2Colour = await GM.getValue("Sub2Colour", "#ccffcc");
            let Sub3Colour = await GM.getValue("Sub3Colour", "#cce0ff");
            let Sub4Colour = await GM.getValue("Sub4Colour", "#cce0ff");
            let Sub5Colour = await GM.getValue("Sub5Colour", "#ffccf5");
            let Sub6Colour = await GM.getValue("Sub6Colour", "#ffc3ca");
            let Sub7Colour = await GM.getValue("Sub7Colour", "#ccccff");
            let SubjDict = await GM.getValue("SubjDict",-1);
            let ColourDict = await GM.getValue("ColourDict",-1);
            let colourList = [Sub1Colour,Sub2Colour,Sub3Colour,Sub4Colour,Sub5Colour,Sub6Colour,Sub7Colour]
            let subjDict = {};
            let colourDict = {};
            //console.log(colourList);
            //Assigning colours

            for(let i = 0;i<classes.length;i++){
                    if((classes[i].innerHTML.split('"')[1]) == `${SubjDict[classes[i].innerHTML.split('"')[1]]}` && (classes[i].innerHTML).search("Private Study") == -1){
                    
                        classes[i].style.backgroundColor = `${ColourDict[classes[i].innerHTML.split('"')[1]]}`;
                    } else if((classes[i].innerHTML).search("Private Study") != -1 && removePS == true){
                        //Removes private study
                        classes[i].innerHTML="";
                        classes[i].style.backgroundColor="#FFFFFF";
                    }
            }

        })();

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

    }else if(window.location.href.search("search")!=-1){
        let filterList = document.getElementsByClassName("option-list")[0];
        let temp = document.createElement("div");
        createFilters(filterList);

        let searchField = document.getElementById("search-field");
        searchField.innerHTML = ("bruh")
        const queryString = window.location.search;
        let tempParam = (queryString.split("keyword="))[1];
        let tempParams = (tempParam.split("&filter="))[0];

        nameList = tempParams.split("%2C");
        let finalParams = tempParams[1].split("&parent=");//0 is search query, 1 is parent variable

        if(finalParams.length > 1){
            //dont bother actually checking the param because it works like this (until i want to add another param)
            parent = true
        }

        //runs the searchlist function after 2.5 secs because it need to load first
        setTimeout(searchList, 1500);

    }
};
