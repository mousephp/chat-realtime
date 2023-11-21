import mongoose from "mongoose";

mongoose.set('strictQuery', false);

export default async function connectToMongoDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Successfully connect to MongoDB.");
        })
        console.log(`✅ MongoDB: ${process.env.MONGODB_URI}`);
    } catch (error) {
        console.log(`❗️ MongoDB Error: ${error}`);
        process.exit(1);
    }
}

