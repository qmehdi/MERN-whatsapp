import mongoose from 'mongoose';

// Set up the MongoDB Schema
const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

// Set up the MongoDB Collection with the Schema
export default mongoose.model('messageContent', whatsappSchema)

