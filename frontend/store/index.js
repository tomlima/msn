export const state = () => ({
  socket: {},
  users: [],
  messages: []
})

export const getters = {
  getSocket(state) {
    return state.socket
  },
  getUsers(state) {
    return state.users
  },
  getMessages(state) {
    return state.messages
  }
}

export const mutations = {
  setSocket(state, socket) {
    state.socket.instance = socket
  },
  addUser(state, user) {
    state.users.push(user)
  },
  addMessage(state, message) {
    state.messages.push(message)
  }
}
