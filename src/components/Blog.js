import Togglable from  './Togglable'
//import blogService from '../services/blogs'
//import { useState } from  'react'

const Blog = ({ blog , deleteBlog, updateLikes }) => {
  //const [likesAmount, setLikesAmount] = useState(blog.likes)


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

  const handleLike = async () => {
    await updateLikes(blog.id)
    //setLikesAmount(res.likes)
  }

  const handleDelete = async (event) => {
    console.log( 'Deleting blog ')
    event.preventDefault()
    if (window.confirm(`Remove Blog: ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='default-view'>
        {blog.title} by {blog.author}
      </div>
      <div className='detail-view'>
        <Togglable buttonLabel= 'view '>
          <div>
            <span>url: </span>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            <span>likes: </span>
            <span style={spanStyle}>{blog.likes}</span>
            <span>
              <button onClick={handleLike}>like</button>
            </span>
          </div>
          <div>
            <span>author: </span>
            {blog.user !== undefined ? <span>{blog.user.username}</span> : <span>created by system</span>}
            {<button type= 'delete ' onClick={handleDelete}>delete</button>}
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog