import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import Blog from "@/react-app/pages/Blog";
import BlogPost from "@/react-app/pages/BlogPost";
import SharedDocument from "@/react-app/pages/SharedDocument";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/doc/:token" element={<SharedDocument />} />
      </Routes>
    </Router>
  );
}
