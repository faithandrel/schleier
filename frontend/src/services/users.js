import axios from 'axios'
import { BACKEND } from '../constants.js'

class Users {
  static async getAllUsers() {
    const Data = await axios({
      method: 'GET',
      url: BACKEND + '/users'
    })
    return Data.data
  }

  static async saveNewUser(name, email) {
    const Data = await axios({
      method: 'POST',
      url: BACKEND + '/users/add',
      data: {
        name: name,
        email: email
      }
    })
    return Data.data
  }

  static async getInvite(token) {
    const Data = await axios({
      method: 'POST',
      url: BACKEND + '/invite',
      data: {
        token: token
      }
    })
    return Data.data
  }

  static async saveProfile(user) {
    const Data = await axios({
      method: 'POST',
      url: BACKEND + '/profile',
      data: {
        invite: user.invite,
        email: user.email,
        name: user.name,
        password: user.password
      }
    })
    return Data.data
  }

  static async saveAvatar(file, email) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('email', email)
    const Data = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: BACKEND + '/avatar',
      data: formData
    })
    return Data.data
  }

  static async disableUsers(userIds) {
    const Data = await axios({
      method: 'POST',
      url: BACKEND + '/users/disable',
      data: {
        users: userIds
      }
    })
    return Data.data
  }
}

export default Users
