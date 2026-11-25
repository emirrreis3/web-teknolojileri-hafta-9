import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import connectDB from "./config/database.js";
import Event from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

const seedData = async () => {
  try {
    await connectDB();

    // İdempotent: Önce tüm kayıtları siler
    await Event.deleteMany({});
    console.log("Mevcut etkinlikler temizlendi.");

    // 6 başlangıç kaydını ekler
    const createdEvents = await Event.insertMany(seedEvents);
    console.log(`${createdEvents.length} etkinlik başarıyla eklendi.`);

    process.exit(0);
  } catch (error) {
    console.error(`Seed işlemi hatası: ${error.message}`);
    process.exit(1);
  }
};

seedData();
