import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [popupMessage, setPopupMessage] = useState({
    text: null,
    class: ''
  })

  // const registeredUser = user?.username || null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.clear()
  }

  const refreshBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }
  const deleteBlog = async ( blog ) => {
    console.log('delete')
    await blogService.deleteBlog(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))

  }
  const updateLikes = async (id) => {
    const res = await blogService.addLike(id)
    setBlogs(blogs.map(blog => blog.id === id ? res : blog))
    console.log(blogs)
    renderSortedBlogs()
    return res
  }
  const createBlog = async (blog) => {
    console.log(blog)
    await blogService.create(blog)
    refreshBlogs()
  }
  const renderSortedBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    // const registeredUser = user.username
    return sortedBlogs.map(blog => (
      <Blog
        blog={blog}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        key={blog.id}
      />
    ))
  }

  const blogsList = () => (
    <div>
      <h1>blogs</h1>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <br />
      {showBlogForm ? (
        <BlogForm
          createBlog={createBlog}
          setPopupMessage={setPopupMessage}
          setShowBlogForm={setShowBlogForm}
          user={user}
        />
      ) : (
        <button onClick={() => setShowBlogForm(true)}>new note</button>
      )}
      {renderSortedBlogs()}
    </div>
  )

  return (
    <div>
      {popupMessage.text !== null && <h3 className={`${popupMessage.class}`}>{popupMessage.text}</h3>}

      {user === null && <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} setUser={setUser} setPopupMessage={setPopupMessage} />}
      {user !== null && blogsList()}
    </div>
  )
}

export default App