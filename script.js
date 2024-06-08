let rooms = JSON.parse(localStorage.getItem('rooms')) || {};
let currentRoom = '';

function enterRoom() {
    const roomCode = document.getElementById('roomCode').value;
    if (roomCode) {
        if (!rooms[roomCode]) {
            rooms[roomCode] = {
                inside: [],
                history: []
            };
        }
        currentRoom = roomCode;
        document.getElementById('roomCodeSection').style.display = 'none';
        document.getElementById('surveySection').style.display = 'block';
        updateInsideList();
    } else {
        alert("Please enter a valid room code.");
    }
}

function checkIn() {
    const name = document.getElementById('checkInName').value;
    if (name) {
        const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' });
        rooms[currentRoom].inside.push({ name: name, checkInTime: timestamp });
        localStorage.setItem('rooms', JSON.stringify(rooms));
        document.getElementById('checkInName').value = '';
        updateInsideList();
    }
}

function updateInsideList() {
    const list = document.getElementById('insideList');
    list.innerHTML = '';
    rooms[currentRoom].inside.forEach((person, index) => {
        const li = document.createElement('li');
        li.textContent = `${person.name} (Checked in at: ${person.checkInTime})`;
        li.tabIndex = 0;
        li.setAttribute('role', 'button');
        li.onclick = () => checkOut(index);
        li.onkeydown = (e) => {
            if (e.key === 'Enter') checkOut(index);
        };
        list.appendChild(li);
    });
}

function checkOut(index) {
    const rating = prompt("Rate your experience (1-5):");
    if (rating) {
        const person = rooms[currentRoom].inside.splice(index, 1)[0];
        const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' });
        const suspiciousActivity = prompt("Report any suspicious activity or unclean environments. (leave blank if none):");
        rooms[currentRoom].history.push({ 
            name: person.name, 
            rating: rating, 
            checkInTime: person.checkInTime, 
            checkOutTime: timestamp,
            suspiciousActivity: suspiciousActivity || "None"
        });
        localStorage.setItem('rooms', JSON.stringify(rooms));
        updateInsideList();
    }
}
