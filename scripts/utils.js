/*
 *  Takes a string, type, which is the type of element and an object
 *  which configures the element.
 *
 *  object = {
 *    id : "...",
 *    innerText: "...",
 *    attributes: ["...", "..."],
 *    listeners: [{...}, {...}]
 *    children: ["...", "..."],
 *    class: ["...", "..."]
 *  }
 *
 *  for children, order matters! The first element should be at the top of the
 *  DOM
 */
function buildElement(type, features) {
  console.log(type);
  const el = document.createElement(type);

  if (features.id) {
    el.id = features.id;
  }

  if (features.class) {
    el.className = features.class.join(" ");
  }

  if (features.attributes) {
    features.attributes.forEach(property => {
      el.setAttribute(attribute, features.attributes[property]);
    });
  }

  if (features.innerText) {
    el.innerText = features.innerText;
  }

  if (features.listeners) {
    features.listeners.forEach(listener =>  {
      el.addEventListener(listener.action, listener.callback)
    });
  }

  if (features.children) {
    features.children.forEach(child => {
      el.appendChild(child);
    });
  }

  return el;
}

module.exports = buildElement;
