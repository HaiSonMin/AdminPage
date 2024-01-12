import mongoose from 'mongoose';
import { env } from 'process';

class Database {
  static INSTANCE: any;
  URL_MONGO: string;
  constructor() {
    // Giao tiếp với port 27017 của mongodb
    this.URL_MONGO = `mongodb://localhost:27017`;
    // this.URL_MONGO = `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@mongodb:27017/seadragondb?authSource=admin`;
    this.connect();
  }

  private connect(typeDb: string = 'MongoDb') {
    mongoose
      .connect(this.URL_MONGO, {
        dbName: env.DB_NAME || 'seadragondb',
        // user: env.MONGODB_USER,
        // pass: env.MONGODB_PASSWORD,
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000,
        authSource: 'admin',
      })
      .then(() => console.log(`Connect ${typeDb} Successfully`))
      .catch((err) => {
        console.log(err);
      });
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new Database();
    return this.INSTANCE;
  }
}

export default Database.getInstance();
