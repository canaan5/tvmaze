import axios from 'axios';

export default {
    getMovies: async (currentPage) => {
        if ( currentPage !== undefined ) {
            let res = await axios.get(`http://api.tvmaze.com/shows?page=${currentPage}`);

            if (res.status === 200) {
                return res.data || [];
            }

            return [];
        }
    },

    searchMovies: async (query) => {
        if ( query !== undefined ) {
            let res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);

            if (res.status === 200) {
                return res.data || [];
            }

            return [];
        }
    },

    getMovie: async (id) => {
        let res = await axios.get(`http://api.tvmaze.com/shows/${id}`);

        if (res.status === 200) {
            return res.data || [];
        }

        return [];
    },

    getCasts: async (id) => {
        let res = await axios.get(`http://api.tvmaze.com/shows/${id}/cast`);

        if (res.status === 200) {
            return res.data || [];
        }

        return [];
    },
}
