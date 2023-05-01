import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/Login.css";

const Logout = () => {


    const navigate = useNavigate();

    useEffect( ()=>{

       const fetchData = async () =>{
            try{
                const res = await fetch('/logout',{
                    method: "GET",
                    // headers: {
                    //     Accept: "application/json",
                    //     "Content-Type": "applictaion/json",
                    // },
                    credentials: "include"
                });
    
                await res.json();
                console.log("after response ");
                if(res.status !== 200){ throw new Error(res.error) }
                
                // console.log("from logout page")
                navigate('/signin',{replace: true});
                window.location.reload(false)
     
    
            } catch (err) {
                console.log(err);
                // dispatch({type: "USER", payload: false})
                navigate('/signin',{replace: true});
                window.location.reload(false)
            }
        }
        fetchData();
    })

    return (
        <>
            <div className="logout_page"></div>
        </>
    )
}

export default Logout

export const LogoutAll = () => {


    const navigate = useNavigate();

    useEffect( ()=>{

       const fetchData = async () =>{

            const ans = window.confirm("logout from all devices!..");
            console.log(ans)
            try{
                    if(ans){
                    const res = await fetch('/logout-all-devices',{
                        method: "GET",
                        // headers: {
                        //     Accept: "application/json",
                        //     "Content-Type": "applictaion/json",
                        // },
                        credentials: "include"
                    });
        
                    await res.json();
                    console.log("after response ");
                    if(res.status !== 200){ throw new Error(res.error) }
    
                    
                    // console.log("from logout page")
                    navigate('/signin',{replace: true});
                    window.location.reload(false)

                 }else{
                    navigate("/admin-settings");
                 }
         
        
                } catch (err) {
                    console.log(err);
                    // dispatch({type: "USER", payload: false})
                    navigate('/signin',{replace: true});
                    window.location.reload(false)
                }
                

        }
        fetchData();
    })

    return (
        <>
            <div className="logout_page"></div>
        </>
    )
}
