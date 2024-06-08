let rooms = JSON.parse(localStorage.getItem('rooms')) || {};
let currentRoom = '';

function editRoom() {
    document.getElementById('roomManagement').style.display = 'block';
}

function makeRoom() {
    const roomCode = prompt("Enter a new room code:");
    if (roomCode) {
        if (!rooms[roomCode]) {
            rooms[roomCode] = {
                inside: [],
                history: []
            };
            localStorage.setItem('rooms', JSON.stringify(rooms));
            alert(`Room ${roomCode} created.`);
        } else {
            alert('Room code already exists.');
        }
    }
}

function manageRoom() {
    const roomCode = document.getElementById('roomCodeAdmin').value;
    if (rooms[roomCode]) {
        currentRoom = roomCode;
        document.getElementById('roomManagement').style.display = 'none';
        document.getElementById('roomDetails').style.display = 'block';
        updateRoomDetails();
    } else {
        alert("Room not found.");
    }
}

function updateRoomDetails() {
    const room = rooms[currentRoom];
    const insideListAdmin = document.getElementById('insideListAdmin');
    const historyListAdmin = document.getElementById('historyListAdmin');
    insideListAdmin.innerHTML = '';
    historyListAdmin.innerHTML = '';

    room.inside.forEach(person => {
        const li = document.createElement('li');
        li.textContent = `${person.name} (Checked in at: ${person.checkInTime})`;
        insideListAdmin.appendChild(li);
    });

    room.history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name} - Rating: ${entry.rating} (Checked in at: ${entry.checkInTime}, Checked out at: ${entry.checkOutTime}, Suspicious Activity: ${entry.suspiciousActivity})`;
        historyListAdmin.appendChild(li);
    });
}
