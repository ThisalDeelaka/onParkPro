import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthcontext = () => { 
    const constext = useContext(AuthContext);

    if(!constext){
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    console.log("context", constext);
    return constext
}