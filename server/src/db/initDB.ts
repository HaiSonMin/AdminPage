import mongoose from 'mongoose';
import { env } from 'process';

class Database {
  static INSTANCE: any;
  URL_MONGO: string;
  constructor() {
    // Mongo container ánh xạ ra ngoài với cổng 27018
    // Giao tiếp với port 27017 của mongodb
    this.URL_MONGO = `mongodb://${env.DB_HOST}:${env.MONGODB_DOCKER_PORT}`;
    this.connect();
  }
  // Server giao tiếp với mongodb bên trong container với cổng 27017
  // mongodb://haison:bokute22102000@mongodb:27017
  private connect(typeDb: string = 'MongoDb') {
    mongoose
      .connect(this.URL_MONGO, {
        dbName: env.MONGODB_DATABASE,
        // Using for productions
        // user: env.MONGODB_USER,
        // pass: env.MONGODB_PASSWORD,
      })
      .then(() => console.log(`Connect ${typeDb} Successfully`))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new Database();
    return this.INSTANCE;
  }
}

export default Database.getInstance();
