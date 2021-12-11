const express = require('express')

const router = express.Router()
const {
  createCollection,
  deleteCollection,
  getCollectionByUser,
  updateCollection,
} = require('../controllers/collections')

router.route('/').post(createCollection).get(getCollectionByUser)

router.route('/:id').delete(deleteCollection).patch(updateCollection)

module.exports = router
