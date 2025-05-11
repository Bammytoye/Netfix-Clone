import React from 'react'
import NotUserScreen from './NotUserScreen';
import UserScreen from './UserScreen';

function HomePage() {
    const user = false;

    return (
        <div>
            {
                user ? <UserScreen /> : <NotUserScreen />
            }
        </div>
    )
}

export default HomePage