const express = require('express')

const router = express.Router()
const {
  createFlashCard,
  deleteFlashCard,
  getAllFlashCard,
  updateFlashCard,
  getAllFlashCardByCollection,
} = require('../controllers/flashcard')

router.route('/').get(getAllFlashCard)

router.route('/:id').post(createFlashCard).get(getAllFlashCardByCollection).delete(deleteFlashCard).patch(updateFlashCard)

module.exports = router
