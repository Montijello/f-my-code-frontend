const buildElement = require("./utils")
const server = require("./server")


function editPost(titleHTML, descHTML, codeHTML, id, cb) {
  const title = titleHTML.innerText
  const description = descHTML.innerText
  const code = codeHTML.innerText

  const titleInput = buildElement("input", {
    attributes: { value: title }
  })
  const descInput = buildElement("textarea", {
    innerText: description
  })
  const codeInput = buildElement("textarea", {
    innerText: code
  })
  const submitButHTML = buildElement("a", {
    class: ["btn"],
    id: "edit-submit",
    innerText: "Submit",
    listeners: [{
      action: "click",
      callback: (e) => {
        server.updatePost(id, { 
          title: titleInput.value, 
          description: descInput.value, 
          code: codeInput.value})
        .then((res) => {
          cb();
        })
        .catch(err => console.log(err))
      }
    }]
    });

    return buildElement("div", {
      children: [ titleInput, descInput, codeInput, submitButHTML ]
    })
    
   
    
  // const editForm = buildElement("form", {
  //   children:[titleInput, descInput, codeInput, submitButHTML], listeners: [{
  //     action: "submit",
  //     callback: formEditHandler
  //   }]
  // })
}

// function formEditHandler(e){
//   server.uppdatePost()
// }

module.exports = editPost;