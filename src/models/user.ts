import { Snowflake } from "discord.js";
import { ReportType } from "./config";

export type User = {
    id: Snowflake;
    transactions: TransactionInstance[];
    reports: ReportInstance[];
    subscriptions: Subscription[];
    roles: Snowflake[];
}

export type TransactionInstance = {
    id: Snowflake;
    count: number;
}

export type ReportInstance = {
    type: ReportType;
    count: number;
}

export type Subscription = {
    id: string;
    strings: string[];
}