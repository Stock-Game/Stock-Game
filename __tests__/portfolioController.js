const subject = require('../server/controllers/portfolioController.js');
const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, './portfolios.test.json');

describe('portfolioController', () => {
  // dependencies: model.find, model.save, model.create, req, res, next
  // look at unit-12 db
  const mockModel = {
    find: jest.fn(() => {
      return JSON.parse(fs.readFileSync(testJsonFile));
    }),
    save: jest.fn(),
    create: jest.fn(),
  };

  describe('portfolioController.buy', () => {
    const mockReq = {
      body: {
        ticker: 'BABA',
        priceBought: 100,
        dateBought: new Date(),
        shares: 4,
        totalCost: 400,
      },
    };
    const mockRes = {};
    const mockNext = jest.fn();

    it('should call model.find', () => {
      subject.buy(mockReq, mockRes, mockNext, mockModel);
      expect(mockModel.find).toHaveBeenCalled();
    });

    describe('creating new portfolio', () => {
      beforeEach(() => {
        fs.writeFileSync(testJsonFile, JSON.stringify([]));
      });
      it('should not change the request', () => {
        const reqPreBuy = mockReq;
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockReq).toEqual(reqPreBuy);
      });
      it('should call model.create when no ticket found', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
        expect(mockModel.create).toHaveBeenCalled();
      });
      xit('should create new portfolio into db when no ticket found', () => {
        subject.buy(mockReq, mockRes, mockNext, mockModel);
      });
      xit('should add that new portfolio onto res.locals.buy', () => {});
    });
  });
});
