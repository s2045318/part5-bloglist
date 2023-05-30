import Togglable from "./Togglable"
import blogService from '../services/blogs'
import { useState } from "react"

const Blog = ({ blog, registeredUser, setPopupMessage , deleteBlog}) => {
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
      console.log('error updating blog post');
      // setPopupMessage({
      //   text: 'error updating blog post',
      //   class: 'error'
      // })
      // setTimeout(() => {
      //   setPopupMessage({
      //     text: null,
      //     class: ''
      //   })
      // }, 5000)
    }
  }

  const handleDelete = async (event) => {
    console.log("Deleting blog")
    event.preventDefault()
    if (window.confirm(`Remove Blog: ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view">
        <div>
          <span>url: </span>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          <span>likes: </span>
          <span style={spanStyle}>{likesAmount}</span>
          <span>
            <button onClick={() => handleLike(blog.id)}>like</button>
          </span>
        </div>
        <div>
          <span>author: </span>
          {blog.user !== undefined ? <span>{blog.user.username}</span> : <span>created by system</span>}
          {<button type="delete" onClick={handleDelete}>delete</button>}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog