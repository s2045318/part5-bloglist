import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
//import App from '../App'

describe('blog tests', () => {
  test('component displaying a blog renders the blogs title and author', () => {
    const blog = {
      title: 'New Blog Post',
      author: 'John Doe',
      url: 'example.com'
    }
    const { container } = render(<Blog blog={blog}/>)
    const element = container.querySelector('.default-view')
    expect(element).toHaveTextContent('New Blog Post')
    expect(element).toHaveTextContent('John Doe')
    expect(element).not.toHaveTextContent('example.com')
  })

  test('does not render its URL or number of likes by default', async () => {
    const blog = {
      title: 'Exciting News',
      author: 'Jane Smith',
      url: 'example.com'
    }
    const { container } = render(<Blog blog={blog}/>)
    const button = screen.getByText('view')
    await userEvent.click(button)
    const element = container.querySelector('.detail-view')
    expect(element).toHaveTextContent('example.com')
    expect(element).toHaveTextContent('likes')
  })
  test('calls updateLikes handler twice when like button is clicked twice', () => {
    // Mock the updateLikes handler
    const updateLikesMock = jest.fn()

    // Render the Blog component with the mocked handler
    const { getByText } = render(
      <Blog
        blog={{
          id: 1,
          title: 'Test Blog',
          author: 'John Doe',
          likes: 0,
        }}
        updateLikes={updateLikesMock}
      />
    )

    // Find the like button and click it twice
    const likeButton = getByText('like')
    likeButton.click()
    likeButton.click()

    // Expect the updateLikes handler to be called twice
    expect(updateLikesMock).toHaveBeenCalledTimes(2)
  })
  test('new blog created correctly', async () => {
    const create = jest.fn()
    const setPopupMessage = jest.fn()
    const user = { username:'root', name:'root', password:'root' }
    const sendOperationMessage = jest.fn()
    render(<BlogForm 
      createBlog={create} 
      sendOperationMessage={sendOperationMessage}
      user={user}
      setPopupMessage = {setPopupMessage
      }/>
    )

    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('create')

    await userEvent.type(inputTitle, 'title')
    await userEvent.type(inputAuthor, 'author')
    await userEvent.type(inputUrl, 'url')
    await userEvent.click(sendButton)
    console.log(create.mock.calls)
    expect(create.mock.calls).toHaveLength(1)
    expect(create.mock.calls[0][0].title).toBe('title')
    expect(create.mock.calls[0][0].author).toBe('author')
    expect(create.mock.calls[0][0].url).toBe('url')

  })
})
