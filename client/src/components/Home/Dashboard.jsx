import { useContext } from "react"
import userContext from "../../context"

function Dashboard() {
    const {user}=useContext(userContext)

    return (
        <div className='bg-white rounded-lg shadow p-6'>
            { user && user.isAdmin &&
            <>
                <h2 className='text-lg font-medium mb-4'>Welcome Admin</h2>
                <p className='text-gray-600'>Welcome to slate dashboard {user && user.name}!</p>
            </>
            }
            { user && !user.isAdmin &&
            <>
                <h2 className='text-lg font-medium mb-4'>Dashboard </h2>
                <p className='text-gray-600'>Welcome to slate dashboard {user && user.name}!</p>
            </>
            }
        </div>
    )
}

export default Dashboard
