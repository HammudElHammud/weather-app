import axios from 'axios';

export function createAxios(baseUrl= '' )
{
    return axios.create({
        baseURL: baseUrl,
    })
}