import axios from 'axios';
import { JWT } from '../constanst';

export async function getUsers(page, pageSize)  {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        
        const response = await axios.get(
            `${process.env.REACT_APP_API_LINK}/user/admin`,    
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token,
                },
                params: { 'page': page, 'pageSize': pageSize, },
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    } 
}

export async function addUser(body) {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        const response = await axios.post(
            `${process.env.REACT_APP_API_LINK}/user/admin`, 
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

export async function updateUser(id, body) {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        const response = await axios.patch(
            `${process.env.REACT_APP_API_LINK}/user/admin/${id}`, 
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

