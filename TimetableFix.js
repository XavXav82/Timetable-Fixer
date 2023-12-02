// ==UserScript==
// @name        Tametable fixer
// @namespace   TimetableFix
// @version     1.1
// @author      XavXav82
// @description My plugin for timtable fixing
// @match     https://link.stleonards.vic.edu.au/timetable
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==
window.onload = function() {
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
}; 
