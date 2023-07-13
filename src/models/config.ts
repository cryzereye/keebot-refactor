import { Snowflake } from "discord.js";

export type Config = {
    guildId: Snowflake;
    channels: Channels;
    subsConfig: SubsConfig;
    roles: Role[];
    reportTypes: ReportType;
}

export type SubsConfig = {
    donatorRoleId: Snowflake;
    limits: {
        regular: number;
        donator: number;
    }
}

export type Role = {
    name: string;
    id: Snowflake;
}

export type Channels = {
    verify: Snowflake,
    commands: Snowflake,
    reports: Snowflake,
    verifiedReports: Snowflake,
    newListings: Snowflake,
    selling: Snowflake,
    buying: Snowflake,
    trading: Snowflake,
    logs: Snowflake,
    serviceProviders: Snowflake,
    serviceFeedback: Snowflake
}

export enum ReportType {
    FLAKING = "Joy Reserve/Flaking",
    SCAMMING = "Scamming",
    DAMAGED = "Incorrect/Damaged Item",
    TROLL = "Troll/False reports",
    POSTISSUE = "Post Content Issue",
    INVALIDVOUCH = "Intentional Invalid Vouch",
    OTHER = "Other"
}