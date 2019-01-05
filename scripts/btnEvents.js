const buildComments = require("./build-comments");
const server = require("./server");
const edit = require("./edit")


function getCommentsHandler(buildPosts) {
  return function (e) {
    const button = e.target
    const cardPanel = button.parentElement
    const id = cardPanel.getAttribute("data-post-id")

    return server.getAllComments(id)
      .then(res => {
        const comments = res.data;
        const listHTML = buildComments(comments);

        cardPanel.appendChild(listHTML);

      })
  }
}

function editBtnHandler(cb) {
  return function (e) {
    const panelCard = e.target.parentElement
    const id = e.target.getAttribute("data-post-id")

    const titleHTML = panelCard.querySelector(".title-data")
    const descHTML = panelCard.querySelector(".desc-data")
    const codeHTML = panelCard.querySelector(".code-data")

    const editArea = edit(titleHTML, descHTML, codeHTML, id, cb)
    panelCard.insertBefore(editArea, titleHTML)

    titleHTML.remove(), descHTML.remove(), descHTML.remove(), codeHTML.remove()

  }
}


function getDeleteHandler(cb) {
  return function (e) {
    server.delPost(e.target.getAttribute('data-post-id'))
      .then((res) => {
        removePostsDOM(res.data)
        cb()
      })
  }
}

function removePostsDOM() {
  const allPosts = document.querySelector("#showPosts")
  while (allPosts.children.length > 0) {
    allPosts.children[0].remove()
  }
}

function voteUp(buildPosts) {
  return function (e) {
    const button = e.target;
    const postId = button.getAttribute("data-post-id");
    const points = 1
    let voteData = [postId, points]

    // createRating needs ()
    server.createRating(voteData)
      .then(() => {
        removePostsDOM();
        buildPosts();
      })
  }
}

function voteDown(buildPosts) {
  return function (e) {
    const button = e.target;
    const postId = button.getAttribute("data-post-id");
    const points = -1
    let voteData = [postId, points]

    server.createRating(voteData)
      .then(() => {
        removePostsDOM();
        buildPosts();
      });
  }
}

module.exports = {
  getCommentsHandler,
  getDeleteHandler,
  voteUp,
  voteDown,
  editBtnHandler
}
