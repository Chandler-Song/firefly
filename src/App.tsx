import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Social from './pages/Social'
import Knowledge from './pages/Knowledge'
import Blog from './pages/Blog'
import Insights from './pages/Insights'
import Tools from './pages/Tools'
import Books from './pages/Books'
import Achievements from './pages/Achievements'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/social" element={<Social />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/books" element={<Books />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
