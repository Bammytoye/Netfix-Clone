import React from 'react'
import NotUserScreen from './NotUserScreen/NotUserScreen';
import UserScreen from './UserScreen/UserScreen';
import { useAuthStore } from '../../store/AuthUser';

function HomePage() {
    const { user } = useAuthStore();

    return (
        <>
            {
                user ? <UserScreen /> : <NotUserScreen />
            }
        </>
    )
}

export default HomePage