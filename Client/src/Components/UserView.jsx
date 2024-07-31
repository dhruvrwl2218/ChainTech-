import { useAuth } from '../GlobalContext/AuthContext';
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const UserView = ({handleEdit}) => {
    const{state,logout} = useAuth();
    const user = state.user;
    const navigate = useNavigate();
    
    const userLogout = () =>{
      logout();
      navigate('/');
    }
    if (!user) {
        return <p>Loading...</p>; // Or a redirect to login if user is not logged in
      }
      
  return (
    <div className='w-full'>
      <div className='flex justify-between bg-neutral-800 p-4 w-full'>
        <h2 className='bg-neutral-800 text-3xl text-indigo-500'>UserInfo</h2>
        <div className='flex gap-4'>
        <button onClick={handleEdit}><MdModeEdit className='text-4xl p-1 rounded-sm'/></button>
        <button onClick= {userLogout} className='p-1 text-xl rounded-lg text-red-500'>Logout</button>
        </div>
         
    </div>
      <div className='my-6 flex flex-wrap gap-4 justify-center text-center'>
        <p className='text-2xl w-full'><strong>Username:</strong> {user.username}</p>
        <p className='text-2xl w-full'><strong>Email:</strong> {user.email}</p>
        <p className='text-2xl w-full'><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p className='text-2xl w-full'><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
        <p className='text-2xl w-full'><strong>Gender:</strong> {user.gender}</p>
      </div>
    </div>
  )
}

export default UserView
