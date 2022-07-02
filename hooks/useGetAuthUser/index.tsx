import { useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext/authContext';

const useGetAuthUser = () => {
    const { getLoggedInUser } = useContext(AuthContext);

    useEffect(() => {
        getLoggedInUser();
    }, [getLoggedInUser]);
};

export default useGetAuthUser;
