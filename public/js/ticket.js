let days = document.querySelector(".dates");
let das = new Date();
let weekDay = das.getDay();
function getWeekDay(i) {
    let a = weekDay + i - 1;
    if (a > 6) {
        a -= 7;
    }
    const week = ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շաբ", "Կրկ"];
    return week[a];
}
let day = das.getDate();

for (var i = 1; i <= 7; i++) {
    let nextDay = new Date();
    nextDay.setDate(day + i - 1);
    const checked = i == 1 ? "checked" : "";
    days.insertAdjacentHTML(
        "beforeend",
        `<input class="or" type="radio" id="${i - 1}" name="ddddd" value="${nextDay.getDate()}" ${checked}/>
        <label class="dates-item" for="${i - 1}">
        <div class="day">${getWeekDay(i)}</div>
        <div class="date" id="dat${i}">${nextDay.getDate()}</div>
        </label>`
    );
}

