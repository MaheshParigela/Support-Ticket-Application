const API_URL =
"https://21nymluap7.execute-api.ap-south-1.amazonaws.com/dev/alltickets";

let allTickets = [];

window.onload = async () => {

    await loadTickets();

    document
    .getElementById("searchBox")
    .addEventListener("input", applyFilters);

    document
    .getElementById("statusFilter")
    .addEventListener("change", applyFilters);

    document
    .getElementById("priorityFilter")
    .addEventListener("change", applyFilters);
};

async function loadTickets() {

    const response = await fetch(API_URL);

    allTickets = await response.json();

    updateStats(allTickets);

    renderTickets(allTickets);
}

function updateStats(tickets){

    document.getElementById("adminTotal").innerText =
    tickets.length;

    document.getElementById("adminOpen").innerText =
    tickets.filter(t => t.status==="OPEN").length;

    document.getElementById("adminResolved").innerText =
    tickets.filter(t => t.status==="RESOLVED").length;

    document.getElementById("adminHigh").innerText =
    tickets.filter(t => t.priority==="HIGH").length;
}

function applyFilters(){

    const search =
    document.getElementById("searchBox")
    .value
    .toLowerCase();

    const status =
    document.getElementById("statusFilter")
    .value;

    const priority =
    document.getElementById("priorityFilter")
    .value;

    let filtered = allTickets.filter(ticket => {

        const matchSearch =
        ticket.ticket_id
        .toLowerCase()
        .includes(search);

        const matchStatus =
        status === "ALL" ||
        ticket.status === status;

        const matchPriority =
        priority === "ALL" ||
        ticket.priority === priority;

        return (
            matchSearch &&
            matchStatus &&
            matchPriority
        );
    });

    renderTickets(filtered);
}

function renderTickets(tickets){

    let html = "";

    tickets.forEach(ticket => {

        html += `
        <tr>

        <td>${ticket.ticket_id}</td>

        <td>${ticket.customer_name}</td>

        <td>${ticket.issue}</td>

        <td>${ticket.priority}</td>

        <td>

        <select onchange="updateStatus('${ticket.ticket_id}',this.value)">

        <option ${ticket.status=="OPEN"?"selected":""}>OPEN</option>

        <option ${ticket.status=="IN_PROGRESS"?"selected":""}>IN_PROGRESS</option>

        <option ${ticket.status=="RESOLVED"?"selected":""}>RESOLVED</option>

        <option ${ticket.status=="CLOSED"?"selected":""}>CLOSED</option>

        </select>

        </td>

        </tr>
        `;
    });

    document.querySelector("#ticketsTable tbody").innerHTML =
    html;
}

async function updateStatus(ticketId,status){

    await fetch(
    "https://21nymluap7.execute-api.ap-south-1.amazonaws.com/dev/ticket",
    {
        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            ticket_id:ticketId,
            status:status
        })
    });

    alert("Status Updated");

    await loadTickets();
}