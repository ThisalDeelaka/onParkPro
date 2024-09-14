import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    auth: {
        username: '', // Initialize username with an empty string
        active: false
    },
    setUsername: (name) => {
        // Save username to local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        const updatedUserData = { ...userData, username: name };
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        // Update state with the new username
        set((state) => ({ auth: { ...state.auth, username: name } }));
    }
}));
