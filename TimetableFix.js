// ==UserScript==
// @name        Timetable fixer
// @namespace   TimetableFix
// @version     1.2
// @author      XavXav82
// @description My plugin for timtable fixing
// @match       https://link.stleonards.vic.edu.au/timetable
// @match       https://link.stleonards.vic.edu.au/
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==
window.onload = function() {
        if(window.location.href=="https://link.stleonards.vic.edu.au/timetable")%7B
            let rows = document.getElementsByTagName("tr");
            rows[2].remove();
            rows[3].remove();
            rows[4].remove();
            rows[6].remove();
            let headings = document.getElementsByTagName("th");
            headings[11].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            headings[12].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            headings[13].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            headings[15].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';
        } else if(window.location.href=="https://link.stleonards.vic.edu.au/")%7B
            let rows = document.getElementsByTagName("th");
            rows[1].remove();
            rows[2].remove();
            rows[3].remove();
            rows[5].remove();
            rows[0].innerHTML = 'Period 1 <time class="meta">8:30am-9:50am</time>';
            rows[1].innerHTML = 'Period 2 <time class="meta">10:15am-11:35am</time>';
            rows[2].innerHTML = 'Period 3 <time class="meta">11:35am-12:55pm</time>';
            rows[4].innerHTML = 'Period 4 <time class="meta">2:15pm-3:35pm</time>';
            let rows2 = document.getElementsByTagName("td");
            rows2[1].remove();
            rows2[2].remove();
            rows2[3].remove();
            rows2[5].remove();
        }
};
