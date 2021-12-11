                                                                                              
const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'please provide a name'],
            maxlength: 20
        },
         createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
 
    },
    {timestamps: true }
)

module.exports = mongoose.model('Collection', CollectionSchema)
