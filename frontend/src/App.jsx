import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Faq from './pages/Faq.jsx';
import AdminApp from './admin/AdminApp.tsx';

export default function App() {
  return (
    <Routes>
      {/* /admin (and any /admin/... deep link) renders the admin panel
          full-screen, with no public site header/footer wrapped around it. */}
      <Route path="/admin/*" element={<AdminApp />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/faq" element={<Faq />} />
      </Route>
    </Routes>
  );
}
