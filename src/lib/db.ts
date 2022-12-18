import { MongoClient } from 'mongodb';

const connectToDatabase = async () =>
  new MongoClient(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@fyp.mh5cfml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );

export default connectToDatabase;
