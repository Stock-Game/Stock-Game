const subject = require('../controllers/portfolioController.js');
const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, './portfolios.test.json');

describe('portfolioController', () => {
  // dependencies: model.find, doc.save, model.create, req, res, next
  // need to add param model = model to portfolioController middleware funcs to test if model methods called
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
  const mockData = {
    ticker: 'BABA',
    priceBought: 100,
    dateBought: new Date(),
    shares: 10,
    totalCost: 1000,
    save: jest.fn(),
  };
  const mockModel = {
    create: jest.fn(() => 'mock portfolio'),
    deleteOne: jest.fn(),
  };

  afterEach(() => {
    fs.writeFileSync(testJsonFile, JSON.stringify([]));
  });

  xdescribe('portfolioController.buy', () => {
    mockModel.find = jest.fn(() => []);
    const mockRes = { locals: {} };
    const mockNext = jest.fn();

    it('should call model.find', () => {
      subject.buy(mockReq, mockRes, mockNext, mockModel);
      expect(mockModel.find).toHaveBeenCalled();
    });
    it('should not change the request', () => {
      const reqPreBuy = { ...mockReq };
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
        expect(mockRes.locals.buy.priceBought).toEqual(
          mockReq.body.priceBought
        );
      });
    });
  });
  xdescribe('portfolioController.sell', () => {
    mockModel.find = jest.fn(() => [mockReq.body]);
    const mockRes = { locals: {} };
    const mockNext = jest.fn((err) => err);

    it('should call model.find', () => {
      subject.sell(mockReq, mockRes, mockNext, mockModel);
      expect(mockModel.find).toHaveBeenCalled();
    });
    it('should not change the request', () => {
      const reqPreSell = { ...mockReq };
      subject.sell(mockReq, mockRes, mockNext, mockModel);
      expect(mockReq).toEqual(reqPreSell);
    });
    it('should call next', () => {
      subject.sell(mockReq, mockRes, mockNext, mockModel);
      expect(mockNext).toHaveBeenCalled();
    });
    afterEach(() => {
      fs.writeFileSync(testJsonFile, JSON.stringify([]));
    });

    xdescribe('updating existing portfolio', () => {
      beforeEach(() => {
        mockData.shares = 10;
        mockData.totalCost = 1000;
        mockModel.find = jest.fn(() => [mockData]);
      });
      it('should call doc.save', async () => {
        // mockReq.body.shares = 1;
        await subject.sell(mockReq, mockRes, mockNext, mockModel);
        expect(mockData.save).toHaveBeenCalled();
      });
      it('should add a portfolio to locals', async () => {
        await subject.sell(mockReq, mockRes, mockNext, mockModel);
        expect(mockRes.locals.sell).toBeTruthy;
      });

      describe('if req shares less than saved portfolio shares', () => {
        it('portfolio should have updated shares', async () => {
          await subject.sell(mockReq, mockRes, mockNext, mockModel);
          expect(mockRes.locals.sell.shares).toEqual(6);
        });
        it('portfolio should have updated totalCost', async () => {
          const totalCostPreSell = mockData.totalCost;
          await subject.sell(mockReq, mockRes, mockNext, mockModel);
          expect(mockData.totalCost).toBeLessThan(totalCostPreSell);
        });
      });
      describe('if req shares same as saved portfolio shares', () => {
        it('should call deleteOne', async () => {
          await subject.sell(mockReq, mockRes, mockNext, mockModel);
          expect(mockModel.deleteOne).toHaveBeenCalled();
        });
      });
      describe('if req shares > saved portfolio shares', () => {
        beforeEach(() => {
          mockReq.body.shares = 15;
        });
        xit('should throw error on next', async () => {
          await subject.sell(mockReq, mockRes, mockNext, mockModel);
          expect(mockNext).toHaveBeenCalled();
        });
      });
    });
  });
});
