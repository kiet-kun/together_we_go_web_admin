import axios from 'axios';
import { JWT } from '@/constanst';
import { toast } from 'react-toastify';

export async function getUsers(page, pageSize, keyword, token)  {    
    try {
        console.log(keyword);
        
        const response = await axios.get(
            `${process.env.REACT_APP_API_LINK}/user/admin`,    
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token,
                },
                params: { 'page': page, 'pageSize': pageSize, keyword},
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    } 
}

export async function addUser(body, token) {    
    try {
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

export async function updateUser(id, body, token) {    
    try {
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


export async function deleteUser(id, token) {    
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_LINK}/user/admin/65cdd939ac2277107f5aa3b6`, 
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
