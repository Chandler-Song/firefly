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
import Notes from './pages/Notes'
import Detail from './pages/Detail'

function App() {
  const basename = import.meta.env.DEV ? undefined : '/firefly'

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/social" element={<Social />} />
          
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/knowledge/:slug" element={<Detail module="knowledge" />} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Detail module="blog" />} />
          
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<Detail module="insights" />} />
          
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:slug" element={<Detail module="tools" />} />

          <Route path="/notes" element={<Notes />} /> 
          <Route path="/notes/:slug" element={<Detail module="notes" />} />
          
          <Route path="/books" element={<Books />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/achievements/:slug" element={<Detail module="achievements" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
