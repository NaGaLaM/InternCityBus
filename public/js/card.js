function checkout() {
    let price = document.getElementById('amount').innerHTML.split(' ')[0];
    if (price > 0) {
        document.getElementById("hdn_box").style.display = "block";

    }

}
async function pay() {
    try {
        var checkboxes = document.getElementsByClassName('asd');
        var checkboxesChecked = [];
        for (var index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                checkboxesChecked.push(+checkboxes[index].value);
            }
        }
        var count = document.querySelector('.count').innerHTML;
        var price = +document.getElementById('amount').innerHTML?.split(' ')[0];
        if (count > 3) {
            price = +document.querySelector('.amount1').innerHTML?.split(' ')[0];
        }
        var name = document.getElementById('pwd_fld1').value;
        var mail = document.getElementById('pwd_fld2').value;
        var city = document.getElementById('ctn').innerHTML?.split(' - ')[1];
        var day = +document.getElementById('dat1').innerHTML;
        var selectedRadio = document.getElementsByName('ddddd');
        for (let radio of selectedRadio) {
            if (radio.checked) {
                selectedRadio = radio.value;
            }
        }
        let month
        if (selectedRadio < day) {
            month = new Date().getMonth() + 2;
        }
        else {
            month = new Date().getMonth() + 1;
        }
        await fetch('http://localhost:8080/bus/orders', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify({
                name,
                city,
                price,
                seats: checkboxesChecked,
                mail,
                count,
                date: { day: +selectedRadio, month }
            })
        })
        location.reload();
    } catch (error) {
        console.log(error);
    }
}
function cs() {
    document.getElementById("hdn_box").style.display = "none";
}