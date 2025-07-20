// exportData.js
import { MongoClient } from 'mongodb';
import fs from 'fs';

const uri = 'mongodb://localhost:27017';
const dbName = 'blogdb';
const collectionName = 'Blog'; // change if your collection name is different

async function exportData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();

    // Remove _id if you want to use this as seed data
    const cleanedData = data.map(({ _id, ...rest }) => rest);

    fs.writeFileSync('seed.json', JSON.stringify(cleanedData, null, 2));

    console.log(`✅ Exported ${cleanedData.length} documents to seed.json`);
  } catch (error) {
    console.error('❌ Error exporting data:', error);
  } finally {
    await client.close();
  }
}

exportData();