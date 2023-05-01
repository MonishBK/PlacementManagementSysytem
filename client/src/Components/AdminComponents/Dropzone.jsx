import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const  Dropzone = () =>{

    const [poster, setPoster] = useState([]);
    const [btnTog, setBtnTog] = useState(false);
    const [img_content, setImg_content] = useState({p_img: null});

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

    data.append("job_poster_pic", img_content.p_img);

    console.log(data, "==> from data  now");
    // console.log(img_content.p_img.data);
    try{
        const res = await axios.post(`/upload-poster-pic`, data)

        console.log("Success!!", res); 
        toast.success("Poster successfully uploaded!!");
        alert("Sucessfull..!!");

    }catch(err){
        alert("!Oops Unsucess!!");
        console.log("Error", err);
    }

}


  return (
    <>
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
             { btnTog?<button id='tog_btn_upload' onClick={UploadPoster}>Upload</button>:"" }
             
        </div>
        <ToastContainer
            // position="top-center"
            position="bottom-center"
            style={{ fontSize: "1.7rem" }}
          />
    </>
  )
}

export default Dropzone