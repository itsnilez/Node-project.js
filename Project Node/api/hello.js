import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // เชื่อมต่อกับ MongoDB
    await client.connect();

    // เลือก Database และ Collection
    const db = client.db("test"); // ตั้งชื่อ Database
    const collection = db.collection("myCollection"); // ตั้งชื่อ Collection

    // ดึงข้อมูลทั้งหมดจาก Collection
    const data = await collection.find({}).toArray();

    // ส่งข้อมูลกลับในรูปแบบ JSON
    res.status(200).json({ data });
  } catch (error) {
    // กรณีเกิดข้อผิดพลาด
    res.status(500).json({ error: error.message });
  } finally {
    // ปิดการเชื่อมต่อ MongoDB
    await client.close();
  }
}

 