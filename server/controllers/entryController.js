import db from '../models/dummy-db';

export default class EntryController {
  static addEntry(req, res) {
    const {
      title, category, image, story
    } = req.body;

    const newEntry = {
      id: db.entry[db.entry.length - 1].id + 1,
      title,
      category,
      image,
      story
    };

    const entryfound = db.entry.find(entry => entry.title.toLowerCase() === title.toLowerCase());
    if (entryfound) {
      return res.status(409).json({
        status: 'error',
        message: 'Entry already exists'
      });
    }

    db.entry.push(newEntry);
    return res.status(201).json({
      status: 'success',
      message: 'Entry saved successfully',
      entry: newEntry
    });
  }
}
