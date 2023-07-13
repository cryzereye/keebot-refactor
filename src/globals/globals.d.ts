import { MongoClient } from "mongodb";
import { Config } from "../models/config";

declare global {
    var configs: Config[];
    var dbClient: MongoClient;
}