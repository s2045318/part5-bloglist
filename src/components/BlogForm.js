import { useState } from 'react'


const BlogForm = ({ createBlog, setPopupMessage, setShowBlogForm, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const addBlog = (event) => {
    event.preventDefault()
    if (!title || !author || !url) {
      setPopupMessage({
        text: 'please fill in all required fields',
        class: 'error'
      })
      setTimeout(() => {
        setPopupMessage({
          text: null,
          class: ''
        })
      }, 5000)
      return
    }
    createBlog({
      title: title,
      author : author,
      url : url,
      likes : likes,
      creator : user.username
    })
    setPopupMessage({
      text: `a new blog ${title} by ${author} added`,
      class: '  success'
    })
    setAuthor('')
    setTitle('')
    setUrl('')
    setTimeout(() => {
      setPopupMessage({
        text: null,
        class: '  '
      })
    }, 5000)
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h1>Create new blog</h1>
        <input
          type='text'
          name='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='title'
        />
        <input
          type='text'
          name='author'
          value={author}
          onChange={event => setAuthor(event.target.value)}
          placeholder='author'
        />
        <input
          type='url'
          name='url'
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder='url'
        />
        <input
          type='number'
          name='likes'
          value={likes}
          onChange={event => setLikes(event.target.value)}
          placeholder='likes'
        />
        <button type='submit'  >create</button>
        <button onClick={() => setShowBlogForm(false)}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm