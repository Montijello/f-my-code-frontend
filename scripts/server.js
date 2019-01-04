const axios = require('axios')
const heroku = "http://localhost:3000";


// HELPER FUNCTION - standarizes format for axios calls
function request(path, method = 'get', body = null) {
  let bearerToken = ''
  const token = localStorage.getItem('token')

  if (token) {
    bearerToken = `Bearer ${token}`
  }
  return axios(`${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  })
}

// CRUD OPERATIONS

const createPost = newPost => {
  const route = `${heroku}/posts${newPost}`
  return request(route, 'post')
}

const createComment = (id, newComment) => {
  const route = `${heroku}/posts/${id}/comments`
  return request(route, 'post', newComment)
}

const createRating = (id) => {
  const route = `${heroku}/posts/${id}/ratings/${id}`
  const arg = {rating: 1}
  return request(route, 'put', arg)
}

const getAllPosts = () => {
  const route = `${heroku}/posts`
  return request(route, 'get')
}

const getAllComments = id => {
  const route = `${heroku}/posts/${id}/comments`
  return request(route, 'get')
}

const updatePost = (id, newPost) => {
  const route = `${heroku}/posts/${id}`
  return request(route, 'put', newPost)
}

const updateComment = (id, newComment) => {
  const route = `${heroku}/posts/${id}/comments`
  return request(route, 'put', newComment)
}

const delPost = id => {
  const route = `${heroku}/posts/${id}`
  return request(route, 'delete')
}

const delComment = (id, commentId) => {
  const route = `${heroku}/posts/${id}/comments`
  return request(route, 'delete', commentId)
}

module.exports = {
  createPost,
  createComment,
  createRating,
  getAllPosts,
  getAllComments,
  updatePost,
  updateComment,
  delPost,
  delComment,
  request
}
