const { findOne } = require("../app/controller/note.controller");
const { findAll } = require("../app/controller/note.controller");
const { update } = require("../app/controller/note.controller");
const { deleteNote } = require("../app/controller/note.controller");

const Note = require("../app/models/note.model"); // Assuming Note is your mongoose model

jest.mock("../app/models/note.model"); // Mock the Note model

describe("findOne note controller", () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      params: {
        noteId: "12", // Mocked note ID
      },
    };

    res = {
      status: jest.fn().mockReturnThis(), // Allows res.status().send()
      send: jest.fn(),
    };
  });

  test("should return 404 if note is not found", async () => {
    // Mock the findById function to resolve with null (note not found)
    Note.findById.mockResolvedValue(null);

    await findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Dont have!!!",
    });
  });

  test("should return the note if it is found", async () => {
    const mockNote = {
      _id: "12345",
      title: "Test Note",
      content: "This is a test note",
    };

    // Mock the findById function to resolve with the note object
    Note.findById.mockResolvedValue(mockNote);

    await findOne(req, res);

    expect(res.send).toHaveBeenCalledWith(mockNote);
  });
});

describe("findAll notes controller", () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {}; // No params needed for findAll

    res = {
      status: jest.fn().mockReturnThis(), // Allows res.status().send()
      send: jest.fn(),
    };
  });

  test("should return all notes", async () => {
    const mockNotes = [
      { _id: "1", title: "Note 1", content: "Content for note 1" },
    ];

    // Mock the find method of Note model to resolve with the mock notes
    Note.find = jest.fn().mockResolvedValue(mockNotes);

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith(mockNotes);
  });

  test("should return an empty array if no notes are found", async () => {
    // Mock the find method to resolve with an empty array
    Note.find = jest.fn().mockResolvedValue([]);

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith([]);
  });
});
describe("update note controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { noteId: "1" }, // Mock note ID
      body: { title: "Updated Note", content: "Updated content" }, // Mock body
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test("should return 404 if content is missing", async () => {
    req.body.content = ""; // Empty content

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Content can not be empty!!!",
    });
  });

  test("should update the note successfully", async () => {
    const mockNote = {
      _id: "1",
      title: "Updated Note",
      content: "Updated content",
    };

    jest.spyOn(Note, "findByIdAndUpdate").mockResolvedValue(mockNote);

    await update(req, res);

    expect(res.send).toHaveBeenCalledWith(mockNote);
  });

  test("should return 404 if note is not found", async () => {
    jest.spyOn(Note, "findByIdAndUpdate").mockResolvedValue(null); // Simulate note not found

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Cannot find a note with id: 1",
    });
  });
});

describe("delete note controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { noteId: "1" }, // Mock note ID
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test("should delete the note successfully", async () => {
    const mockNote = {
      _id: "1",
      title: "Note to delete",
      content: "Some content",
    };

    jest.spyOn(Note, "findByIdAndDelete").mockResolvedValue(mockNote);

    await deleteNote(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "Note deleted successfully!",
    });
  });

  test("should return 404 if note is not found", async () => {
    jest.spyOn(Note, "findByIdAndDelete").mockResolvedValue(null); // Simulate note not found

    await deleteNote(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Cannot find a note with 1",
    });
  });
});
