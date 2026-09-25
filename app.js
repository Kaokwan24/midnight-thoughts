const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let thoughts = [
    { id: 1, text: 'ทำไมแมวถึงชอบกล่อง', done: false },
    { id: 2, text: 'ถ้าฝนตกบนดวงจันทร์จะเป็นยังไง', done: false },
    { id: 3, text: 'อยากรู้ว่าปลาทะเลเคยเบื่อทะเลไหม', done: true },
    { id: 4, text: 'ตีสองแล้วทำไมยังไม่นอน', done: false }
];

let nextId = 5;

// หน้าแรก
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// ดูรายการทั้งหมด และกรองด้วย done
app.get('/api/thoughts', (req, res) => {
    const { done } = req.query;

    if (done === undefined) {
        return res.json(thoughts);
    }

    res.json(
        thoughts.filter(t => String(t.done) === done)
    );
});

// ดูรายการตาม ID
app.get('/api/thoughts/:id', (req, res) => {
    const thought = thoughts.find(
        t => t.id === Number(req.params.id)
    );

    if (!thought) {
        return res.status(404).json({
            error: 'ไม่พบรายการนี้'
        });
    }

    res.json(thought);
});

// เพิ่มรายการใหม่
app.post('/api/thoughts', (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).json({
            error: 'ต้องระบุ text'
        });
    }

    const newThought = {
        id: nextId++,
        text: text,
        done: false
    };

    thoughts.push(newThought);

    res.status(201).json(newThought);
});

// เปลี่ยนสถานะรายการ
app.patch('/api/thoughts/:id', (req, res) => {
    const thought = thoughts.find(
        t => t.id === Number(req.params.id)
    );

    if (!thought) {
        return res.status(404).json({
            error: 'ไม่พบรายการนี้'
        });
    }

    thought.done = !thought.done;

    res.json(thought);
});

// ลบรายการ
app.delete('/api/thoughts/:id', (req, res) => {
    const id = Number(req.params.id);

    thoughts = thoughts.filter(
        t => t.id !== id
    );

    res.status(204).end();
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
