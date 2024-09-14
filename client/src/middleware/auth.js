import { Navigate } from "react-router-dom";
import { getUserId } from "../helper/helper.js";

export const AuthorizeUser = ({ children }) => {
    const userId = getUserId();

    if (!userId) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}

export const ProtectRoute = ({ children }) => {
    const userId = getUserId();

    if (!userId) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}
