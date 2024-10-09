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

// describe("create note controller", () => {
//   let req, res;

//   beforeEach(() => {
//     // Mock request and response objects
//     req = {
//       body: {
//         title: "trinh",
//         content: "Vutientrinh",
//       },
//     };

//     res = {
//       status: jest.fn().mockReturnThis(), // to allow res.status().send()
//       send: jest.fn(),
//     };
//   });

//   test("should return 400 if content is missing", () => {
//     req.body = { title: "trinh" }; // content is missing

//     create(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({
//       message: "Note content can not be empty",
//     });
//   });

//   test("should save and return the note if content is provided", async () => {
//     req.body = { title: "Test Note", content: "This is a test note" };

//     // Mock the save function to resolve with a note object
//     const saveMock = jest.fn().mockResolvedValue({
//       _id: "12345",
//       title: "Test Note",
//       content: "This is a test note",
//     });

//     Note.mockImplementation(() => ({
//       save: saveMock,
//     }));

//     await create(req, res);

//     expect(res.send).toHaveBeenCalledWith({
//       _id: "12345",
//       title: "Test Note",
//       content: "This is a test note",
//     });
//   });

//   test("should return 500 if an error occurs during save", async () => {
//     req.body = { title: "Test Note", content: "This is a test note" };

//     // Mock the save function to reject with an error
//     const saveMock = jest.fn().mockRejectedValue(new Error("Save failed"));

//     Note.mockImplementation(() => ({
//       save: saveMock,
//     }));

//     await create(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith({
//       message: "Save failed",
//     });
//   });
// });
