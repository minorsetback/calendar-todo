import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/Calendar.module.scss'

const CalendarHeader = ({ currentMonth, currentYear, switchMonth }) => {
    const [count, setCount] = useState(0)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        switchMonth(count);
        // eslint-disable-next-line
    }, [count]);

    const incMonths = () => {
        setCount(prev => prev + 1);
    }

    const decMonths = () => {
        setCount(prev => prev - 1);
    }

    return (
        <div className={styles.calendar__header}>
            <button className={styles.addition_btn} onClick={decMonths}>
                <img src="./arrow.svg" className={styles.left_arrow} alt="left arrow" width={32} height={32} />
            </button>
            <p className={styles.calendar__header_title}>{monthNames[currentMonth]} {currentYear}</p>
            <button className={styles.subtraction_btn} onClick={incMonths}>
                <img src="./arrow.svg" alt="left arrow" width={32} height={32} />
            </button>
        </div>
    )
}

export default CalendarHeader