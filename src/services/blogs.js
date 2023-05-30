import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (blogId) => {
  try {
    const response = await axios.get(`${blogId}`)
    const currentLikes = response.data.likes

    const newLikes = currentLikes + 1
    const updateResponse = await axios.put(`${blogId}`, { likes: newLikes })

    console.log('blog post likes updated:', updateResponse.data)

    return updateResponse.data

  } catch (error) {
    console.error('error updating blog post likes:', error)
  }
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.status === 204
  } catch (error) {
    console.error('Error deleting blog post:', error)
  }
}

export default { getAll, create, setToken, addLike, deleteBlog }