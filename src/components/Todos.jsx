import { useTodo } from "../hooks/useTodo"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React from 'react';
import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai"
import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

const schema = yup.object({
    title: yup.string().required().min(5),
    description: yup.string().required(),
    timeStart: yup.string().required(),
    timeEnd: yup.string().required(),
    notification: yup.string().required()
}).required();

const Todos = () => {
    const { todos, addTodo, deleteTodo, editTodo } = useTodo()
    let { id } = useParams();
    const [todoId, setTodoId] = useState(null);
    const [show, setShow] = useState(false);
    const filteredTodo = todos.todo.todo.filter(item => item.date === id)

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const setEditId = (id) => {
        const todo = filteredTodo.filter(item => item.id === id)
        setValue('title', todo[0].title);
        setValue('description', todo[0].description);
        setValue('timeStart', todo[0].timeStart);
        setValue('timeEnd', todo[0].timeEnd);
        setValue('notification', todo[0].notification);
        setValue('done', todo[0].done);
        setValue('date', todo[0].date);
        setTodoId(id)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [show]);

    const onSubmit = data => {
        setShow(true)
        if (todoId) {
            editTodo(todoId, data)
            setTodoId(null)
        } else {
            addTodo(data)
        }
        reset()
    }
    return (
        <div className="mt-5 mx-auto" style={{ width: "600px" }}>
            <Form onSubmit={handleSubmit(onSubmit)} className='w-100 mb-5'>
                <Form.Group className="mb-3">
                    <Form.Label>Tile</Form.Label>
                    <Form.Control {...register("title")} type="text" placeholder="Title" />
                    <Form.Text bg="primary" className="text-muted">
                        {errors.title?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control {...register("description")} as="textarea" rows={3} placeholder="Description" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time start</Form.Label>
                    <Form.Control {...register("timeStart")} type='time' rows={3} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time end</Form.Label>
                    <Form.Control {...register("timeEnd")} type='time' rows={3} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Notification</Form.Label>
                    <Form.Control {...register("notification")} type='time' rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check {...register("done")} type="checkbox" label="Done?" />
                </Form.Group>
                <Form.Group className="mb-3 d-none">
                    <Form.Control {...register("date")} value={id} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {todoId ? "Edit Todo" : "Add ToDo"}
                </Button>
            </Form>
            <Alert variant="success" onClose={() => setShow(false)} dismissible style={{ display: show ? "block" : "none" }}>
                <Alert.Heading>Done</Alert.Heading>
            </Alert>
            {filteredTodo?.map((item) => {
                return (
                    <ListGroup.Item key={item.id}
                        as="li"
                        className={`d-flex mb-2 rounded justify-content-between align-items-start w-100 ${item.done ? "list-group-item-success" : "list-group-item-danger"}`}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold" style={{ cursor: "pointer" }}>{item.title}</div>
                            {item.description}
                        </div>
                        <BsFillTrashFill className='mt-3' style={{ cursor: "pointer" }} onClick={() => deleteTodo(item.id)} />
                        <AiOutlineEdit className='mt-3 m-2' style={{ cursor: "pointer" }} onClick={() => setEditId(item.id)} />
                    </ListGroup.Item>
                )
            })}
        </div>

    )
}
export default Todos