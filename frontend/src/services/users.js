import axios from 'axios'

class Users {
  static async getAllUsers() {
    const Data = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/users'
    })
    return Data.data
  }
}

export default Users
