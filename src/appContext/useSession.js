import { useContext } from 'react';
import { AppContext } from './appContext';

const useSession = () => {
    const { session, setSession } = useContext(AppContext);

    return { session, setSession };
};

export default useSession;
