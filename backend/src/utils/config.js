import dotenv from "dotenv";

dotenv.config();

const config = {
    "server": JSON.parse(process.env.MY_SERVER),
    "user": process.env.ATLAS_USER,
    "pass": process.env.ATLAS_PASSWORD,
    "db": process.env.ATLAS_DB
}

export default config;
    