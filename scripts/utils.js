/*
  The first parameter, type, takes an html element as a string.
  The second parameter, features, takes an object for the elements attributes.
  For example: buildlElement('h1', { innerText: title, class: ["title-data"] })
  
  The order in which this function is called is important, the earlier it's called the
  higher in the DOM the element attaches
 */

function buildElement(type, features) {
  const el = document.createElement(type);

  if (features.id) el.id = features.id
  if (features.class) el.className = features.class.join(" ")
  if (features.innerText) el.innerText = features.innerText

  if (features.attributes) {
    for (attribute in features.attributes) {
      el.setAttribute(attribute, features.attributes[attribute])
    }
  }

  if (features.listeners) {
    features.listeners.forEach(listener => {
      el.addEventListener(listener.action, listener.callback)
    })
  }

  if (features.children) {
    features.children.forEach(child => {
      el.appendChild(child);
    })
  }
  return el;
}

module.exports = buildElement;
