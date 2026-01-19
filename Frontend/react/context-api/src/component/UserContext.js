import React from "react";

const UserContext = React.createContext()


// so basically we are creating provider and consumer so that we can consume and provide value
// we need to do do userprovider to whome so that value available to all children otherwise not
const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer



export {UserProvider, UserConsumer}
export default UserContext