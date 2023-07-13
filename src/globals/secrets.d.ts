declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      DISCORD_BOT_TOKEN: string;
      DB_URL: string;
    }
  }
}
export { };

