import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setPopupMessage, setShowBlogForm, user }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: null,
    creator: ''
  })

  // const creator = user?.username

  const addBlog = (event) => {
    event.preventDefault()

    const creator = user.username
    console.log(creator)
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setPopupMessage({
        text: '  please fill in all required fields'  ,
        class: '  error'
      })
      setTimeout(() => {
        setPopupMessage({
          text: null,
          class: '  '
        })
      }, 5000)
      return
    }
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      creator: creator
    }

    console.log(blogObject)
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '  '  , author: '  '  , url: '  '  , likes: 0 })
        setPopupMessage({
          text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          class: '  success'
        })
        setTimeout(() => {
          setPopupMessage({
            text: null,
            class: '  '
          })
        }, 5000)
      })
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h1>Create new blog</h1>
        <input
          type='text'
          name='title'
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder='title'
        />
        <input
          type='text'
          name='author'
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder='author'
        />
        <input
          type='url'
          name='url'
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder='url'
        />
        <input
          type='number'
          name='likes'
          value={newBlog.likes}
          onChange={handleBlogChange}
          placeholder='likes'
        />
        <button type='submit'  >create</button>
        <button onClick={() => setShowBlogForm(false)}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm