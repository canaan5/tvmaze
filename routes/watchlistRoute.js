const mongoose = require('mongoose');
const Watchlist = mongoose.model('watchlist');

module.exports = (app) => {

    app.get(`/api/watchlist`, async (req, res) => {
        let watchlist = await Watchlist.find();
        return res.status(200).send(watchlist);
    });

    app.post(`/api/watchlist`, async (req, res) => {
        let watchlist = await Watchlist.create(req.body);
        return res.status(201).send({
            error: false,
            watchlist
        });
    });

    app.put(`/api/watchlist/:id`, async (req, res) => {
        const {id} = req.params;

        let item = await Watchlist.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            item
        });

    });

    app.delete(`/api/watchlist/:id`, async (req, res) => {
        const {id} = req.params;

        let item = await Watchlist.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            item
        });

    });

};
