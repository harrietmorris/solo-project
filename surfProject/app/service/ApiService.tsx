import React from "react";
import axios, { AxiosResponse } from "axios";

const API_URL = 'http://192.168.0.193:3000';
// const API_URL = 'http://localhost:3000';

const getMeets = async () => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${API_URL}/allmeets`);
        // console.log(response);
        return response;
    } catch (e) {
        console.log('error getting meets:', e);
    }

}

const addMeet = async (meet: any) => {
    try {
        console.log('meet:', meet);
        const newMeet: AxiosResponse<any> = await axios.post(`${API_URL}/new`, meet);
        //const newMeet = await axios.post(`${API_URL}/new`, meet);
        console.log('Form data sent:', newMeet.data);
    } catch (e) {
        console.log('error submitting meet:', e);
    }
}

const deleteMeet = async (id: string) => {
    try {
        const del: AxiosResponse<any> = await axios.delete(`${API_URL}/${id}`);
        console.log('deleted id:', id)
    } catch (e) {
        console.log('error deleting meet:', e);
    }

}


export {getMeets, addMeet, deleteMeet}