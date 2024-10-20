import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database!");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected!");
  } catch (e) {
    console.log("Something went wrrong while connecting to db!");
    console.error(e);

    process.exit();
  }
}
