import { Client } from 'pg';
import config from '../config/config';
import confirmUpdateDate from '../helpers/index';

require('dotenv').config();

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
          message: 'Entry already exists'
        });
      }

      const newEntryquery = `INSERT INTO entries(title, category, image, story, userId) VALUES('${title}', '${category}', '${image}', '${story}', ${userId}) RETURNING *`;

      client.query(newEntryquery, (error, createdEntry) => {
        client.end();
        return res.status(201).json({
          status: 'success',
          message: 'Entry saved successfully',
          entry: {
            title: createdEntry.rows[0].title,
            category: createdEntry.rows[0].category,
            image: createdEntry.rows[0].entry,
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
      if (entryFound.rowCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Entry not found'
        });
      }

      const { createdat } = entryFound.rows[0];
      const today = new Date();
      if (!confirmUpdateDate(createdat, today, 'day')) {
        return res.status(400).json({
          status: 'error',
          message: 'Entry cannot be updated anymore'
        });
      }

      const updateEntryQuery = `UPDATE entries SET title = '${title}', category = '${category}', image = '${image}', story = '${story}' WHERE id = ${entryId} AND userId = ${userId} RETURNING *`;
      client.query(updateEntryQuery, (error, updatedEntry) => {
        client.end();
        return res.json({
          status: 'success',
          message: 'Entry updated successfully',
          updated_entry: {
            title: updatedEntry.rows[0].title,
            category: updatedEntry.rows[0].category,
            image: updatedEntry.rows[0].entry,
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
          message: 'Entry not found'
        });
      }

      const deleteEntryQuery = `DELETE FROM entries WHERE userId = ${userId} AND id = ${entryId}`;
      client.query(deleteEntryQuery, (error, result) => {
        client.end();
        return res.status(200).json({
          status: 'success',
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
          message: 'No entry available'
        });
      }

      return res.json({
        status: 'success',
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
          message: 'Entry not found'
        });
      }

      return res.json({
        status: 'success',
        message: 'Entry reterived',
        entry: {
          title: entryFound.rows[0].title,
          category: entryFound.rows[0].category,
          image: entryFound.rows[0].image,
          story: entryFound.rows[0].story
        }
      });
    });
  }
}
