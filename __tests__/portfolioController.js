import subject from '../server/controllers/portfolioController.js';
const fs = require('fs');
const path = require('path');

describe('portfolioController', () => {
  // dependencies: model.find, model.save, model.create, req, res, next
  // look at unit-12 db
  const mockModel = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  }

  describe('portfolioController.buy', () => {
    const mockRequest = {
      body: {
        ticker: 'BABA',
        priceBought: 100,
        dateBought: new Date(),
        shares: 4,
        totalCost: 400,
      },
    };
    const mockResponse = {};
    const mockNext = jest.fn();
    

    it('should ')
  });
});
