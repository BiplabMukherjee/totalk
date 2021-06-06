const users = [];

//Join user to chat group

function userJoin(id, username, room){
    const user = {id,username,room};
    users.push(user);
    return user;
}

//get Current User

function getCurrentUser(id){
    return users.find(user =>user.id === id)
}

//User Leave the chat room 

function userLeave(id){
    const index = users.findIndex(user =>user.id === id);
    if(index!=-1){
        return users.splice(index,1)[0];
    }
}

//get room User

function getRoomUsers(room){
    return users.filter(user =>user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers

}