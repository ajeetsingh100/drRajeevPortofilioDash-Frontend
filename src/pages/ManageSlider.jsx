import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import FileUpload from '../components/FileUpload/FileUpload'
import { useDispatch, useSelector } from 'react-redux'
import { addSlide } from '../services/operation/slideAPI'


const ManageSlider = () => {
  const {handleSubmit,register,formState:{errors},control,reset,resetField}=useForm()
  const {loading}=useSelector(state=>state.slide)
  const dispatch=useDispatch()
  
  function handleFormData(form){
    console.log('hello',form)
    const formData=new FormData()
    formData.append('title',form.title)
    formData.append('subTitle',form.subTitle)
    formData.append('thumbnail',form.thumbnail)
    dispatch(addSlide(formData))
  }

  useEffect(()=>{
    if(!loading){
      reset({
      title: "",
      subTitle: "",
      thumbnail:null
    });
    }
  },[loading])
  return (
    <div >
      <h4>Manage Slider Images</h4>
      <div className='border p-4 rounded-3 mt-4 '>
          <form className='needs-validation' noValidate onSubmit={handleSubmit(handleFormData)}>
              <div className="row gy-3 pb-2">
                  <div className="form-group col-12 col-md-6">
                      <label htmlFor="" className="form-label text-muted small">Title</label>
                      <input type="text" className={`form-control form-control-sm ${errors.title&&`is-invalid`}`} {...register('title',{required:'*title is required'})} />
                      <div className="invalid-feedback">
                          {errors.title?.message}
                      </div>
                  </div>
                   <div className="form-group col-12 col-md-6">
                      <label htmlFor="" className="form-label text-muted small">Sub title</label>
                      <input type="text" className={`form-control form-control-sm ${errors.subTitle&&`is-invalid`}`}{...register('subTitle',{required:'*sub title is required'})}/>
                      <div className="invalid-feedback">
                          {errors.subTitle?.message}
                      </div>
                  </div>
                    <div className="form-group col-12 col-md-6">
                      <label htmlFor="" className="form-label text-muted small">Set thumbnail</label>
                      <Controller
                          name='thumbnail'
                          control={control}  
                  
                          rules={{
                              required: "Thumbnail is required",
                              validate:{
                                checkSize:(file)=>{
                                  if(!file) return true;
                                  const MAX_SIZE=2 * 1024 * 1024
                                  return (file.size<=MAX_SIZE||'image size should be less than 2MB')
                                }
                              }
                            }}            
                          render={({field})=>
                          <FileUpload value={field.value} 
                                  onChange={field.onChange} 
                                  accept={{"image/jpeg":[],"image/jpg":[],"image/png":[]}} 
                                  fileType='image'
                                  va
                                   className={errors.thumbnail&&`is-invalid`}
                                  />} 
                          />
                          <div className="invalid-feedback d-block">
                              {errors.thumbnail?.message}
                        </div>
                  </div>
                  <div className="form-group">
                      <button className="btn btn-sm btn-dark" disabled={loading}>{loading?`Adding...`:`Add slide`}</button>
                  </div>
              </div>
          </form>
      </div>
    </div>
  )
}

export default ManageSlider