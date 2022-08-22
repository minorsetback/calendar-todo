import React from 'react'
import { getDate } from 'date-fns'
import styles from '../styles/Calendar.module.scss'
import { Link } from 'react-router-dom'
import { useTodo } from '../hooks/useTodo'
const CalendarDays = ({ currentMonthOfCalendar, selectDay }) => {
    const { todos } = useTodo()

    return (
        <tbody>
            {Array.isArray(currentMonthOfCalendar) ? (currentMonthOfCalendar.map((week, index) => {
                return (
                    <tr className={styles.calendar_week} key={index}>
                        {week.map((day) => {
                            const { value, isFaded, isSelected, isToday, isWeekend } = day;
                            let classValue = `calendar_day ${isFaded ? 'faded' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'day_today' : ''} ${isWeekend ? 'weekend' : ''}`;
                            let className = classValue.replace(/\s+/g, ' ').trim()
                            let sort = todos.todo.todo.filter(item => new Date(item.date).toISOString() === new Date(value).toISOString())
                            return (
                                <td
                                    key={value}
                                    value={value}
                                    onClick={(e) => { selectDay(value) }}
                                >
                                    <Link to={`/${new Date(value).toISOString()}`} style={{ textDecoration: 'none', color: "white" }}>
                                        <span
                                            className={className}>
                                            {getDate(value)}
                                            <div>
                                                <ul>
                                                    {sort.map((item, index) => <li key={index} className={styles.tasks}>{item?.title}</li>)}
                                                    <li style={{ display: sort.length > 1 ? "block" : "none" }} className={styles.count__todos}><span>And {sort.length} taskts</span></li>
                                                </ul>
                                            </div>
                                        </span>
                                    </Link>
                                </td>
                            )
                        })}
                    </tr>
                )
            })
            ) : null}
        </tbody >
    )
}

export default CalendarDays