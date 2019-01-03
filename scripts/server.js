const axios = require('axios')
const heroku = "http://localhost:3000";


// HELPER FUNCTION- standarizes format for axios calls
function request(path, method = 'get', body = null) {
  let bearerToken = ''
  const token = localStorage.getItem('token')

  if (token) {
    bearerToken = `Bearer ${token}`
  }

  return axios(`${heroku}${path}`, {
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
  const route = `/posts${newPost}`
  return request(route, 'post')
}

const createComment = (id, newComment) => {
  const route = `/posts/${id}/comments`
  return request(route, 'post', newComment)
}

// the two rating routes are different, should they be? 
// we have ratings(plural) and rating(singular)
const createRating = id => {
  const route = `/posts/${id}/ratings`
  return request(route, 'post')
}

const getAllPosts = () => {
  const route = '/posts'
  return request(route, 'get')
}

const getAllComments = id => {
  const route = `/posts/${id}/comments`
  return request(route, 'get')
}

const getRating = id => {
  const route = `/posts/${id}/rating`
  return request(route, 'get')
}

const updatePost = (id, newPost) => {
  const route = `/posts/${id}`
  return request(route, 'put', newPost)
}

const updateComment = (id, newComment) => {
  const route = `/posts/${id}/comments`
  return request(route, 'put', newComment)
}

const delPost = id => {
  const route = `/posts/${id}`
  return request(route, 'delete')
}

const delComment = (id, commentId) => {
  const route = `/posts/${id}/comments`
  return request(route, 'delete', commentId)
}

module.exports = {
  createPost,
  createComment,
  createRating,
  getAllPosts,
  getAllComments,
  getRating,
  updatePost,
  updateComment,
  delPost,
  delComment
}
