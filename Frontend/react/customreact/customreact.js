function renderElement(reactElement,container){
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    domElement.setAttribute('href',reactElement.props.href)
    domElement.setAttribute('target',reactElement.props.href)
    container.appendChild(domElement)
}


const reactElement = {
    type : 'a',
    props : {
        href : "https://google.com",
        target : "_blank"
    },
    children : "Click here to visit google.com"
}
const mainContainer = document.querySelector("#root")

renderElement(reactElement,mainContainer)