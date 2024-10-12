const Note = require("../models/note.model.js");

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  const note = new Note({
    title: req.body.title || "Untitled note",
    content: req.body.content,
  });

  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred while retrieving notes.",
      });
    });
};

exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({ message: "Dont have!!!" });
      }
      res.send(note);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Note.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.content) {
    return res.status(404).send({ message: "Content can not be empty!!!" });
  }
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Cannot find a note with id: " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error update note with id: " + req.params.noteId,
      });
    });
};

exports.deleteNote = (req, res) => {
  Note.findByIdAndDelete(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Cannot find a note with id: " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting note with id: " + req.params.noteId,
      });
    });
};
