const axios = require('axios');
const myApiKey = process.env.REACT_APP_CB_API_KEY;
const api = axios.create({
    baseURL: `https://dashapi.chartbeat.com/query/v2/recurring/list`
})

export const getQueries = async (host, apiKey) => {
    try {
        const resp = await api.get(`/?host=${host}&apikey=${apiKey}`)
        return resp.data;
    } catch (e) {
        return { error: e.message }
    }
}