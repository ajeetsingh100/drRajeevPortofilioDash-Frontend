import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addTestimonial, deleteVideo } from '../services/operation/testimonialAPI'
import { apiconnector } from '../services/apiconnector'
import { Button, Modal } from 'react-bootstrap'

const ManageVideoTestimonial = () => {
    const {register,handleSubmit,formState:{errors},reset}=useForm()
    const dispatch=useDispatch()
    const {loading}=useSelector(state=>state.testimonial)
    const [videoTestimonial,setVideoTestimonial]=useState([])
    const [show,setShow]=useState(false)
    const [deleteShow,setDeleteShow]=useState(false)
    const [activeVideo,setActiveVideo]=useState(null)
    const [selectedVideo,setSelectedVideo]=useState()

    function handleFormData(form){
        console.log(form)
        const youtube_string=form.link.split('?')
        const videoId=youtube_string[0].split('/')
        dispatch(addTestimonial(videoId.at(-1)))
    }
    async function loadVideoTestimonial(){
        const response=await apiconnector('get','http://localhost:4000/api/v1/testimonial/get-all-testimonial')
        setVideoTestimonial(response.data.allTestimonial)
    }
      function handleOpen(videoId){
      setActiveVideo(videoId)
      setShow(true)
     }
     function handleClose(){
      setShow(false)
     }
    function handleDeleteModal(){
        setDeleteShow(false)
    }
    function handleDelete(){
        dispatch(deleteVideo(selectedVideo,setDeleteShow))
    }

     
function changeDateFomat(date){
  const newDate=new Date(date)
    const changedFormat=newDate.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                });
        return changedFormat
    }

     useEffect(()=>{
        if(!loading){
          reset()
            loadVideoTestimonial()
        }
      },[loading])

    
  return (
    <div>
        <h4>Add Video Testimonial</h4>
        <div className=' border rounded-3 p-3 mt-4' >
            <form className="needs-validation" onSubmit={handleSubmit(handleFormData)}>
                <div className="row d-flex justify-content-center">
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="" className="form-label small text-muted">Add youtube link</label>
                        <input type="text" className={`form-control form-control-sm ${errors.link&&`is-invalid`}`} placeholder='paste youtube link' {...register('link',{required:'youtube link is incorrect'})} />
                        <div className="invalid-feedback">
                            {errors.link?.message}
                        </div>
                    </div>
                    <div className='form-group d-flex justify-content-center mt-4'>
                        <button className="btn-sm btn btn-dark" disabled={loading}>
                            {
                                loading?`Adding...`:`Add video`
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div className='mt-4 '>
            <table className="table table-striped border">
                <thead>
                  <tr>
                    <td>Sr. no</td>
                    <td>Video thumbnail</td>
                    <td>Upload on</td>
                    <td>Action</td>
                  </tr>
                </thead>
                
                    {
                        videoTestimonial.length>0?
                        <tbody>
                            { videoTestimonial?.map((video,index)=>
                                <tr>
                                    <td>
                                        {++index}
                                    </td>
                                    <td>
                                        <div
                                            className="video-card position-relative overflow-hidden rounded-3"                    
                                            onClick={() => handleOpen(video.videoId)}
                                            style={{
                                                backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg)`,
                                                height:'50px',
                                                width:'100px',
                                                
                                            }}

                                            >
                                            <div className="video-overlay" />

                                            <div className="video-play-btn">
                                                <div className="circle outer"></div>
                                                <div className="circle middle"></div>
                                                <div className="circle inner">
                                                <i className="bi bi-play-fill play-icon"></i>
                                                </div>
                                            </div>
                                            </div>
                                     </td>
                                     <td>
                                       {changeDateFomat(video.createdAt)}
                                     </td>
                                     <td>
                                        <button className="btn btn-sm btn-danger" onClick={()=>{setDeleteShow(true);setSelectedVideo(video._id)}}>
                                            <span className='bi bi-trash '></span>
                                        </button>
                                     </td>
                                </tr>
                            )} 
                        </tbody>:
                        <tbody>
                            <tr>
                                <td colSpan={4} className='text-center'> No video found</td>
                            </tr>
                        </tbody>
                        
                        }          
                
            </table>
        </div>
        {/* modal */}
         <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="custom-video-modal"
        backdrop
        backdropClassName="video-modal-backdrop"
      >
        <div className="video-modal-wrapper position-relative">
          <button onClick={handleClose} className="video-close-btn">
            ×
          </button>

          <Modal.Body className="p-0 bg-black rounded overflow-hidden">
            <div className="video-frame-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={
                  show && activeVideo
                    ? `https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`
                    : ""
                }
                title="YouTube video player"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Modal.Body>
        </div>
      </Modal>
      {/* delete modal */}
        <Modal show={deleteShow} onHide={handleDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Video delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this video</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManageVideoTestimonial