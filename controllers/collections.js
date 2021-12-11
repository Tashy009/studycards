const Collection = require("../models/collections");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getCollectionByUser = async (req, res) => {
  const collections = await Collection.find({
    createdBy: req.user.userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ collections, count: collections.length });
};

const createCollection = async (req, res) => {
  const check = await Collection.find({
    name: req.body.name,
    createdBy: req.user.userId,
  });
  if (check.length > 0) {
    throw new BadRequestError("A collection with this name already exists");
  }
  req.body.createdBy = req.user.userId;
  const collection = await Collection.create(req.body);
  res.status(StatusCodes.CREATED).json({ collection });
};

const deleteCollection = async (req, res) => {
  const {
    user: { userId },
    params: { id: ctnId },
  } = req;

  const collection = await Collection.findByIdAndRemove({
    _id: ctnId,
    createdBy: userId,
  });
  if (!collection) {
    throw new NotFoundError(`No collection with id ${ctnId}`);
  }
  res.status(StatusCodes.OK).send();
};

const updateCollection = async (req, res) => {
  const {
    body: { name },
    user: { userId },
    params: { id: collectionId },
  } = req;

  if (name === "") {
    throw new BadRequestError("Name fields cannot be empty");
  }
  const collection = await Collection.findByIdAndUpdate(
    { _id: collectionId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!collection) {
    throw new NotFoundError(`No collection with id ${collectionId}`);
  }
  res.status(StatusCodes.OK).json({ collection });
};

module.exports = {
  createCollection,
  deleteCollection,
  getCollectionByUser,
  updateCollection,
};
