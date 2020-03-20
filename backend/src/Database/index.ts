import mongoose from 'mongoose';

class Database {
  public mongoConnection: string = 'mongodb://localhost:27017/tindev';

  constructor() {
    this.mongo();
  }

  private mongo(): void {
    mongoose.connect(this.mongoConnection, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
  }
}

export default new Database();
