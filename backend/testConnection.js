const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL; 

async function run() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Bağlantı başarılı!");
  } catch (e) {
    console.error("Bağlantı hatası:", e);
  } finally {
    await client.close();
  }
}

run();
