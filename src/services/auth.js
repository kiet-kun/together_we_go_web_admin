import axios from 'axios';

export async function LoginService(email, password)  {    
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_LINK}/auth/login`,
            {
                'email': email,
                'password': password
            },
            {
               headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    }
    catch (err) {
        console.log(err.response);
        return err.response;
    }
    
    
}