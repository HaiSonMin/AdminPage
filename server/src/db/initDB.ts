import mongoose from 'mongoose';
import { env } from 'process';

class Database {
  static INSTANCE: any;
  // MONGO_URI: string = env.MONGO_HOST || 'mongodb://localhost:27017';
  MONGO_HOST: string = env.MONGO_HOST || 'mongodb://localhost:27017';
  constructor() {
    this.connect();
  }

  private connect(typeDb: string = 'MongoDb') {
    mongoose
      .connect(this.MONGO_HOST, { dbName: 'SicnewDB' })
      .then(() => console.log(`Connect ${typeDb} Successfully`))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new Database();
    return this.INSTANCE;
  }
}

export default Database.getInstance();
