const API_URL =
"https://21nymluap7.execute-api.ap-south-1.amazonaws.com/dev/ticket";

async function loadTickets(){

    try{

        const response = await fetch(API_URL);

        const tickets = await response.json();

        let html = "";

        tickets.forEach(ticket=>{

            html += `

            <div class="ticket-card">

            <h3>${ticket.ticket_id}</h3>

            <p>
            <strong>Customer:</strong>
            ${ticket.customer_name}
            </p>

            <p>
            <strong>Email:</strong>
            ${ticket.email}
            </p>

            <p>
            <strong>Priority:</strong>
            ${ticket.priority}
            </p>

            <p>
            <strong>Status:</strong>
            ${ticket.status}
            </p>

            <p>
            <strong>Category:</strong>
            ${ticket.category}
            </p>

            </div>

            `;
        });

        document.getElementById("ticketsContainer").innerHTML =
            html;

    }catch(error){

        console.error(error);

        document.getElementById("ticketsContainer").innerHTML =
        "Failed to load tickets";
    }
}

loadTickets();