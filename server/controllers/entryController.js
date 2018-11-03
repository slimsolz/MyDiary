import dotenv from 'dotenv';
import { Client } from 'pg';
import config from '../config/config';
import Helper from '../helpers/index';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const connectionString = config[env];

export default class EntryController {
  static addEntry(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const { userId } = req;
    const {
      title, category, image, story
    } = req.body;

    const findEntryQuery = {
      text: 'SELECT * FROM entries WHERE userId = $1 AND title = $2',
      values: [userId, title.trim().toLowerCase()]
    };

    client.query(findEntryQuery, (err, entryFound) => {
      if (entryFound.rowCount !== 0) {
        return res.status(409).json({
          status: 'error',
          code: 409,
          message: 'Entry already exists'
        });
      }

      const newEntryquery = `INSERT INTO entries(title, category, image, story, userId) VALUES('${title}', '${category}', '${image}', '${story}', ${userId}) RETURNING *`;

      client.query(newEntryquery, (error, createdEntry) => {
        client.end();
        return res.status(201).json({
          status: 'success',
          code: 201,
          message: 'Entry saved successfully',
          entry: {
            id: createdEntry.rows[0].id,
            title: createdEntry.rows[0].title,
            category: createdEntry.rows[0].category,
            image: createdEntry.rows[0].image,
            story: createdEntry.rows[0].story
          }
        });
      });
    });
  }

  static updateEntry(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const entryId = parseInt(req.params.id, 10);
    const { userId } = req;
    const {
      title, category, image, story
    } = req.body;

    const findEntryQuery = {
      text: 'SELECT * FROM entries WHERE id = $1 AND userId = $2',
      values: [entryId, userId]
    };

    client.query(findEntryQuery, (err, entryFound) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: `Find Query before update ${err}`
        });
      }

      if (entryFound.rowCount === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Entry not found'
        });
      }

      const { createdat } = entryFound.rows[0];
      const today = new Date();
      if (!Helper.confirmUpdateDate(createdat, today)) {
        return res.status(403).json({
          status: 'error',
          code: 403,
          message: 'Entry cannot be updated anymore'
        });
      }

      const updateEntryQuery = `UPDATE entries SET title = '${title}', category = '${category}', image = '${image}', story = '${story}' WHERE id = ${entryId} AND userId = ${userId} RETURNING *`;
      client.query(updateEntryQuery, (error, updatedEntry) => {
        if (error) {
          return res.status(500).json({
            status: 'error',
            message: `Update query ${error}`
          });
        }
        client.end();
        return res.json({
          status: 'success',
          code: 200,
          message: 'Entry updated successfully',
          updated_entry: {
            id: updatedEntry.rows[0].id,
            title: updatedEntry.rows[0].title,
            category: updatedEntry.rows[0].category,
            image: updatedEntry.rows[0].image,
            story: updatedEntry.rows[0].story
          }
        });
      });
    });
  }

  static deleteEntry(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const entryId = parseInt(req.params.id, 10);
    const { userId } = req;

    const findEntryQuery = {
      text: 'SELECT * FROM entries WHERE id = $1 AND userId = $2',
      values: [entryId, userId]
    };

    client.query(findEntryQuery, (err, entryFound) => {
      if (entryFound.rowCount === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Entry not found'
        });
      }

      const deleteEntryQuery = `DELETE FROM entries WHERE userId = ${userId} AND id = ${entryId}`;
      client.query(deleteEntryQuery, (error, result) => {
        client.end();
        return res.status(200).json({
          status: 'success',
          code: 200,
          message: `${result.rowCount} entry deleted`
        });
      });
    });
  }

  static getAllEntries(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const { userId } = req;

    const getEntryQuery = {
      text: 'SELECT * FROM entries WHERE userId = $1',
      values: [userId]
    };

    client.query(getEntryQuery, (err, entriesFound) => {
      if (entriesFound.rowCount === 0) {
        return res.status(200).json({
          status: 'success',
          code: 200,
          message: 'No entry available'
        });
      }

      return res.json({
        status: 'success',
        code: 200,
        message: 'All entries',
        entries: entriesFound.rows
      });
    });
  }

  static getEntry(req, res) {
    const client = new Client(connectionString);
    client.connect();
    const entryId = parseInt(req.params.id, 10);
    const { userId } = req;

    const findEntryQuery = {
      text: 'SELECT * FROM entries WHERE id = $1 AND userId = $2',
      values: [entryId, userId]
    };

    client.query(findEntryQuery, (err, entryFound) => {
      if (entryFound.rowCount === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Entry not found'
        });
      }

      return res.json({
        status: 'success',
        code: 200,
        message: 'Entry reterived',
        entry: {
          id: entryFound.rows[0].id,
          title: entryFound.rows[0].title,
          category: entryFound.rows[0].category,
          image: entryFound.rows[0].image,
          story: entryFound.rows[0].story
        }
      });
    });
  }
}
