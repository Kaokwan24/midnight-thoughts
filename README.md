# Midnight Thoughts 🌙

โปรเจกต์ Node.js + Express REST API สำหรับงาน Workshop

## วิธีใช้งาน

### 1. ติดตั้ง package
```bash
npm install
```

### 2. รัน Server
```bash
npm start
```

หรือใช้ nodemon:
```bash
npm run dev
```

### 3. เปิดหน้าเว็บ
เปิด:
http://localhost:3000/

## REST API

| Method | Endpoint | รายละเอียด |
|---|---|---|
| GET | /api/thoughts | ดูรายการทั้งหมด |
| GET | /api/thoughts?done=true | ดูรายการที่เสร็จแล้ว |
| GET | /api/thoughts/:id | ดูรายการตาม ID |
| POST | /api/thoughts | เพิ่มรายการใหม่ |
| PATCH | /api/thoughts/:id | เปลี่ยนสถานะ |
| DELETE | /api/thoughts/:id | ลบรายการ |

ข้อมูลเก็บใน memory ดังนั้นข้อมูลจะหายเมื่อ restart server
