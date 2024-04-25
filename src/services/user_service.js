import axios from 'axios';
import { JWT } from '@/constanst';
import { toast } from 'react-toastify';

export async function getUsers(page, pageSize, keyword)  {    
    try {
        console.log(keyword);
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
        
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


export async function deleteUser(id) {    
    try {
        let token  = localStorage.getItem(JWT.ACCESS_TOKEN);
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
