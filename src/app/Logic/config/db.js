import mongoose from "mongoose";

global.mongoose = {
    conn: null,
    promise: null,
}

export async function dbConnect() {

    if (global.mongoose && global.mongoose.conn) {
        console.log("Connected from previus");

        return global.mongoose.conn;
    }

    else {
        const connString = process.env.MONGO_URL;

        const promise = mongoose.connect(connString, {
            autoIndex: true,
        });

        global.mongoose = {
            conn: await promise,
            promise,
        }

        console.log("Newly connected");
        return promise;
    }
}
