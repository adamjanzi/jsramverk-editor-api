/**
 * Connect to the database and search using a criteria.
 */
 "use strict";

 // MongoDB
var express = require('express');
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb+srv://texteditor:texteditorpass@cluster0.ex7zi.mongodb.net/editor?retryWrites=true&w=majority";
var router = express.Router();



 // Return a JSON object with list of all documents within the collection.
 router.get("/", async (request, response) => {
    try {
        let res = await findInCollection(dsn, "docs", {}, {}, 0);

        response.json(res);
    } catch (err) {
        console.log(err);
        response.json(err);
    }
});

 /**
  * Find documents in an collection by matching search criteria.
  *
  * @async
  *
  * @param {string} dsn        DSN to connect to database.
  * @param {string} colName    Name of collection.
  * @param {object} criteria   Search criteria.
  * @param {object} projection What to project in results.
  * @param {number} limit      Limit the number of documents to retrieve.
  *
  * @throws Error when database operation fails.
  *
  * @return {Promise<array>} The resultset as an array.
  */
  async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}

module.exports = router;