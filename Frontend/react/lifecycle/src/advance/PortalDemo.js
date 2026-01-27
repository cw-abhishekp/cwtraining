import ReactDom from "react-dom"

function PortalDemo(){
    return ReactDom.createPortal((<>
    <h1>This is from the portal</h1>
    </>),document.getElementById("root-portal"))
}

export default PortalDemo   