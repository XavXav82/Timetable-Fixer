// ==UserScript==
// @name        Timetable fixerqq
// @namespace   https://github.com/XavXav82/Timetable-Fixer/
// @version     1.10-prerelease
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

        //assign classes
        div1.classList.add("l-flex-col","l-flex--justify-center","l-flex__item--1","f-no-margins");
        div3.classList.add("c-img", "c-img--round");
        div2.classList.add("c-img__wrapper");
        div4.classList.add("l-flex-row","l-gap-m");
        div5.classList.add("l-flex-col","l-gap-m","l-pad-m");
        div6.classList.add("c-card");
        div7.classList.add("l-flex-col");

        //Appending everything
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

    //Assigning classes
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

    //Appending
    firstDiv.appendChild(checkBox);
    firstDiv.appendChild(label);
    secondDiv.append(firstDiv);
    listElement.appendChild(secondDiv);
    filterList.prepend(listElement);

}

function Save(){
    //Sets values of persistant variables to colours
    let colourList = []
    colourList.push(document.getElementById("Sub1").value)
    colourList.push(document.getElementById("Sub2").value)
    colourList.push(document.getElementById("Sub3").value)
    colourList.push(document.getElementById("Sub4").value)
    colourList.push(document.getElementById("Sub5").value)
    colourList.push(document.getElementById("study").value)
    colourList.push(document.getElementById("Sub7").value)
    GM.setValue("colourList", colourList);
    window.location.href = "https://link.stleonards.vic.edu.au/timetable"; //Reloads page to update page
}

function RemoveNotifs(){
    (async () => {
        //Grabs the value of gradeNotifs to check if notif should be deleted
        let gradeNotifs = await GM.getValue("notif", "false")
        if(gradeNotifs == true){
            //Grabs the list of notifications
            let sidebar = document.getElementById("message-list");
            let notifContainer = sidebar.getElementsByTagName("li")[2];
            let notifList = notifContainer.getElementsByTagName("li");
            //Itterates through them and deletes them if they contain "mark"
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
        //Grabs all the variables (there are a lot)
        let removePS = await GM.getValue("removePS", "false");
        /*let Sub1Colour = await GM.getValue("Sub1Colour", "#fff5cc");
        let Sub2Colour = await GM.getValue("Sub2Colour", "#ccffcc");
        let Sub3Colour = await GM.getValue("Sub3Colour", "#cce0ff");
        let Sub4Colour = await GM.getValue("Sub4Colour", "#cce0ff");
        let Sub5Colour = await GM.getValue("Sub5Colour", "#ffccf5");
        let Sub6Colour = await GM.getValue("Sub6Colour", "#ffc3ca");
        let Sub7Colour = await GM.getValue("Sub7Colour", "#ccccff");*/
        let SubjDict = await GM.getValue("SubjDict",-1);
        let ColourDict = await GM.getValue("ColourDict",-1);
        let colourList = await GM.getValue("colourList",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
        //let colourList = [Sub1Colour,Sub2Colour,Sub3Colour,Sub4Colour,Sub5Colour,Sub6Colour,Sub7Colour]
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
                //Removes private study if the setting is on and the subject name contains "private study"
                classes[i].innerHTML="";
            }
        }

    })();
}

function option(){
    //Checks the value of the switches and set them to the persistant variables
    let but1 = document.getElementById("but1");
    let but2 = document.getElementById("but2");
    GM.setValue("removePS", but1.checked);
    GM.setValue("notif", but2.checked);
    //Reloads the page to update the page with the new settings
    window.location.href = "https://link.stleonards.vic.edu.au/options";
}

function dueWork(){
    (async () => {
        let colourDict = await GM.getValue("ColourDict",-1);
        let classList = await GM.getValue("classList",-1);
        let works = document.getElementsByClassName("fc-event-main");
        for(let i=0;i<works.length;i++){
            for(const property in colourDict){
                if((works[i].innerHTML).search(property)!=-1){
                    works[i].style.backgroundColor = `${colourDict[property]}`;
                    works[i].style.color = "rgb(0,0,0)";
                }
            }
        }
    })();


}

function savePreset(i,colours){
    (async () => {
        if(i==1){GM.setValue("cList1",colours);}
        if(i==2){GM.setValue("cList2",colours);}
        if(i==3){GM.setValue("cList3",colours);}
        window.location.href = "https://link.stleonards.vic.edu.au/timetable";
    })();
}
function loadPreset(i){
    (async () => {
        if(i==1){
            let colours = await GM.getValue("cList1", ["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            GM.setValue("colourList", colours);
        }
        if(i==2){
            let colours = await GM.getValue("cList2", ["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            GM.setValue("colourList", colours);
        }
        if(i==3){
            let colours = await GM.getValue("cList3", ["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            GM.setValue("colourList", colours);
        }
        window.location.href = "https://link.stleonards.vic.edu.au/timetable";
    })();
}


//The BIG function, which runs upon the loading of the page
window.onload = function() {

    //These try catch statements are used as an existance check for the (mostly) universal features
    //As such they run on every page
    //If the features dont exist for some reason then the code will just move on
    try{
        //Changes the destination of the search bar to my website where it can search
        var searchBar = document.getElementById("search");
        searchBar.action = "https://xavxav82.github.io/stljson.github.io/";
    }catch{}try{
        //Only remove notifications after 1.5 seconds because they load after the rest of the page
        setTimeout(RemoveNotifs, 1500);
    } catch{}try{
        //This method adds the colours and options buttons to the nav bar
        let tempMenu = document.getElementById("top-menu");
        let tempSpan = document.createElement("span");
        let tempA = document.createElement("a");
        let tempLi = document.createElement("li");
        let tempLi2 = document.createElement("li");

        tempLi.style.display = "list-item";
        tempLi2.style.display = "list-item";

        //just paste in the html rather than spending years doing variable stuff
        tempLi.innerHTML = '<div style="position:absolute" class="dropdown"><button class="dropbtn"><img class="imeg" src="https://xavxav82.github.io/stljson.github.io/palette.png">Colours</button><div style="position:fixed; top:72px" class="dropdown-content"><p>Choose your subject colours:</p><div class="Sub1"><label id="Sub1T" for="Sub1">Sub1</label><input type="color" id="Sub1" name="Sub1" value="#f6b73c" /></div><div class="Sub2"><label id="Sub2T" for="Sub2">Sub2</label><input type="color" id="Sub2" name="Sub2" value="#f6b73c" /></div><div class="Sub3"><label id="Sub3T" for="Sub3">Sub3</label><input type="color" id="Sub3" name="Sub3" value="#f6b73c" /></div><div class="Sub4"><label id="Sub4T" for="Sub4">Sub4</label><input type="color" id="Sub4" name="Sub4" value="#f6b73c" /></div><div class="Sub5"><label id="Sub5T" for="Sub5">Sub5</label><input type="color" id="Sub5" name="Sub5" value="#f6b73c" /></div><div class="Sub6"><label id="Sub6T" for="study">Sub6</label><input type="color" id="study" name="study" value="#f6b73c" /></div><div class="Sub7"><label id="Sub7T" for="Sub7">Homeroom</label><input type="color" id="Sub7" name="Sub7" value="#f6b73c" /></div><div><button class="button" id="button11">Save Preferences</button></div></div></div>';

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
        //add a stylesheet to make the dropdown and such work
        style.textContent = '.dropbtn {  background-color: #00000000;  color: white;    font-size: 13px;  border: none;  width: 80px;  height: 72px;  display: block; transition: 150ms;}.dropdown {  position: relative;  display: inline-block;}.dropdown-content {  display: none;  position: absolute;  background-color: #f1f1f1;  min-width: 160px;  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);}.dropdown-content a {  color: black;  padding: 12px 16px;  text-decoration: none;  display: block;}.dropdown-content a:hover {background-color: #1e3e76;}.dropdown:hover .dropdown-content {display: block;}.dropdown:hover .dropbtn {background-color: #1e3f76;color: white;}.imeg{  width: 35px;  height: 36px;}.imeg2{  width: 33px;  height: 33px; top: 0px; vertical-align: sup;}';
        document.head.append(style);
    }catch{}
    (async () => {
        //Grabs all variables
        /*let Sub1Colour = await GM.getValue("Sub1Colour", "#fff5cc");
        let Sub2Colour = await GM.getValue("Sub2Colour", "#ccffcc");
        let Sub3Colour = await GM.getValue("Sub3Colour", "#cce0ff");
        let Sub4Colour = await GM.getValue("Sub4Colour", "#cce0ff");
        let Sub5Colour = await GM.getValue("Sub5Colour", "#ffccf5");
        let Sub6Colour = await GM.getValue("Sub6Colour", "#ffc3ca");
        let Sub7Colour = await GM.getValue("Sub7Colour", "#ccccff");*/

        let colourList = await GM.getValue("colourList",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);

        let classList = await GM.getValue("classList", ["Sub1", "Sub2", "Sub3", "Sub4", "Sub5", "Sub6", "Sub7"]);

        //Sets colours of dropdown to the right colour
        document.getElementById("Sub1").value = colourList[0];
        document.getElementById("Sub2").value = colourList[1];
        document.getElementById("Sub3").value = colourList[2];
        document.getElementById("Sub4").value = colourList[3];
        document.getElementById("Sub5").value = colourList[4];
        document.getElementById("study").value = colourList[5];
        document.getElementById("Sub7").value = colourList[6];

        //Setting the subject titles in the dropdown menu
        document.getElementById("Sub1T").innerHTML = classList[0];
        document.getElementById("Sub2T").innerHTML = classList[1];
        document.getElementById("Sub3T").innerHTML = classList[2];
        document.getElementById("Sub4T").innerHTML = classList[3];
        document.getElementById("Sub5T").innerHTML = classList[4];
        document.getElementById("Sub6T").innerHTML = classList[5];
        document.getElementById("Sub7T").innerHTML = classList[6];

    })();
    //This will only run on the Timetable page
    if(window.location.href.search("timetable")!=-1){

        //Table rows
        let rows = document.getElementsByTagName("tr");

        //For loops reassigns location of active box from period b to a
        //just adds the "timetable-subject-active" class to the class before the active one
        //if it is right then cool, if not the it gets deleted anyway
        for(let p=2;p<7;p++){
            if(p==5){continue;}//Doesn't run on period 4a
            let divs1 = rows[p].getElementsByTagName("div");
            for(let i=0;i<29;i++){
                if(divs1[i].className == "timetable-subject-active"){
                    (rows[p-1].getElementsByTagName("div"))[i].className = "timetable-subject-active";
                }
            }
            rows[p].remove();
        }


        //Rewrite row headers
        let headings = document.getElementsByTagName("th");
        headings[11].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
        headings[12].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
        headings[13].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
        headings[15].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

        let classes = document.getElementsByClassName("timetable-subject");
        let colourList = [];

        //In an async function because the persistant varibles are promises
        (async () => {
            let removePS = await GM.getValue("removePS", "false");
            /*let Sub1Colour = await GM.getValue("Sub1Colour", "#fff5cc");
            let Sub2Colour = await GM.getValue("Sub2Colour", "#ccffcc");
            let Sub3Colour = await GM.getValue("Sub3Colour", "#cce0ff");
            let Sub4Colour = await GM.getValue("Sub4Colour", "#cce0ff");
            let Sub5Colour = await GM.getValue("Sub5Colour", "#ffccf5");
            let Sub6Colour = await GM.getValue("Sub6Colour", "#ffc3ca");
            let Sub7Colour = await GM.getValue("Sub7Colour", "#ccccff");
            colourList = [Sub1Colour,Sub2Colour,Sub3Colour,Sub4Colour,Sub5Colour,Sub6Colour,Sub7Colour];*/

            let colourList = await GM.getValue("colourList",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            let classList = [];
            //Assigning colours
            let j=0;

            let subjDict = {};
            let colourDict = {};


            //Creates a dictionary that contains the innerHTML of an "a" tag that each class contains
            //Uses the a as the key and value
            //Uses the same key for a dictionary of colours
            //the order is very important and this ensures it is the same everywhere
            for(let i = 0;i<classes.length;i++){
                let theA = classes[i].getElementsByTagName("a")[0];
                if (theA != undefined){//Existance check
                    if(subjDict[(theA.innerHTML)] == undefined && classes[i].innerHTML.search("<div><br>") == -1){
                        subjDict[(theA.innerHTML)] = theA.innerHTML;
                        classList.push(theA.innerHTML);
                        colourDict[(theA.innerHTML)] = colourList[j];
                        j++;
                    }
                }
            }

            //sets thoses dictionaries to persistant variables for use elsewhere
            GM.setValue("classList", classList);
            GM.setValue("SubjDict",subjDict);
            GM.setValue("ColourDict",colourDict);

            for(let i = 0;i<classes.length;i++){
                let theA = classes[i].getElementsByTagName("a")[0];
                if(theA != undefined){//Existance check
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
        //Remove and replace period headings
        let rows = document.getElementsByTagName("th");
        let yes = document.getElementsByTagName("td");
        let trs = document.getElementsByTagName("tr");

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

        for(let i=0; i<9;i++){
            if(rows[i].innerHTML.search("1B")!=-1 || rows[i].innerHTML.search("2B")!=-1 || rows[i].innerHTML.search("3B")!=-1 || rows[i].innerHTML.search("4B")!=-1){
                console.log(rows[i+8].innerHTML);
                rows[i].remove();
                yes[i].remove();
                i--;
            }
        }
        //Deleting period headders
        /*rows[1].remove();
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
        periods[5].remove();*/

        let classes = document.getElementsByClassName("timetable-subject");

        (async () => {
            //get variables
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
            let colourList = await GM.getValue("colourList",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            //let colourList = [Sub1Colour,Sub2Colour,Sub3Colour,Sub4Colour,Sub5Colour,Sub6Colour,Sub7Colour]
            let subjDict = {};
            let colourDict = {};

            //Assigning colours
            for(let i = 0;i<classes.length;i++){
                //uses a key from the subjects dictionary and gets the search query and colour from their dictionaries
                let theA = classes[i].getElementsByTagName("a")[0];
                if((theA.innerHTML) == `${SubjDict[theA.innerHTML]}`){

                    classes[i].style.backgroundColor = `${ColourDict[theA.innerHTML]}`;
                } if((classes[i].innerHTML).search("Private Study") != -1 && removePS == true){
                    //Removes private study
                    classes[i].innerHTML="";
                    classes[i].style.backgroundColor="#FFFFFF";
                }
            }

        })();


    }else if(window.location.href.search("calendar")!=-1){
        //Calendar subjects take a while to load so only runs the code after 3 seconds
        setTimeout(Calendar, 3000);
    }else if(window.location.href.search("options")!=-1){
        (async () => {
            //deletes the entire body of the page, replacing it with the settings HTML
            let body = document.getElementById("container");
            body.innerHTML = '<h1>Options</h1><h3>Remove Private Study</h3><label class="switch"><input type="checkbox" id="but1"><span class="slider round"></span></label><br><br><h3>Remove Grade Notifications</h3><label class="switch"><input type="checkbox" id="but2"><span class="slider round"></span></label><br><br><h2>Saved colours:</h2><br><h3>Save 1</h3><div style="display: flex;"><div id="11" class="colourDisplay" style="width:20px; height:20px; background-color: aqua;"></div><div id="12" class="colourDisplay" style="width:20px; height:20px; background-color: green;"></div><div id="13" class="colourDisplay" style="width:20px; height:20px; background-color: yellow;"></div><div id="14" class="colourDisplay" style="width:20px; height:20px; background-color: magenta;"></div><div id="15" class="colourDisplay" style="width:20px; height:20px; background-color: red;"></div><div id="16" class="colourDisplay" style="width:20px; height:20px; background-color: orange;"></div><div id="17" class="colourDisplay" style="width:20px; height:20px; background-color: red;"></div></div><div style="display: flex;"><button id="save1">Save</button><button id="load1">Load</button></div><br><h3>Save 2</h3><div style="display: flex;"><div id="21" class="colourDisplay" style="width:20px; height:20px; background-color: aqua;"></div><div id="22" class="colourDisplay" style="width:20px; height:20px; background-color: green;"></div><div id="23" class="colourDisplay" style="width:20px; height:20px; background-color: yellow;"></div><div id="24" class="colourDisplay" style="width:20px; height:20px; background-color: magenta;"></div><div id="25" class="colourDisplay" style="width:20px; height:20px; background-color: red;"></div><div id="26" class="colourDisplay" style="width:20px; height:20px; background-color: orange;"></div><div id="27" class="colourDisplay" style="width:20px; height:20px; background-color: red;"></div></div><div style="display: flex;"><button id="save2">Save</button><button id="load2">Load</button></div><br><h3>Save 3</h3><div style="display: flex;"><div id="31" class="colourDisplay" style="width:20px; height:20px; background-color: aqua;"></div><div id="32" class="colourDisplay" style="width:20px; height:20px; background-color: green;"></div><div id="33" class="colourDisplay" style="width:20px; height:20px; background-color: yellow;"></div><div id="34" class="colourDisplay" style="width:20px; height:20px; background-color: magenta;"></div><div id="35" class="colourDisplay" style="width:20px; height:20px; background-color: red;"></div><div id="36" class="colourDisplay" style="width:20px; height:20px; background-color: orange;"></div><div id="37" class="colourDisplay" style="width:20px; height:20px; background-color: red;"></div></div><div style="display: flex;"><button id="save3">Save</button><button id="load3">Load</button></div><br><br><button id="saveOpt" style="width:80px;">Save</button>';

            let preset1 = await GM.getValue("cList1",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            let preset2 = await GM.getValue("cList2",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            let preset3 = await GM.getValue("cList3",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);
            let colourList = await GM.getValue("colourList",["#fff5cc","#ccffcc","#cce0ff","#cce0ff","#ffccf5","#ffc3ca", "#ccccff"]);

            console.log(preset1);

            for(let i=1; i<4; i++){
                let tempPreset = [];
                if(i==1){tempPreset = preset1;}
                if(i==2){tempPreset = preset2;}
                if(i==3){tempPreset = preset3;}
                for(let j=1; j<8; j++){
                    let tempDiv = document.getElementById(i.toString()+j.toString());
                    tempDiv.style.backgroundColor = tempPreset[j-1];
                }
                let saveButton = document.getElementById("save"+(i));
                let loadButton = document.getElementById("load"+(i));

                saveButton.addEventListener("click", function(){savePreset(i, colourList)});
                loadButton.addEventListener("click", function(){loadPreset(i)});
            }


            //Adds a stylesheet
            let style = document.createElement("style");
            style.textContent = '.switch {   position: relative;   display: inline-block;   width: 69px;   height: 39px; left:29px;}  .switch input {   opacity: 0;   width: 0;   height: 0; } .slider {   position: absolute;   cursor: pointer;   top: 0;   left: 0;   right: 0;   bottom: 0;   background-color: #ccc;   -webkit-transition: .4s;   transition: .4s; }  .slider:before {   position: absolute;   content: "";   height: 30px;   width: 30px;   left: 3px;   bottom: 3px;   background-color: white;   -webkit-transition: .4s;   transition: .4s; }  input:checked + .slider {   background-color: #2196F3; }  input:focus + .slider {   box-shadow: 0 0 1px #2196F3; }  input:checked + .slider:before {   -webkit-transform: translateX(26px);   -ms-transform: translateX(26px);   transform: translateX(26px); }  .slider.round {   border-radius: 34px; }  .slider.round:before {   border-radius: 50%; }';
            document.head.append(style);

            //Renames the title which appears on the tab
            let title = document.getElementsByTagName("title")[0];
            title.innerHTML = "Options";

            //save button
            let butt = document.getElementById("saveOpt");
            butt.addEventListener("click",option);

            //Option switches
            let PSSwitch = document.getElementById("but1");
            let notifSwitch = document.getElementById("but2");
            PSSwitch.checked = await GM.getValue("removePS","false");
            notifSwitch.checked = await GM.getValue("notif","false");
        })();

    }else if(window.location.href.search("search")!=-1){

        //do this
        let filterList = document.getElementsByClassName("option-list")[0];
        let temp = document.createElement("div");
        createFilters(filterList);

        //Seperates the stuff we want from the url
        const queryString = window.location.search;
        let tempParam = (queryString.split("keyword="))[1];
        let tempParams = (tempParam.split("&filter="))[0];


        nameList = tempParams.split("%2C");
        let finalParams = tempParams[1].split("&parent=");//0 is search query, 1 is parent variable

        //runs the searchlist function after 1.5 secs because it need to load first
        setTimeout(searchList, 1500);

    }else if(window.location.href.search("learning/due")!=-1){
        setTimeout(dueWork, 500);
    }else if(window.location.href.search("learning/classes")!=-1){
        (async () => {
            let colourDict = await GM.getValue("ColourDict",-1);
            let classList = await GM.getValue("classList",-1);
            let classes = document.getElementsByClassName("v-card");
            for(let i=0;i<classes.length;i++){
                for(const property in colourDict){
                    if((classes[i].innerHTML).search(property)!=-1){
                        let classBackground = classes[i].getElementsByClassName("card-class-image")[0];
                        classBackground.style.backgroundColor = `${colourDict[property]}`;//Reassigns colour
                        classBackground.style.borderBottom = "";//Removes the bottom border because it is unnecessary and clashes if a photo is the icon
                    }
                }
            }
        })();
    }
};
