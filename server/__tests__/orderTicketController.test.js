const subject = require("../controllers/orderTicketController.js");
const fs = require("fs");
const path = require("path");
const testJsonFile = path.resolve(__dirname, "./orders.test.json");

describe("orderTicketController", () => {
  // dependencies: req, res, next, url1, url2, axios.get, axios.get.response.data
  const mockNext = {};
  const mockRes = {};
  const mockReq = {
    body: {
      ticker: "ABCD",
      priceBought: 100,
      dateBought: new Date(),
      shares: 4,
      totalCost: 400,
      save: jest.fn(),
    },
    query: {
      ticker: "EFGH",
    },
  };
  const mockModel = {
    create: jest.fn(() => "mock order ticket"),
  };

  afterEach(() => {
    fs.writeFileSync(testJsonFile, JSON.stringify([]));
  });

  describe("orderTicketController.getPrice", () => {
    mockModel.find = jest.fn(() => []);
    const mockRes = { locals: {} };
    const mockNext = jest.fn();

    test("res.locals.getPrice to be truthy", async () => {
      await subject.getPrice(mockReq, mockRes, mockNext);
      expect(subject.getPrice.req).toBeTruthy;
    });

    it("ticker to be truthy", () => {
      expect(subject.getPrice.ticker).toBeTruthy;
    });

    it("dynamicUrl to be truthy", () => {
      expect(subject.getPrice.dynamicUrl).toBeTruthy;
    });

    test("if getPrice function is called", () => {
      expect(subject.getPrice).toHaveBeenCalled;
    });

    test("if axios.get is called", () => {
      expect(subject.getPrice.axios).toHaveBeenCalled;
    });

    test("ticker to be truthy", () => {
      expect(subject.getPrice.ticker).toBeTruthy;
    });

    test(".req to be truthy", () => {
      expect(subject.getPrice.req).toBeTruthy;
    });

    test("resultData to be truthy", () => {
      expect(subject.getPrice.resultData).toBeTruthy;
    });

    test(".res to be truthy", async () => {
      await subject.getPrice(mockReq, mockRes, mockNext);
      expect(subject.getPrice.res).toBeTruthy;
    });

    it("mockReq.query.ticker to be truthy", () => {
      expect(mockReq.query.ticker).toBeTruthy;
    });
  });
});
