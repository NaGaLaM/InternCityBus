function send() {
    var formData = new FormData(document.getElementById("send"));
    fetch("http://localhost:8080/bus/orders/msg", {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(formData)
    })
}