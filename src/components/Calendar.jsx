import React from 'react'
import useCalendar from '../hooks/useCalendar.js'
import CalendarHeader from '../elements/CalendarHeader.jsx';
import CalendarDayName from '../elements/CalendarDayName.jsx';
import CalendarDays from '../elements/CalendarDays.jsx';
import styles from '../styles/Calendar.module.scss'
import { useTodo } from '../hooks/useTodo.js';
import { Link } from 'react-router-dom';

const Calendar = () => {
    const {
        currentMonthOfCalendar,
        selectDay,
        currentMonth,
        currentYear,
        switchMonth,
    } = useCalendar();

    return (
        <section className={styles.calendar}>
            <div className={styles.calendar__container} >
                <CalendarHeader currentMonth={currentMonth} currentYear={currentYear} switchMonth={switchMonth} />
                <table className={styles.calendar__body} cellSpacing="0" cellPadding="0">
                    <CalendarDayName />
                    <CalendarDays currentMonthOfCalendar={currentMonthOfCalendar} selectDay={selectDay} />
                </table>
            </div>
        </section>
    )
}

export default Calendar