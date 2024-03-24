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
                    'Content-Type': 'application/json'
                },
                params: { 'page': page, 'pageSize': pageSize, 'token' : token },
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    }
    
    
}