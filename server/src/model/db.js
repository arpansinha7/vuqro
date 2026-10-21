import mongoose from 'mongoose';
import validator from 'validator';

const urlSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },

    longUrl: {
        type: String,
        validate: {
            validator: (value) => validator.isURL(value, {
                protocols: ['http', 'https'],
                require_protocol: true,
                require_tld: true
            }),
            message: 'Please provide a valid URL'
        },
        required: true,
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const db = mongoose.model('url', urlSchema);
export default db;