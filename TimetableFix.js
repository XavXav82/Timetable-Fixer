// ==UserScript==
// @name        Timetable fixer
// @namespace   TimetableFix
// @version     1.3
// @author      XavXav82
// @description My plugin for timtable fixing
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==
window.onload = function() {
        if(window.location.href=="https://link.stleonards.vic.edu.au/timetable")%7B
            //Headings
            let rows = document.getElementsByTagName("tr");
            rows[2].remove();
            rows[3].remove();
            rows[4].remove();
            rows[6].remove();

            //Classes
            let headings = document.getElementsByTagName("th");
            headings[11].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            headings[12].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            headings[13].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            headings[15].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>'; 
}else if(window.location.href=="https://link.stleonards.vic.edu.au/"){
            //Remove and replace period headings
            let rows = document.getElementsByTagName("th");

            //Classes
            rows[1].remove();
            rows[2].remove();
            rows[3].remove();
            rows[5].remove();
            rows[0].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            rows[1].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            rows[2].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            rows[4].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

            //Cocurricular
            rows[16].remove();
            rows[17].remove();
            rows[18].remove();
            rows[21].remove();
            rows[15].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            rows[16].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            rows[17].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            rows[20].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';

            //Deleting periods
            let periods = document.getElementsByTagName("td");
            periods[1].remove();
            periods[2].remove();
            periods[3].remove();
            periods[5].remove();
            periods[16].remove();
            periods[17].remove();
            periods[18].remove();
            periods[21].remove();

        }
}; 
