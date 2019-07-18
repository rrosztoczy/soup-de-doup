const {getDatabase} = require('./mongo');

const collectionName = 'ads';

async function insertAd(ad) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(ad);
  return insertedId;
}

async function updateAd(ad, id) {
  const database = await getDatabase();
  const {updatedId} = await database.collection(collectionName).updateOne(ad, id);
  return updatedId;
}

async function deleteAd(ad, id) {
  const database = await getDatabase();
  const {deletedId} = await database.collection(collectionName).deleteOne(ad, id);
  return deletedId;
}

async function getAds() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  deleteAd,
  insertAd,
  getAds,
};