import axios from 'axios';

export async function getStatistic(token)  {    
    try {      
        const response = await axios.get(
            `${process.env.REACT_APP_API_LINK}/statistics`,    
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