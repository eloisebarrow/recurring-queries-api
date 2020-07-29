const axios = require('axios');
const apiKey = process.env.REACT_APP_CB_API_KEY;
const api = axios.create({
    baseURL: `https://dashapi.chartbeat.com/query/v2/recurring/list`
})

export const getQueries = async () => {
    try {
        const resp = await api.get(`/?host=npr.org&apikey=${apiKey}`)
        console.log('RESP FROM API-HELPER', resp.data)
        return resp.data;
    } catch (e) {
        return { error: e.message }
    }
}