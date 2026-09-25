const thoughtForm = document.getElementById('thoughtForm');
const thoughtInput = document.getElementById('thoughtInput');
const thoughtList = document.getElementById('thoughtList');
const filterButtons = document.querySelectorAll('[data-filter]');

let currentFilter = 'all';

async function loadThoughts() {
    let url = '/api/thoughts';

    if (currentFilter !== 'all') {
        url += `?done=${currentFilter}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        alert('โหลดข้อมูลไม่สำเร็จ');
        return;
    }

    const thoughts = await response.json();
    renderThoughts(thoughts);
}

function renderThoughts(thoughts) {
    thoughtList.innerHTML = '';

    thoughts.forEach(thought => {
        const li = document.createElement('li');
        li.className = 'thought';

        if (thought.done) {
            li.classList.add('done');
        }

        const text = document.createElement('span');
        text.className = 'thought-text';
        text.textContent = thought.text;

        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.textContent = thought.done ? 'ยกเลิก' : 'เสร็จ';
        toggleButton.addEventListener('click', () => toggleThought(thought.id));

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete';
        deleteButton.textContent = 'ลบ';
        deleteButton.addEventListener('click', () => deleteThought(thought.id));

        li.appendChild(text);
        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        thoughtList.appendChild(li);
    });
}

thoughtForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = thoughtInput.value.trim();

    if (!text) {
        return;
    }

    const response = await fetch('/api/thoughts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    });

    if (!response.ok) {
        alert('เพิ่มรายการไม่สำเร็จ');
        return;
    }

    thoughtInput.value = '';
    await loadThoughts();
});

async function toggleThought(id) {
    const response = await fetch(`/api/thoughts/${id}`, {
        method: 'PATCH'
    });

    if (!response.ok) {
        alert('เปลี่ยนสถานะไม่สำเร็จ');
        return;
    }

    await loadThoughts();
}

async function deleteThought(id) {
    const response = await fetch(`/api/thoughts/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok && response.status !== 204) {
        alert('ลบรายการไม่สำเร็จ');
        return;
    }

    await loadThoughts();
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentFilter = button.dataset.filter;
        loadThoughts();
    });
});

loadThoughts();
