import { useAuthcontext } from "./useAuthContext";
import { getUserId } from '../helper/helper.js'; // Assuming getUserId retrieves the _id from local storage

export const useLogin = () => {
    const { dispatch } = useAuthcontext();

    const login = async (user) => {
        try {
            const userId = await getUserId();
            const response = await fetch(`/api/auth/login/${userId}`, { // Adjust the endpoint URL to include the user ID
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            const json = await response.json();
            console.log("login response", json);
            if (response.ok) {
                // Save user details to local storage (if needed)
                // localStorage.setItem('user', JSON.stringify(json));

                // Update authcontext
                dispatch({ type: 'LOGIN', payload: json });
                console.log("login success", json);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return { login };
};
