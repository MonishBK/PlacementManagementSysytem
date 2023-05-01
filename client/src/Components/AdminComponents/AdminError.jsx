import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const AdminError = () => {
    
    const navigate = useNavigate();

    // useEffect(()=>{
    //     navigate(-1);
    // },[])

  return (
    <div style={{
        width:"100vw",
        height:"100vh",
        // backgroundColor:"blue"
    }}>
        from error 404
    </div>
  )
}

export default AdminError