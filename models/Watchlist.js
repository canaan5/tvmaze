const mongoose = require('mongoose');
const {Schema} = mongoose;

const watchlistSchema = new Schema({
    id: Number,
    name: String,
    rating: String,
    date: String,
    image: String,
});

mongoose.model('watchlist', watchlistSchema);
