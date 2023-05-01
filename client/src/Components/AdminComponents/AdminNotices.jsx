import React,{useState} from 'react'
import "../../CSS/AdminNotices.css";
import {useDropzone} from 'react-dropzone'
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
// import Dropzone from './Dropzone';

const AdminNotices = () => {

    const [posterData, setPosterData] = useState([{
        poster_title:"",
        Poster_desc:"",
        poster_link:"",
    }]);
    const [branch, setBranch] = useState("");

    const [poster, setPoster] = useState([]);
    const [btnTog, setBtnTog] = useState(false);
    const [img_content, setImg_content] = useState({p_img: null});
    const [poster_name_back, setPoster_name_back] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSubmit, setIsSubmit] = useState(true);

    // Handinlinf the Links Input
    const handlingInput = (e) =>{
        let { name, value } = e.target;
        console.log(name, value);
    
        setPosterData({ ...posterData, [name]: value });
    }


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/*",
        onDrop:(acceptedFiles)=>{
            acceptedFiles.map(file => {
                if((file.type === "image/jpeg")|| (file.type ==="image/jpg")){

                    console.log("potsers=>",file)
                    setImg_content({p_img:file});
                    setPoster(
                        acceptedFiles.map(file => Object.assign(file,{
                            preview:URL.createObjectURL(file)
                        }))
                        )
                    setBtnTog(true);
                    // document.getElementById("toggle_preview").style.display = "flex";
                }else{
                    alert("Not a image file")
                }
            });
            // console.log(acceptedFiles);
        }
    })


    const DeleteImage =() =>{
        setBtnTog(false);
        setPoster([]);
    }

    const PImage = poster.map(file =>(
        <>
        <div className="img_pre">
            <img key={file.name} src={file.preview} alt="posterImg" className='img_preview' />
            <h1 className="delete_poster" onClick={DeleteImage}>
                    <TiDeleteOutline/>
            </h1>
        </div>
            
        </>
    ))


 const UploadPoster = async (e) =>{
    e.preventDefault();
    const data = new FormData();

    setIsDisabled(true);
    // data.append("job_poster_pic", postData);
    data.append("job_poster_pic", img_content.p_img);


    // console.log(data, "==> from data  now");
    // console.log(img_content.p_img.data);

    try{
        const res = await axios.post(`/upload-poster-pic`, data)

        if(res.status === 201){
            console.log("Success!!", res.data.post_id); 
            let p_id = res.data.post_id
            setPoster_name_back(p_id);
            setIsSubmit(false);
            toast.success("Poster successfully uploaded!!");
            e.preventDefault();
            alert("Poster successfully uploaded!!");
        }


    }catch(err){
        setIsDisabled(false);
        alert("!Oops Unsuccess!!");
        console.log("Error", err);
    }

}

const ClearPoster = () =>{

    setPosterData({
        poster_title:"",
        Poster_desc:"",
        poster_link:"",
    })

    setBranch("");
    setIsSubmit(true);
    setIsDisabled(false)

    DeleteImage();

}


const SubmitPoster = async (e) =>{
    e.preventDefault();

    const {poster_title,Poster_desc, poster_link} = posterData;
    let p_loc = poster_name_back;
    console.log(poster_title,Poster_desc, poster_link, branch, p_loc);

    const res = await fetch(`/upload-job-posters-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            poster_title,Poster_desc, poster_link,branch,p_loc
        }),
      });
  
  
      const data = await res.json();
  
      if (res.status === 422 || !data) {
        toast.error("Invalid Poster");
        console.log("Invalid Poster");
      } else {
          ClearPoster();
        toast.success(" uploaded Successfull !!..");
        console.log(" uploaded Successfull !!..");
        setIsSubmit(true);
        alert("uploaded Successfull !!..");
        e.preventDefault();
        // history.push("/");
        // navigate("/temp-collections");
        // window.location.reload(false);
      }
    

}


  return (
    <>
    
        <div className="admin_notices_con">
            <div className="notices_con">
                <div className="upload_poster_area">
                    {/* <Dropzone /> */}

                    <div className="dag_drop">
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the Poster here ...</p> :
                            <p>Drag 'and drop poster here, or click to select poster</p>
                        }
                        </div>
                    </div>

        <div className="images_grid" id='toggle_preview'>
             {PImage}
             { btnTog?<button id='tog_btn_upload' disabled={isDisabled}  onClick={UploadPoster}>Upload</button>:"" }
             
        </div>


                </div>
                <div className="poster_links">
                    <input 
                    type="text" 
                    placeholder='Title...'
                    name="poster_title"
                    value={posterData.poster_title}
                    onChange={handlingInput}
                     />
                </div>
                <div className="poster_desc">
                    <textarea id="" cols="30" rows="10"
                        name="Poster_desc"
                        value={posterData.Poster_desc}
                        onChange={handlingInput}
                     placeholder='About the poster...'></textarea>
                </div>

                <div className="poster_links" >
                        <input type="text" 
                            name='poster_link'
                            value={posterData.poster_link}
                            onChange={handlingInput}
                            autoCorrect="off"
                            autoComplete="off"
                            placeholder='Links...'
                         />  

                </div>

                <div className="btn_area">
                    <div className="choice_box">
                        <div className="inner_choice_box">
                            <label htmlFor="branch">Branch: </label>
                            <select name="" id="branch" value={branch} 
                            onChange={(e) =>{
                                const bid = e.target.value;
                                setBranch(bid);
                            } }
                            >
                                <option value=""></option>
                                <option value="MCA">MCA</option>
                                <option value="MBA">MBA</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </div>
                    <div className="only_btns">
                        <button onClick={ClearPoster}>Clear</button>
                        <button className='btn_post' disabled={isSubmit} onClick={SubmitPoster}>Post</button>
                    </div>
                </div>
            </div>
            <ToastContainer
            // position="top-center"
            position="bottom-center"
            style={{ fontSize: "1.7rem" }}
          />
        </div>
                    
    </>
  )
}

export default AdminNotices