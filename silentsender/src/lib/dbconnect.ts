import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
}

const connection: connectionObject = {};

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to the database.");
        return;
    }

    try{

        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to the database.");
    }
    catch(error){
        console.error(" Error occured while establishing connection" ,error);
    }
}