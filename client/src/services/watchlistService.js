import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/watchlist`);
        return res.data || [];
    },

    add: async (movie) => {
        let payload = {
            "id": movie.id,
            "name": movie.name,
            "rating": movie.rating.average == null ? "0.0" : movie.rating.average.toString(),
            "image": movie.image.medium,
            'date': movie.premiered
        };

        let res = await axios.post(`/api/watchlist`, payload);

        return res.data || false;
    }
}
