import config from "../src/utils/config.js";
import { MongoClient } from "mongodb";

let dbConnection = null;

export async function conexion(col){
    if(dbConnection){
        return dbConnection;
    };
    try {   
        const uri = `mongodb+srv://${config.user}:${config.pass}@cluster0.mqhexgk.mongodb.net/${config.db}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(uri, options);
        const data = client.db();
        dbConnection = data.collection(col);
        return dbConnection;
    } catch (error) {
        return {status: 500, message:error};
    }
}