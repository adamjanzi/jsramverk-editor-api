/**
 * Connect to the database and search using a criteria.
 */
 "use strict";

 // MongoDB
var express = require('express');
const mongo = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dsn = "mongodb+srv://texteditor:texteditorpass@cluster0.ex7zi.mongodb.net/editor?retryWrites=true&w=majority";
var router = express.Router();

router.get('/', (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };
    
    res.json(data);
});

router.post("/", async (req, res) => {
    const doc = {
        name: req.body.name,
        content: req.body.content
    };
    try {
        await createDocument(dsn, "docs", doc);
    
    } catch (err) {
        console.log(err);
    }

});
router.put("/", async (req, res) => {
    const filter = { _id: ObjectId(req.body["_id"]) };
    const doc = { $set:
        {
            name: req.body.name,
            content: req.body.content
        }
        
    };

    try {
        await updateDocument(dsn, "docs", filter, doc);

    } catch (err) {
        console.log(err);
    }
});

/**
* Reset a collection by removing existing content and insert a default
* set of documents.
*
* @async
*
* @param {string} dsn     DSN to connect to database.
* @param {string} colName Name of collection.
* @param {string} doc     Documents to be inserted into collection.
*
* @throws Error when database operation fails.
*
* @return {Promise<void>} Void
*/
async function createDocument(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    await col.insertOne(doc);
    await client.close();
}

 /**
  * Reset a collection by removing existing content and insert a default
  * set of documents.
  *
  * @async
  *
  * @param {string} dsn     DSN to connect to database.
  * @param {string} colName Name of collection.
  * @param {string} doc     Documents to be inserted into collection.
  *
  * @throws Error when database operation fails.
  *
  * @return {Promise<void>} Void
  */
  async function updateDocument(dsn, colName, filter, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    await col.updateOne(filter, doc);

    await client.close();
}

module.exports = router;