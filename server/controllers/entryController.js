import db from '../models/dummy-db';

export default class EntryController {
  static addEntry(req, res) {
    const {
      title, category, image, story
    } = req.body;
    const dbLength = db.entry.length;
    const id = (dbLength >= 1) ? db.entry[dbLength - 1].id + 1 : 1;

    const newEntry = {
      id, title, category, image, story
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

  static updateEntry(req, res) {
    const entryId = parseInt(req.params.id, 10);
    const {
      title, category, image, story
    } = req.body;

    const oldEntryIndex = db.entry.findIndex(entry => entry.id === entryId);

    if (oldEntryIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Entry not found'
      });
    }

    const updatedEntry = {
      id: entryId,
      title,
      category,
      image,
      story
    };

    db.entry.splice(oldEntryIndex, 1, updatedEntry);
    return res.json({
      status: 'success',
      message: 'Entry updated successfully',
      updated_entry: updatedEntry
    });
  }

  static deleteEntry(req, res) {
    const entryId = parseInt(req.params.id, 10);

    const oldEntryIndex = db.entry.findIndex(entry => entry.id === entryId);

    if (oldEntryIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Entry not found'
      });
    }

    db.entry.splice(oldEntryIndex, 1);
    return res.json({
      status: 'success',
      message: 'Entry deleted successfully',
    });
  }

  static getAllEntries(req, res) {
    const dbLength = db.entry.length;

    if (dbLength < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'No entry available'
      });
    }

    return res.json({
      status: 'success',
      message: 'All entries',
      entries: db.entry
    });
  }

  static getEntry(req, res) {
    const entryId = parseInt(req.params.id, 10);

    const entryfound = db.entry.filter(entry => entry.id === entryId);
    if (entryfound.length < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Entry does not exist'
      });
    }

    return res.json({
      status: 'success',
      message: 'Entry reterived',
      entry: entryfound
    });
  }
}
