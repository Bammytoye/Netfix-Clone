import React from 'react'
import { useAuthStore } from '../../../store/AuthUser'

function UserScreen() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <div>
            <h1>UserScreen</h1>
            <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded">
                Logout
            </button>
        </div>
    )
}

export default UserScreen;
