import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () =>{
    //const request = axios.get('/api/current_user');

    // return {
    //     type: FETCH_USER,
    //     paylaod: request
    // }

    return async (dispatch)=>{
        const res = await axios.get('/api/current_user');
        if(res) dispatch({type: FETCH_USER, payload: res.data});
    }
}