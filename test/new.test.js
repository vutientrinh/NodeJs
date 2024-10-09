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

describe("findAll function", () => {
  let req, res;

  beforeEach(() => {
    // Create mock request and response objects using node-mocks-http
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    jest.clearAllMocks(); // Clear any previous mocks
  });

  test("should return all notes", async () => {
    // Mocking Note.find to resolve with some sample notes
    const mockNotes = [
      { title: "Note 1", content: "Content 1" },
      { title: "Note 2", content: "Content 2" },
    ];

    Note.find.mockResolvedValue(mockNotes); // Mock the database call

    // Call the controller
    await findAll(req, res);

    // Assertions
    const responseData = res._getData(); // Get data from the response
    expect(res.statusCode).toBe(200); // Check status code
    expect(responseData).toEqual(mockNotes); // Check if returned data matches the mock
  });

  test("should handle errors", async () => {
    // Mocking Note.find to throw an error
    const errorMessage = "Database error";
    Note.find.mockRejectedValue(new Error(errorMessage)); // Simulate a rejected promise

    // Spy on console.error to check if it gets called
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Call the controller
    await findAll(req, res);

    // Assertions
    expect(consoleSpy).toHaveBeenCalledWith(new Error(errorMessage)); // Check if error was logged
    consoleSpy.mockRestore(); // Restore console after the test
  });
});
