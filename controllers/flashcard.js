const Flashcard = require('../models/flashcard')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllFlashCard = async (req, res) => {
  const flashcards = await Flashcard.find({ createdBy: req.user.userId, }).sort('createdAt')
  res.status(StatusCodes.OK).json({ flashcards, count: flashcards.length })
}

const getAllFlashCardByCollection = async (req, res) => {
  const flashcards = await Flashcard.find({ createdBy: req.user.userId, collectionID: req.params.id }).sort('createdAt')
  res.status(StatusCodes.OK).json({ flashcards, count: flashcards.length })
}

const createFlashCard = async (req, res) => {
  req.body.createdBy = req.user.userId
  req.body.collectionID = req.params.id
  const flashCard = await Flashcard.create(req.body)
  res.status(StatusCodes.CREATED).json({ flashCard })
}

const updateFlashCard = async (req, res) => {
  const {
    body: { question, answer },
    user: { userId },
    params: { id: fshId },
  } = req

  if (question === '' ) {
    throw new BadRequestError('question field cannot be empty')
  }
  const flashCard = await Flashcard.findByIdAndUpdate(
    { _id: fshId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!flashCard) {
    throw new NotFoundError(`No flashcard with id ${fshId}`)
  }
  res.status(StatusCodes.OK).json({ flashCard })
}

const deleteFlashCard = async (req, res) => {
  const {
    user: { userId },
    params: { id: ctnId },
  } = req

  const flashcard = await Flashcard.findByIdAndRemove({
    _id: ctnId,
    createdBy: userId,
  })
  if (!flashcard) {
    throw new NotFoundError(`No collection with id ${ctnId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createFlashCard,
  deleteFlashCard,
  getAllFlashCard,
  updateFlashCard,
  getAllFlashCardByCollection,
}
