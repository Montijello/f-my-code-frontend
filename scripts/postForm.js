const buildPosts = require("./build-posts");
const server = require("./server")






function create() {

    const fingWork = document.getElementById('newPost')
    const title = document.querySelector("#titleEdit")
    const description = document.querySelector("#description")
    const code = document.querySelector("#code")

    fingWork.addEventListener('submit', (e) => {
        e.preventDefault()


        const newPost = {
            title: title.value,
            description: description.value,
            code: code.value
        }

        server.createPost(newPost)
            .then((res) => {
                window.location.href = "http://127.0.0.1:8080/"
            })
            .catch(function (err) {
                document.querySelector('#error').classList.remove('hide-auth-error')
            })
    })
}

// function update() {

//     updatePost(this.getAttribute('data-post-id'), {
//         title: title.value,
//         content: content.value
//       }).then((res) => {

//         createPosts(newPost)
//             .then((res) => {
//                 window.location.replace("http://127.0.0.1:8080/")
//             })
//             .catch(function (err) {
//                 document.querySelector('#error').classList.remove('hide-auth-error')
//             })
//     })
// }

module.exports = { create  }
