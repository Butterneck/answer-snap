import { Collection, Db, MongoClient } from 'mongodb';

import { environment } from './environment';

export class MongoDbProvider {
  private database?: Db;
  private mongoClient: MongoClient;

  constructor(url: string) {
    this.mongoClient = new MongoClient(url);
  }

  get questionsCollection(): Collection {
    const questionsCollection = this.getCollection('questions');

    if (!questionsCollection) {
      throw new Error('Questions collection is undefined');
    }

    return questionsCollection;
  }

  /**
   * Connect to MongoDB.
   * @async
   * @param databaseName - Database name.
   */
  async connectAsync(databaseName: string): Promise<void> {
    if (!this.database) {
      console.log("New connection")
      await this.mongoClient.connect();
      this.database = this.mongoClient.db(databaseName);
    }
  }

  /**
   * Close the database and its underlying connections.
   */
  async closeAsync(): Promise<void> {
    await this.mongoClient.close();
  }

  /**
   * Fetch a specific collection.
   * @private
   * @param collectionName - Collection name.
   * @returns The collection instance.
   */
  private getCollection(collectionName: string): Collection {
    if (!this.database) {
      throw new Error('Database is undefined.');
    }

    return this.database.collection(collectionName);
  }
}

export const mongoDbProvider = new MongoDbProvider(environment.mongoDb.url);