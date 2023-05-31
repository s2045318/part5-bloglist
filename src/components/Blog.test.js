import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
})
