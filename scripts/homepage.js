const buildPosts = require("./build-posts");
const homePage = "http://127.0.0.1:8080"
const { getAllPosts, request } = require('./server')

if (window.location.pathname === '/') {
  getAllPosts()
    .then((res) => {
      buildPosts(res.data)
      document.querySelector("#postPage").addEventListener('click', (e) => {
        window.location = `${homePage}/html/newpost.html`
      })
    })
    .catch(err => console.log(err))
}

function hideBtns() {

  // loggedIn is a boolean, it checks whether a token is in local storage
  const loggedIn = !!localStorage.getItem("token")
  const userId = localStorage.getItem("user_id")
  const postId = document.querySelectorAll("#id").getAttribute("data-post-id")

  if (loggedIn) {
    document.querySelector("#rating").classList.remove("hide")
    document.querySelector("#createPost").classList.remove("hide")
  }

  if (loggedIn && userId === postId) {
    document.querySelector("#remove-post").classList.remove("hide")
    document.querySelector("#edit-post").classList.remove("hide")
  }
}

if (window.location.pathname === '/html/signup.html') {
  const signupForm = document.querySelector('#signup')
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const email = e.target.email.value

    request('http://localhost:3000/users', 'post', { username, email, password })
      .then(function (response) {
        localStorage.setItem('token', response.data.token)
        window.location = homepage
      })
      .catch(function (error) {
        console.log(error)
      })
  })
}

if (window.location.pathname === '/html/login.html') {
  const loginForm = document.querySelector('#login')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    request('http://localhost:3000/auth/token', 'post', { username, password })
      .then(function (response) {
        localStorage.setItem('token', response.data.token)
        window.location = homepage
      })
      .catch(function (error) {
        console.log('something seems to be out of place')
      })
  })
}

document.addEventListener("DOMContentLoaded", getAllPosts)
