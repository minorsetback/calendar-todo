import React, { useState, useEffect } from 'react'
import useCalendar from '../hooks/useCalendar.js'
import CalendarHeader from '../elements/CalendarHeader.jsx';
import CalendarDayName from '../elements/CalendarDayName.jsx';
import CalendarDays from '../elements/CalendarDays.jsx';
import styles from '../styles/Calendar.module.scss'
import { useTodo } from '../hooks/useTodo.js';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Calendar = () => {
    const {
        currentMonthOfCalendar,
        selectDay,
        currentMonth,
        currentYear,
        switchMonth
    } = useCalendar();

    const { todos } = useTodo();
    const [value, setValue] = useState(new Date());
    const today = new Date().toLocaleDateString();
    const filteredTodo = todos.todo.todo.filter(item => new Date(item.date).toLocaleDateString() === today);
    const [notificationShow, setNotificationShow] = useState(false)
    const [notificationTodoData, setNotificationTodoData] = useState()
    const [timeNotification, setTimeNotification] = useState()

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 3000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        filteredTodo.forEach(item => {
            const [hour, minute] = value.toLocaleTimeString().split(':')
            if (`${hour}:${minute}` === item.notification && timeNotification !== minute) {
                setNotificationShow(true)
                setNotificationTodoData(item)
                setTimeNotification(minute)
            }
        })
        // eslint-disable-next-line
    }, [value])

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificationShow(false)
        }, 10000);
        return () => clearTimeout(timer);
    }, [notificationShow]);

    return (
        <>
            <section className={styles.calendar}>
                <div className={styles.calendar__container} >
                    <CalendarHeader currentMonth={currentMonth} currentYear={currentYear} switchMonth={switchMonth} />
                    <table className={styles.calendar__body} cellSpacing="0" cellPadding="0">
                        <CalendarDayName />
                        <CalendarDays currentMonthOfCalendar={currentMonthOfCalendar} selectDay={selectDay} />
                    </table>
                </div>
            </section>
            <ToastContainer style={{ display: notificationShow ? 'block' : 'none' }} position="top-end">
                <Toast onClose={() => setNotificationShow(false)} bg='info'>
                    <Toast.Header>
                        <img src="favicon.ico" className="rounded me-2" alt="" style={{ width: "30px", height: "30px" }} />
                        <strong className="me-auto">{notificationTodoData?.title}</strong>
                        <small>Start {notificationTodoData?.timeStart}</small>
                    </Toast.Header>
                    <Toast.Body>{notificationTodoData?.description}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default Calendar