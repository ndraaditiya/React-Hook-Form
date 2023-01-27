import axios from 'axios'

const API = axios.create({
  baseURL: 'https://calm-plum-jaguar-tutu.cyclic.app/todos'
})

export const getTodosFn = async () => {
  const res = await API.get('/')
  return res.data
}

export const postTodoFn = async (data) => {
  const res = await API.post('/', data)
  return res.data
}

export const updateTodoFn = async ({ id, data }) => {
  const res = await API.put(`/${id}`, data)
  return res.data
}

export const deleteTodoFn = async (id) => {
  const res = await API.delete(`/${id}`)
  return res.data
}