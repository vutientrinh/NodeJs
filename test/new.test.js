const { findOne } = require("../app/controller/note.controller");
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
