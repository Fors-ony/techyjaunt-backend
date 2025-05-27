import Produce from '../models/produce.model.js';
/**
 * @desc Save a new produce to the database
 * @param {Object} produceData - all fields to store
 */

export const createProduceService = async (produceData) => {
  return await Produce.create(produceData);
};
