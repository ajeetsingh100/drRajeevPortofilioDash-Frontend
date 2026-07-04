import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';  
import ImageTool from '@editorjs/image';
import EditorjsList from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../services/operation/blogAPI';
import toast from 'react-hot-toast';
import { setLoading } from '../slices/blogSlice';

const BlogEditor = () => {
    const editorRef=useRef(null)
    const editorInstance=useRef(null)
    const imageMap=useRef(new Map())
    const {loading}=useSelector(state=>state.blog)
    const dispatch=useDispatch()
    useEffect(()=>{
        editorInstance.current = new EditorJS({
                        holder: editorRef.current,
                        onReady:()=>console.log('editor is ready for use'),
                        placeholder:'Just writing your blog...',
                          tools:{
                              image: {
                                      class: ImageTool,
                                      config: {
                                       uploader: {
                                          async uploadByFile(file) {
                                            const MAX_SIZE = 2 * 1024 * 1024;

                                            if (file.size > MAX_SIZE) {
                                              toast.error('Image should be less than 2MB');

                                              // block delete karo taaki loader wala block hi hat jaye
                                              setTimeout(() => {
                                                const editor = editorInstance.current;
                                                if (editor) {
                                                  const idx = editor.blocks.getCurrentBlockIndex();
                                                  editor.blocks.delete(idx);
                                                }
                                              }, 0);

                                              throw new Error('Image too large');
                                            }

                                            const blobURL = URL.createObjectURL(file);
                                            imageMap.current.set(blobURL, file);

                                            return {
                                              success: 1,
                                              file: { url: blobURL },
                                            };
                                          },
                                        },                                                                     },                 
                                  },
                              header:Header,
                              paragraph:Paragraph,
                              List:    {
                                          class: EditorjsList,
                                          inlineToolbar: true,
                                          config: {
                                              defaultStyle: 'unordered'
                                          },
                                      },
                    }},);
        return ()=>{editorInstance?.current?.destroy()}
    },[])

    const resetEditor = async () => {
        const editor = editorInstance.current;
        if (!editor) return;

        await editor.isReady;    
        editor.clear();          

        // blob URLs release karo (memory cleanup) aur map khali karo
        imageMap.current.forEach((file, blobURL) => {
          URL.revokeObjectURL(blobURL);
        });
        imageMap.current.clear();
      };

    async function handleData(){
        const data=await editorInstance.current.save()
        const formData=new FormData()
        data?.blocks.forEach((block,i)=>{
          if(block.type==='image'){
            const image=imageMap.current.get(block.data.file.url)
            formData.append('images',image)
            delete block.data.file.url            
          }
        }
        )
        console.log(data)
        formData.append('blog',JSON.stringify(data))
       
      try {
          const response=await dispatch(addBlog(formData))
          if(response.data.success){
            toast.success('blog is successfully created')
            resetEditor()
          }
        } catch (error) {
          toast.error(error.response.data.message)
          console.log(error)
      }
      dispatch(setLoading(false))
    }
  return (
    <div>
        <div ref={editorRef} className='rounded-2 mt-1 border border-1 text-start p-1'></div>
        <div className='d-flex justify-content-start mt-3'>
             <button className="btn btn-sm btn-dark" onClick={handleData} disabled={loading}>
              {
                loading?`Publishing`:`Publish`
              }
             </button>
        </div>
    </div>
    
  )
}

export default BlogEditor