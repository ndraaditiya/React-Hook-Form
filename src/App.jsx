import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTodosFn, postTodoFn } from './config/api'
import TodoItem from './TodoItem'
import { useForm, Controller } from 'react-hook-form'
import { Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem, Container } from '@mui/material'

function App() {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      todoName: '',
      isComplete: false
    }
  })

  const queryClient = useQueryClient()
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodosFn,
    select: (res) => res.data
  })

  const { mutate: onCreateTodo } = useMutation(
    (data) => postTodoFn(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
        reset()
      }
    }
  )

  const onSubmit = (data) => {
    onCreateTodo(data)
  }

  return (
    <Container maxWidth='sm' sx={{ paddingX: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <h3>Todo App</h3>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name='todoName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      color='primary'
                      variant='standard'
                      label='Todo Name'
                      {...field}
                      {...register("todoName", { required: true, pattern: /^[A-Za-z, '']+$/i })}
                    />
                  )}
                />
                {errors.todoName && <p style={{ color: 'salmon' }}>Todo Name is Required and<br /> Just Contained an alphabet!</p>}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='isComplete'
                  control={control}
                  render={({ field }) => (
                    <FormControl variant='standard' fullWidth>
                      <InputLabel id='isComplete'>Finished?</InputLabel>
                      <Select
                        {...field}
                        labelId='isComplete'
                        label='Finised?'
                      >
                        <MenuItem value={false}>Not Yet</MenuItem>
                        <MenuItem value={true}>Done</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} align='right'>
                <Button
                  color='primary'
                  variant='contained'
                  sx={{ borderRadius: 15 }}
                  type='submit'
                >
                  <span style={{ textTransform: 'none', fontWeight: 600 }}>Add Todo</span>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} sx={{ maxHeight: 300, overflow: 'auto' }} mt={2}>
          {isLoading && <p>Loading...</p>}
          {todos && todos.map((todo, i) => (
            <TodoItem key={i} {...todo} />
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
