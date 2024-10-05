module.exports = (app) => {
    const notes = require('../controller/note.controller');

    app.post('/notes', notes.create);

    app.get('/notes', notes.findAll);

    app.get('/notes/:noteId', notes.findOne);
}