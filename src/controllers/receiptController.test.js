const { processReceipt, getPoints } = require("./receiptController");
const { v4: uuidv4 } = require("uuid");

// Mock the uuidv4 function to return a consistent ID
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("Receipt Controller", () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      body: {
        retailer: "Test Mart",
        purchaseDate: "2023-09-15",
        purchaseTime: "11:33",
        items: [
          { shortDescription: "Item 1", price: "5.00" },
          { shortDescription: "Item 2", price: "15.00" },
        ],
        total: "20.05",
      },
      params: {
        id: "mocked-uuid",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("processReceipt", () => {
    it("should process the receipt and return an id", () => {
      processReceipt(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: "mocked-uuid" });
    });
  });

  describe("getPoints", () => {
    it("should return the points for the given receipt id", () => {
      // First, process a receipt to store it in memory
      processReceipt(req, res);

      // Then, call getPoints to retrieve the points
      getPoints(req, res);
      expect(res.json).toHaveBeenCalledWith({ points: expect.any(Number) });
    });

    it("should return 404 if receipt id is not found", () => {
      req.params.id = "non-existent-id";
      getPoints(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Receipt not found" });
    });
  });
});
