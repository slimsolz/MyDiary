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
}
