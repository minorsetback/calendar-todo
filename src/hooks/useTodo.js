//React
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../bus/todo/actions';

export const useTodo = () => {
    const dispatch = useDispatch();

    const addTodo = (data) => {
        dispatch(todoActions.setNewToDo(data))
    }

    const deleteTodo = (id) => {
        dispatch(todoActions.deleteToDo(id))
    }

    const editTodo = (id, data) => {
        dispatch(todoActions.editToDo(id, data))
    }

    const todos = useSelector(state => state);

    return {
        todos,
        addTodo,
        deleteTodo,
        editTodo
    }
}