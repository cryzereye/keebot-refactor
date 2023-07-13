import { MongoClient } from "mongodb";
import { Config } from "../models/config";
import { SubsTrie } from "../struct/SubsTrie";

declare global {
    var configs: Config[];
    var dbClient: MongoClient;
    var subscriptions: SubsTrie;
}