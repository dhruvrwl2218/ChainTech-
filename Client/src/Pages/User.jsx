import {useState,useEffect} from 'react'
import { useAuth } from "../GlobalContext/AuthContext";
import {EditInfo,UserView} from "../Components"
// import { useNavigate } from 'react-router-dom';

const User = () => {
  const {state} = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // const navigate = useNavigate();
  
  const handleEdit = () =>{
    setIsEditing(true)
  }

  const editdata = state.user
  return (
    <div className='text-white w-full m-8 flex justify-center'>
     {isEditing !== true ?<UserView handleEdit={handleEdit}/>:<EditInfo/>}
    </div>
  )
}

export default User

 // useEffect(()=>{
  //    // this is for used incase any user try to access it directly form the url as we are not following proper auth functionality that's why it checked
  //   const isLoggedIn = !!state.user;
  //   if(!isLoggedIn){
  //     navigate('/Login')
  //   }
  // },[])        removed becz on re-renders it was not behaving properly redirecting to the login **need to fix
 