interface Environment {
  mongoDb: {
    databaseName: string;
    url: string;
  };
}

export const environment: Environment = {
  mongoDb: {
    databaseName: process.env.MONGODB_DB_NAME as string,
    url: process.env.MONGODB_URL as string,
  },
};