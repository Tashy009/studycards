 
const mongoose = require('mongoose')

const FlashCardSchema = new mongoose.Schema(
    {
        question:{
            type: String,
            required: [true, 'please provide a question'],
        },
        answer:{
            type: String,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
        collectionID: {
            type: mongoose.Types.ObjectId,
            ref: 'Collection',
            required: [true, 'Please provide collection name'],
        },
    },
    {timestamps: true }
)

module.exports = mongoose.model('FlashCard', FlashCardSchema)
