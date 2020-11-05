import React, { useReducer, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, ListGroupItem, Badge  } from 'reactstrap';
const initialState = {
  loading: true,
  error: '',
  todos: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        loading: false,
        error: '',
        todos: action.payload
      }
    case 'SET_ERROR':
      return {
        loading: false,
        error: 'There are some error',
        todos: []
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/todos')
    .then(res => {
      console.log(res.data)
      dispatch({type:'SET_DATA', payload:res.data})
    })
    .catch(err=>{
      dispatch({type:'SET_ERROR'})
    })
  }, [])

  const listmarkup = (
    <ListGroup>
      {state.todos.map(todo=>
        <ListGroupItem color={todo.completed?'success':'danger'} key={todo.id}>{todo.title}
        {todo.completed?(<Badge pill color='success'>Completed</Badge>):(<Badge pill color='danger'>Incompleted</Badge>)}
        </ListGroupItem>
      )}
    </ListGroup>
  );
  return (
    <div className="App">
      {state.loading?'Loading':state.error?state.error:listmarkup}
    </div>
  );
}

export default App;
