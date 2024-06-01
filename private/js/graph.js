let data = [];
(async () => {
    data = await (await fetch('http://localhost:8080/bus/admin/ord', { method: "GET" })).json();

    function compareDates(a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
    }
    data.sort(compareDates);
    let sum = {};
    let counts = [0, 0, 0];
    let cities = ['Աբովյան', "Արմավիր", "Ապարան"];
    for (let order of data) {
        order.city == 'Աբովյան' ? counts[0]++ : order.city == "Արմավիր" ? counts[1]++ : order.city == "Ապարան" ? counts[2]++ : false;
        if (sum[order.created_at]) sum[order.created_at] += order.price;
        else sum[order.created_at] = order.price;
    }

    const pie = {
        labels: cities,
        datasets: [{
            label: 'Պատվերներն ըստ քաղաքների',
            data: counts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }],
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    };

    const config = {
        type: 'doughnut',
        data: pie
    };

    const ptx = document.getElementById('piechart').getContext('2d');

    new Chart(ptx, config);



    // --------------------------------------------------------------------------
    const dates = [];
    const ticketsSold = [];

    for (let key in sum) {
        dates.push(key.split('T')[0]);
        ticketsSold.push(sum[key]);
    }

    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Վաճառված տոմսեր',
                data: ticketsSold,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                tension: 0.5
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Ամիս, ամսաթիվ'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Գումար'
                    },
                    beginAtZero: true
                }
            }
        }
    });
})();
