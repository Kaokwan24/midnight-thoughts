# Midnight Thoughts 🌙

โปรเจกต์ Node.js + Express สำหรับงาน Workshop REST API

## วิธีรัน

ติดตั้ง package:

```bash
npm install
```

รัน server:

```bash
npm start
```

หรือใช้ nodemon:

```bash
npm run dev
```

เปิดเว็บที่:

http://localhost:3000/

## API

- GET `/api/thoughts` ดูรายการทั้งหมด
- GET `/api/thoughts?done=true` กรองรายการที่เสร็จแล้ว
- GET `/api/thoughts/:id` ดูรายการตาม ID
- POST `/api/thoughts` เพิ่มรายการ
- PATCH `/api/thoughts/:id` เปลี่ยนสถานะ
- DELETE `/api/thoughts/:id` ลบรายการ

ข้อมูลเก็บไว้ใน memory ดังนั้นข้อมูลจะหายเมื่อปิดหรือ restart server
