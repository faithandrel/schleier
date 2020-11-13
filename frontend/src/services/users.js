import axios from 'axios'

class Users {
  static async getAllUsers() {
    const Data = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/users'
    })
    return Data.data
  }

  static async saveNewUser(name, email) {
    const Data = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/users/add',
      data: {
        name: name,
        email: email
      }
    })
    console.log(Data)
    return Data.data
  }
}

export default Users
