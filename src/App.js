import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import BlogEditor from './pages/BlogEditor';
import ManageSlider from './pages/ManageSlider';
import ManageVideoTestimonial from './pages/ManageVideoTestimonial';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<ManageSlider/>}/>
          <Route path="create-blog" element={<BlogEditor/>}/>
         
         <Route path="manage-video-testimonial" element={<ManageVideoTestimonial/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
