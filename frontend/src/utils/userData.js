const url = "http://localhost:8079"

const register = async (body) => {
    try {
        const response = await fetch(url+'/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
    
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// Login function
const login = async (body) => {
    try {
        const response = await fetch(url + '/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export { register, login };