import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-4b9fe.firebaseio.com/'
})