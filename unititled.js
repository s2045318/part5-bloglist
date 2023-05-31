import Togglable from  './Togglable'
import blogService from '../services/blogs'
import { useState } from  'react'

const Blog = ({ blog, setPopupMessage , deleteBlog }) => {
  const [hideShow, sethideShow] = useState(false)
  const [likesAmount, setLikesAmount] = useState(blog.likes)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const spanStyle = {
    margin: 10
  }

  const handleLike = async (blogId) => {
    try {
      const res = await blogService.addLike(blogId)
      setLikesAmount(res.likes)
    } catch (exception) {
      console.log('error updating blog post')
      setPopupMessage({
        text: 'error updating blog post',
        class: 'error'
      })
      setTimeout(() => {
        setPopupMessage({
          text: null,
          class: ''
        })
      }, 5000)
    }
  }

  const handleDelete = async (event) => {
    console.log( 'Deleting blog ')
    event.preventDefault()
    if (window.confirm(`Remove Blog: ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }
  const toggleToggle = () => {
    sethideShow((hideShow) => !hideShow)
  }
  const label = hideShow
    ? 'hide'
    :'view'

  if (hideShow) {
    return (
      <div id='blog-item' style={blogStyle} className="detail-view">
        <div>
          <p>{blog.title} by {blog.author} <button id='toggle-toggle' onClick={toggleToggle}>{label}</button></p>
          <p>{blog.url}</p>
          <p>likes: {likesAmount} <button id='like-button' onClick={handleLike}>like</button></p>
          <p>{blog.user.username}</p>
          <button id="deletion" onClick={handleDelete}>delete</button>
        </div>
      </div>
    )
  }
  else {
    return(
      <div style={blogStyle} className="default-view">
        <div>
          <p>{blog.title} by {blog.author} <button onClick={toggleToggle}>{label}</button></p>
        </div>
      </div>

    )
  }
}

export default Blog