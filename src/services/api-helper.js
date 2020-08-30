const axios = require('axios');
// const myApiKey = process.env.REACT_APP_CB_API_KEY;
// const apiList = axios.create({
//     baseURL: `https://dashapi.chartbeat.com/query/v2/recurring/list`
// })

const apiCancel = axios.create({
    baseURL: `https://chartbeat.com/query/v2/recurring/cancel`
})

// export const getQueries = async (host, apiKey, userId) => {
//     try {
//         const resp = await apiList.get(`/?host=${host}&apikey=${apiKey}&user_id=${userId}`)
//         return resp.data;
//     } catch (e) {
//         return { error: e.message }
//     }
// }

export const getCancelRecurringQueries = async (host, apiKey, queryId) => {
    try {
        await apiCancel.get(`/?apikey=${apiKey}&host=${host}&query_id=${queryId}`)
    } catch (e) {
        return { error: e.message }
    }
}

export const getQueries = async (host, apiKey, userId) => {
    let userIdParam = userId ? `&user_id=${userId}` : ''
    let response = await fetch(`https://dashapi.chartbeat.com/query/v2/recurring/list/?apikey=${apiKey}&host=${host}${userIdParam}`)
    .then(resp => resp.json())
    .then(data => { return data })
    .catch(error => {
        console.log(error)
        return { error: error.message }
    })
    return response;

    // if (response.status < 400) {
    //     let data = await response.json() // the .json() method returns a Promise 
    //     // that resolves to the value from parsing the response body into JSON
    //     // or rejects if it's not valid JSON
    //     return data 
    // } else {
    //     return Promise.reject(new Error("Request failed"))
    // }
}

export const errors = {
    400: 'Bad Request – the server cannot or will not process the request due to something perceived to be a client error (e.g. bad syntax).',
    403: 'Access to the requested resource is forbidden for some reason. Double check your API key & host.',
    500: "Internal Server Error – something has gone wrong on the web site's server.",
    503: "Service Unavailable – the server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded."
}