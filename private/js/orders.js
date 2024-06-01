(async () => {
    const data = await (await fetch('http://localhost:8080/bus/admin/ord', { method: "GET" })).json();
    console.log(data);
    function compareDates(a, b) {
        const dateA = new Date(a.paytime);
        const dateB = new Date(b.paytime);
        return dateB - dateA;
    }
    data.sort(compareDates);
    console.log(data[0].paytime);
    if (data[0]) {
        for (let ord of data) {
            document.querySelector('.responsive-table').insertAdjacentHTML("beforeend",
                `<li class="table-row">
            <div class="col col-1" data-label="Անուն Ազգանուն">${ord.name}</div>
            <div class="col col-2" data-label="Քանակ">${ord.seats.length}</div>
            <div class="col col-3" data-label="Գին">${ord.price} ֏</div>
            <div class="col col-4" data-label="Ուղղություն">${ord.city}</div>
            </li>`
            )
        }
    }
    else {

    }
})();