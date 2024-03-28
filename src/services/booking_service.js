import axios from 'axios';
import { JWT } from '../constanst';

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