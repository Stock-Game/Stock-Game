const subject = require('../controllers/portfolioController.js');
const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, './portfolios.test.json');

describe('portfolioController', () => {
  // dependencies: model.find, doc.save, model.create, req, res, next
  // look at unit-12 db
  const mockReq = {
    body: {
      ticker: 'BABA',
      priceBought: 100,
      dateBought: new Date(),
      shares: 4,
      totalCost: 400,
      save: jest.fn(),
    },
  };
  const mockModel = {
    create: jest.fn(() => 'mock portfolio'),
  };

  afterEach(() => {
    fs.writeFileSync(testJsonFile, JSON.stringify([]));
  });

  describe('portfolioController.buy', () => {
    mockModel.find = jest.fn(() => []);
    const mockRes = { locals: {} };
    const mockNext = jest.fn();

    it('should call model.find', () => {
      subject.buy(mockReq, mockRes, mockNext, mockModel);
      expect(mockModel.find).toHaveBeenCalled();
    });
    it('should not change the request', () => {
      const reqPreBuy = mockReq;
      subject.buy(mockReq, mockRes, mockNext, mockModel);
      expect(mockReq).toEqual(reqPreBuy);
    });
    afterEach(() => {
      fs.writeFileSync(testJsonFile, JSON.stringify([]));
    });

    describe('creating new portfolio', () => {
      beforeEach(() => {
        fs.writeFileSync(testJsonFile, JSON.stringify([]));
        // mockModel.find = jest.fn(() => []);
      });
      it('should call model.create when no ticket found', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockModel.create).toHaveBeenCalled();
      });
      it('should add that new portfolio onto res.locals.buy', async () => {
        await subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockRes.locals.buy).toEqual('mock portfolio');
      });
    });

    describe('updating existing portfolio', () => {
      beforeEach(() => {
        fs.writeFileSync(testJsonFile, JSON.stringify([mockReq.body]));
        mockModel.find = jest.fn(() => [mockReq.body]);
      });
      it('should call doc.save', async () => {
        await subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockReq.body.save).toHaveBeenCalled();
      });
      it('should add a portfolio to locals', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockRes.locals.buy).toBeTruthy;
      });
      it('portfolio should have updated shares', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockRes.locals.buy.shares).toEqual(mockReq.body.shares);
      });
      it('portfolio should have updated totalCost', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockRes.locals.buy.totalCost).toEqual(mockReq.body.totalCost);
      });
      it('portfolio should have updated priceBought', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockRes.locals.buy.priceBought).toEqual(mockReq.body.priceBought);
      });
    });
  });
});
