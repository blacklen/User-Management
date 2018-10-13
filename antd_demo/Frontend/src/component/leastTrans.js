
// transaction = new Transaction("Minh", "Thang", 5000000)
// transaction.toString()




let clients = []

clients.push(new Client(50, 175, "Hai"));
clients.push(new Client(500, 150, "Dung"));
clients.push(new Client(100, 175, "Bao"));
clients.push(new Client(0, 150, "Long"))

let transactions = splitClients(clients);
transactions.forEach(element => {
    element.toString();
})  