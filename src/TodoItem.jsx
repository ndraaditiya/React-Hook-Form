import { Box, Divider, Grid } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { deleteTodoFn, updateTodoFn } from './config/api'

const TodoItem = ({ _id, todoName, isComplete }) => {
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateTodo } = useMutation(
    ({ id, data }) => updateTodoFn({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )

  const { isLoading: isDeleting, mutate: deleteTodo } = useMutation(
    (id) => deleteTodoFn(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )

  const handleUpdateTodo = (id, valueComlpete) => {
    const data = { isComplete: !valueComlpete }
    updateTodo({ id, data })
  }

  return (
    <>
      <Box sx={{ py: 2, px: 2.5, display: 'flex', justifyContent: 'space-between' }}>
        {isUpdating || isDeleting ? (
          <span>{isUpdating ? 'Updating' : 'Deleting'}..</span>
        ) : (
          <>
            <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>{todoName}</span>
            <span>
              <input type='checkbox' checked={isComplete ? true : false} onChange={() => handleUpdateTodo(_id, isComplete)} />
              <i className="fa-solid fa-trash" onClick={() => deleteTodo(_id)}></i>
            </span>
          </>
        )}
      </Box>
      <Divider />
    </>
  )
}

export default TodoItem
