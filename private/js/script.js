(async () => {
    const data = await (await fetch('http://localhost:8080/bus/admin/msg', { method: "GET" })).json();
    if (data[0]) {

        for (let msg of data) {
            console.log(msg);
            document.querySelector(".responsive-table").insertAdjacentHTML('beforeend',
                `
            <li class="table-row">
            <div class="col col-1" data-label="Անուն Ազգանուն">${msg.name}</div>
            <div class="col col-2" data-label="Էլ․ հասցե">${msg.email}</div>
            <div class="col col-3" data-label="Նամակ">${msg.message}</div>
            </li>
            `
            )

        }
    }
    else {
        document.querySelector('.responsive-table').insertAdjacentHTML('beforeend', "Loading...")
    }
})();