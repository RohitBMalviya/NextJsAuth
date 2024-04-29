import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGOOSEURL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose Connected");
    });

    connection.on("error", (error) => {
      console.error("Mongoose failed to Connect : ", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("something went wrong while connect the Database", error);
  }
}
