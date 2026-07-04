import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'




const FileUpload = ({value='',onChange,accept}) => {
    const [isFileUploaded,setFileUploaded]=useState(false)
    const [preview,setPreview]=useState('')
    const [isImage,setIsImage]=useState(true)
   // const {editCourse}=useSelector(state=>state.course)
     

   

    const onDrop=(files)=>{
        const file=files[0]  
        onChange(file)
       
    }
     const {getRootProps, getInputProps, open} = useDropzone({noClick: true, accept: accept,onDrop:onDrop});
    const handleFile=(file)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
        setPreview(fileReader.result)
        }
    }
    const handleRemove=()=>{
        setPreview(null)
        setFileUploaded(false)
        onChange(null)
    }    
  useEffect(()=>{
    console.log('value=>',value)
   // console.log('editCourse:',editCourse)
  //  if (editCourse) {
  //     if (value instanceof File) {
  //       if (value.type.startsWith("image")) {
  //         const preview =handleFile(value)
  //         setPreview(preview)
  //         setIsImage(true)
  //       }
  //     } else {
  //       // existing image url (from backend)
  //       setPreview(value);
  //       setIsImage(true);
  //     }
  //     setFileUploaded(true);
  //     return;
  //   }     
    if (!value) {
    setPreview("");
    setFileUploaded(false);
    setIsImage(true);
    return;
  }
    if(value instanceof File){
      if(value.type.startsWith('image')){
        const preview=handleFile(value)
        setPreview(preview)
        setFileUploaded(true)
        setIsImage(true)
        return
      } 
   
    
  }},[value])


  return (
    <section className="container rounded-3 border-1 border   align-items-center px-4 py-3 d-flex justify-content-center " style={{height:"310px",backgroundColor:"#F8F9FA"}} >
       {isFileUploaded?
       <div>
       { isImage&&<div className=' w-100 text-center ' style={{height:"270px"}}>
            <div className='w-100 overflow-hidden' style={{height:"250px"}}>
                <img src={preview} className='img-fluid' alt="image" style={{objectFit:"contain"}} />
            </div>
            <div  className=' text-decoration-underline ' style={{fontSize:"14px",fontWeight:"300",cursor:"pointer"}} onClick={handleRemove}> Cancel</div>

        </div> }
        </div>:
        <div {...getRootProps({className:'dropzone   w-100 d-flex justify-content-center align-items-center', style:{height:"230px"}})} >
             <input {...getInputProps()} />
            <div className='w-50 d-flex flex-column align-items-center gap-1'>
                <div className='rounded-circle bg-richblack-900 text-center overflow-hidden' style={{width:"50px",height:"50px"}} ><i class="bi bi-cloud-arrow-up text-warning fs-2"></i></div>
                <div className='w-75 text-center  small' style={{fontSize:"14px"}}>
                  Drag n Drop an image, or click on <span className='text-warning' style={{cursor:"pointer"}} onClick={open}>Browse</span> a file
                </div>             
            </div>
        </div>     }
           
          
    </section>
  );
}

export default FileUpload