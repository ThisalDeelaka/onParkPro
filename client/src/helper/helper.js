import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** To get user ID from local storage */
export function getUserId() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData._id) throw new Error("User ID not found in local storage");
    return userData._id;
}

/** authenticate function */
export async function authenticate() {
    try {
        const userId = getUserId();
        return await axios.post('http://localhost:8800/api/authenticate', { userId });
    } catch (error) {
        return { error: "Authentication failed" };
    }
}

/** get User details */
export async function getUser() {
    try {
        const userId = getUserId();
        const { data } = await axios.get(`/user/${userId}`);
        return { data };
    } catch (error) {
        return { error: "Error fetching user details" };
    }
}

/** login function */
export async function verifyPassword({ password }) {
    try {
        const userId = getUserId();
        const { data } = await axios.post('/login', { userId, password });
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" };
    }
}

/** update user profile function */
export async function updateUser(response) {
    try {
        const userId = getUserId();
        const data = await axios.put('/updateuser', response, { headers: { "Authorization": `Bearer ${userId}` } });
        return { data };
    } catch (error) {
        return { error: "Couldn't Update Profile...!" };
    }
}

/** register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/auth/register`, credentials);

        const userId = getUserId();

        /** send email */
        if (status === 201 && userId) {
            await axios.post('/registerMail', { userId, text: msg });
        }

        return { data: msg };
    } catch (error) {
        return { error };
    }
}

/** generate OTP */
export async function generateOTP() {
    try {
        const userId = getUserId();
        const { data: { code }, status } = await axios.get('/generateOTP', { params: { userId } });

        // send mail with the OTP
        if (status === 201 && userId) {
            const { data: { email } } = await getUser();
            const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/registerMail', { userId, userEmail: email, text, subject: "Password Recovery OTP" });
        }
        return { data: code };
    } catch (error) {
        return { error };
    }
}

/** verify OTP */
export async function verifyOTP({ code }) {
    try {
        const userId = getUserId();
        const { data, status } = await axios.get('/verifyOTP', { params: { userId, code } });
        return { data, status };
    } catch (error) {
        return { error };
    }
}

/** reset password */
export async function resetPassword({ password }) {
    try {
        const userId = getUserId();
        const { data, status } = await axios.put('/resetPassword', { userId, password });
        return { data, status };
    } catch (error) {
        return { error };
    }
}
