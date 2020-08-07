const axios = require('axios');
// const myApiKey = process.env.REACT_APP_CB_API_KEY;
const apiList = axios.create({
    baseURL: `https://dashapi.chartbeat.com/query/v2/recurring/list`
})

const apiCancel = axios.create({
    baseURL: `https://chartbeat.com/query/v2/recurring/cancel`
})

export const getQueries = async (host, apiKey) => {
    try {
        const resp = await apiList.get(`/?host=${host}&apikey=${apiKey}`)
        return resp.data;
    } catch (e) {
        return { error: e.message }
    }
}

export const getCancelRecurringQueries = async (host, apiKey, queryId) => {
    try {
        await apiCancel.get(`/?apikey=${apiKey}&host=${host}&query_id=${queryId}`)
    } catch (e) {
        return { error: e.message }
    }
}