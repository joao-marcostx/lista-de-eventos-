const events = [
    { id: 1, titulo: "Conferência de Tecnologia", data: "2024-03-15", local: "São Paulo", descricao: "Evento sobre inovação e tecnologia" },
    { id: 2, titulo: "Workshop de Design", data: "2024-05-10", local: "Rio de Janeiro", descricao: "Discussões sobre design gráfico e UX" }
];

function loadParticipants() {
    const storedParticipants = localStorage.getItem("participants");
    return storedParticipants ? JSON.parse(storedParticipants) : {};
}

let participants = loadParticipants();

function saveParticipants() {
    localStorage.setItem("participants", JSON.stringify(participants));
}

function renderEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = '';

    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerHTML = `
            <h2>${event.titulo}</h2>
            <p>${event.data} | ${event.local}</p>
            <p>${event.descricao}</p>
            <button onclick="viewParticipants(${event.id})">Ver Participantes</button>
        `;
        eventList.appendChild(eventDiv);
    });
}

function viewParticipants(eventId) {
    localStorage.setItem("eventId", eventId);
    window.location.href = "participantes.html";
}

function renderParticipants() {
    const eventId = localStorage.getItem("eventId");
    const participantList = document.getElementById("participant-list");
    participantList.innerHTML = '';

    if (!participants[eventId]) {
        participants[eventId] = [];
    }

    participants[eventId].forEach((participant, index) => {
        const participantItem = document.createElement("li");
        participantItem.classList.add("participant-item");
        participantItem.innerHTML = `
            ${participant.nome} (${participant.email})
            <button onclick="removeParticipant(${eventId}, ${index})">Excluir</button>
        `;
        participantList.appendChild(participantItem);
    });

    const form = document.getElementById("add-participant-form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (name && email) {
            participants[eventId].push({ nome: name, email: email });
            saveParticipants();
            renderParticipants();
            form.reset();
        } else {
            alert("Preencha todos os campos!");
        }
    };
}

function removeParticipant(eventId, index) {
    participants[eventId].splice(index, 1);
    saveParticipants();
    renderParticipants();
}

if (document.getElementById("event-list")) {
    renderEvents();
} else if (document.getElementById("participant-list")) {
    renderParticipants();
}
