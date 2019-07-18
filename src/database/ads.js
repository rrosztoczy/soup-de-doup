const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'ads';

async function insertAd(ad) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(ad);
  return insertedId;
}

async function updateAd(id, ad) {
  const database = await getDatabase();
  delete ad._id;
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...ad,
      },
    },
  );
}

async function deleteAd(id) {
  const database = await getDatabase();
  const {deletedId} = await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
  return deletedId;
}

async function getAds() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  deleteAd,
  updateAd,
  insertAd,
  getAds,
};