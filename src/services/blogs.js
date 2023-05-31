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
  const response = await axios.get(`${ baseUrl }/${blogId}`)
  console.log(response.data)
  const currentLikes = response.data.likes
  console.log(currentLikes)
  const request = axios.put(`${ baseUrl }/${blogId}`, { likes :currentLikes + 1 })
  return request.then(response => response.data)
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