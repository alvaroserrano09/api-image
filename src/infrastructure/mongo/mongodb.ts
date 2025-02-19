import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MISSING_MONGO_URI");
}

export default async function mongodb() {
  const db = mongoose.connection;
  if (db.readyState >= 1) return db;

  const client = await mongoose.connect(MONGO_URI, {
    autoIndex: true,
  });

  client.connection.on("error", (err) => console.error("MongoDB Error", err));

  try {
    console.log("Running initialization script...");

    await db.collection("tasks").createIndex({ status: 1 });

    const existingDocs = await db.collection("tasks").countDocuments();
    if (existingDocs === 0) {
      await db.collection("tasks").insertMany([
        {
          taskId: "65d4a54b89c5e342b2c2c5f6",
          status: "completed",
          price: 25.5,
          images: [
            {
              resolution: "1024",
              path: "/output/image1/1024/f322b730b287da77e1c519c7ffef4fc2.jpg",
            },
            {
              resolution: "800",
              path: "/output/image1/800/202fd8b3174a774bac24428e8cb230a1.jpg",
            },
          ],
          originalPath: "input/image1.jpg",
        },
        {
          taskId: "65d4a54b89c5e342b2c2c5f6",
          status: "pending",
          price: 40,
          originalPath: "http://image",
        },
        {
          taskId: "65d4a54b89c5e342b2c2c5f6",
          status: "failed",
          price: 0,
          originalPath: "input/image2.jpg",
        },
      ]);
      console.log("Inserted initial task data.");
    }

    console.log("Initialization script finished.");
  } catch (err) {
    console.error("Error in initialization script", err);
  }

  return mongoose.connection;
}
