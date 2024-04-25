import axios from 'axios';
import { JWT } from '@/constanst';

export async function getBookings(page, pageSize, filter)  {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        
        const response = await axios.get(
            `${process.env.REACT_APP_API_LINK}/booking`,    
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token,
                },
                params: { 'page': page, 'pageSize': pageSize, 
                    ...filter,
                },
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    } 
}

export async function addBooking(body)  {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        
        const response = await axios.post(
            `${process.env.REACT_APP_API_LINK}/booking`,    
            body,
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token,
                },
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    } 
}

export async function updateBooking(id, body)  {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        
        const response = await axios.put(
            `${process.env.REACT_APP_API_LINK}/booking/${id}`,
            body,    
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token,
                },
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    } 
}

export async function deleteBooking(id)  {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        
        const response = await axios.delete(
            `${process.env.REACT_APP_API_LINK}/booking/${id}`,    
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token,
                },
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    } 
}