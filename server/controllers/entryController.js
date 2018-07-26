import { Client } from 'pg';
import config from '../config/config';

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

    const findentryquery = {
      text: 'SELECT * FROM entries WHERE userId = $1 AND title = $2',
      values: [userId, title.trim().toLowerCase()]
    };

    client.query(findentryquery, (err, entryfound) => {
      if (entryfound.rowCount !== 0) {
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
}
