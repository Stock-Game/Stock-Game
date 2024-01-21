const mongoose = require('mongoose');
const express = require('express');
// const { stringify } = require('querystring');
const Schema = mongoose.Schema;

//make a separate file for other schemas

const portfolioSchema = new Schema({
  ticker: { type: String, required: true },
  priceBought: { type: Number, required: true },
  dateBought: { type: Date, default: Date.now },
  shares: { type: Number, required: true },
  totalCost: { type: Number, required: true }, //this.priceBought*this.shares //or {type: Date, default: this.priceBought*this.shares}??
});

module.exports = mongoose.model('portfolio', portfolioSchema);
