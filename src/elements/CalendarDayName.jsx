import React from 'react'

import styles from '../styles/Calendar.module.scss'

const CalendarDayName = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <thead>
            <tr>
                {
                    dayNames.map((day, index) => {
                        return (<th
                            className={styles.day_name}
                            key={index}>
                            {day}
                        </th>)
                    })
                }
            </tr>
        </thead>
    )
}

export default CalendarDayName