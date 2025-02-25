import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGO_URL = process.env.MONGO_URL || "";

if (!MONGO_URL) {
    throw new Error("❌ No se ha definido la variable de entorno MONGO_URL");
}

export async function connectWithMongoose() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any);
    console.log("✅ Conectado a MongoDB con Mongoose");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(MONGO_URL);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(MONGO_URL);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    await connectWithMongoose(); // ✅ Asegura conexión con Mongoose
    const dbClient = await clientPromise;
    const db = dbClient.db("Prestar");
    console.log("✅ Conectado a MongoDB con MongoClient");
    return { client: dbClient, db };
}
