// ===============================
// GET AUTHORIZATION CODE
// ===============================

const params = new URLSearchParams(window.location.search);

const authCode = params.get("code");

console.log("Authorization Code:", authCode);

// ===============================
// API CONFIGURATION
// ===============================

const API_ENDPOINT =
"https://21nymluap7.execute-api.ap-south-1.amazonaws.com/dev/ticket";


// ===============================
// SUBMIT TICKET
// ===============================

async function submitTicket() {

    try {

        const customerName =
            document.getElementById("customer_name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const priority =
            document.getElementById("priority").value;

        const issue =
            document.getElementById("issue").value.trim();

        // Validation

        if (!customerName) {

            alert("Customer Name is required");
            return;
        }

        if (!email) {

            alert("Email is required");
            return;
        }

        if (!issue) {

            alert("Issue description is required");
            return;
        }

        const payload = {

            customer_name: customerName,
            email: email,
            priority: priority,
            issue: issue

        };

        document.getElementById("response").innerHTML =
            "Submitting ticket...";

        const response = await fetch(
            API_ENDPOINT,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)
            }
        );

        const result =
            await response.json();

        console.log(result);

        if (response.ok) {

            document.getElementById("response").innerHTML =

                `
                <div style="color:#22c55e">
                Ticket Created Successfully<br><br>
                Ticket ID: ${result.ticket_id}<br>
                Category: ${result.category}
                </div>
                `;

            // Clear form

            document.getElementById("customer_name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("issue").value = "";
            document.getElementById("priority").value = "LOW";

        } else {

            document.getElementById("response").innerHTML =

                `
                <div style="color:red">
                ${result.message}
                </div>
                `;
        }

    }
    catch (error) {

        console.error(error);

        document.getElementById("response").innerHTML =

            `
            <div style="color:red">
            Failed to submit ticket
            </div>
            `;
    }
}
async function loadDashboardStats() {

    try {

        const response = await fetch(
        "https://21nymluap7.execute-api.ap-south-1.amazonaws.com/dev/stats"
        );

        const stats = await response.json();

        document.getElementById("totalTickets").innerText =
            stats.total;

        document.getElementById("openTickets").innerText =
            stats.open;

        document.getElementById("resolvedTickets").innerText =
            stats.resolved;

        document.getElementById("highTickets").innerText =
            stats.high;

    }
    catch(error){

        console.error(error);
    }
}

loadDashboardStats();