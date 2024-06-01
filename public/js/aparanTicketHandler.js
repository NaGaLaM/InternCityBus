let st_cnt = document.querySelector(".all-st_cnt");

var seatArr = [];
start2();
async function start() {
    const getSeats = (await fetch('http://localhost:8080/bus/orders/3', { method: "GET" })).json();
    return getSeats;
}
async function start2() {
    let disfirst = false;
    var selected = [0, 0, 0, 0, 0, 0, 0];
    const data = await start();
    let td = new Date();
    const t1 = td.getTime();
    for (let d of data) {
        const t3 = new Date(d.created_at);
        const t2 = t3.getTime();
        const diff = Math.abs(t1 - t2);
        const mill = 1000 * 60 * 60 * 24;
        const index = Math.ceil(diff / mill) - 1;
        d.index = index;
    }
    for (let j = 0; j < 7; j++) {
        var seat = [];
        var da = [];
        for (let das of data) {
            if (das.index == j) {
                da = [...da, ...das.seats];
            }
        }
        for (var i = 0; i < 13; i++) {
            let bkd_seat = da.includes(i + 2) ? "bkd_seat" : "";
            disfirst = da.includes(1) ? "disabled" : "";
            if (bkd_seat) {
                selected[j]++;
            }
            let isDisabled = bkd_seat == "bkd_seat" ? "disabled" : "";
            seat.push(`<input value = ${i + 2} class = "asd" type="checkbox" name="tickets" id="s${(i + 2)}" ${isDisabled} /><label 
            for="s${(i + 2)}" class="seat ${bkd_seat} seat${i}"></label>`
            )
        }
        seatArr.push(seat);

    }

    (function () {
        var clickableElements = document.getElementsByClassName("or");
        getSeat(0);
        for (var i = 0; i < clickableElements.length; i++) {
            clickableElements[i].addEventListener("click", handleClick);
        }
    })();
    function handleClick() {
        document.querySelector(".amount").innerHTML = 0 + " ֏";
        document.querySelector(".count").innerHTML = 0;
        var elementId = this.id;
        document.getElementById('arka').innerHTML = "Առկա " + (13 - selected[elementId]);
        document.getElementById('amragrvats').innerHTML = "Ամրագրված " + selected[elementId];
        getSeat(elementId);
    }
    var tickets = [];
    let gin = Number(document.getElementById("gin").innerHTML.split(" ")[0]);
    let newprice = 0;
    function getSeat(j) {

        st_cnt.innerHTML =
            `<input value=${1} class ="asd" type="checkbox" name="tickets" id="s1" disabled/>
    <label for="s1" class="seat bkd_seat"></label>`;
        for (let i = 0; i < seatArr[j].length; i++) {
            st_cnt.insertAdjacentHTML("beforeend", seatArr[j][i]);
        }

        tickets = document.querySelectorAll(".asd");
        tickets.forEach((ticket) => {
            ticket.addEventListener("change", () => {
                let amount = document.querySelector(".amount").innerHTML.split(" ")[0];
                let count = document.querySelector(".count").innerHTML;
                amount = Number(amount);
                count = Number(count);

                if (ticket.checked) {
                    count += 1;
                    amount += gin;
                    newprice = amount-gin;
                    if(count > 3)
                    {
                        document.querySelector('.amount1').innerHTML = newprice + " ֏";
                        document.querySelector('.amount').style.textDecoration = 'line-through';
                        document.querySelector('.amount1').style.display = 'block';
                    }
                } else {
                    count -= 1;
                    amount -= gin;

                    if(newprice > 0)
                    {
                        newprice-=gin;
                        document.querySelector('.amount1').innerHTML = newprice + " ֏";
                        if(count < 4)
                        {
                        document.querySelector('.amount1').style.display = 'none';
                        document.querySelector('.amount').style.textDecoration = 'none';
                        }
                    }
                }
                document.querySelector(".amount").innerHTML = amount + " ֏";
                document.querySelector(".count").innerHTML = count;
            });
        });

    }
}