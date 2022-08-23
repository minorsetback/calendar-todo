import { useState } from "react"
import { isSameDay, getDaysInMonth, add, isWithinInterval, startOfMonth, lastDayOfMonth, isToday, isWeekend, getYear } from 'date-fns'


const useCalendar = () => {
    let date = new Date();

    const [currentMonthOfCalendar, setCurrentMonthOfCalendar] = useState({})
    const [currentMonth, setCurrentMonth] = useState('')
    const [currentYear, setCurrentYear] = useState('')
    const [selectedDay, setSelectedDay] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

    const DAYS_IN_WEEK = 7;

    const switchMonth = (number = 0) => {
        const result = add(date, {
            months: number,
        })

        setCurrentMonth(result.getMonth());
        setCurrentYear(getYear(result));

        function cloneDate(date) {
            return new Date(date.getTime())
        }

        function getDays(date) {
            let daysInMonth = getDaysInMonth(date)
            let days = []
            for (let index = 1; index <= daysInMonth; index++) {
                let selectedDateMonthArray = new Date(date.getFullYear(), date.getMonth(), index)
                days.push(selectedDateMonthArray)
            }
            return days
        }

        function getWeeks(date, { firstDayOfWeek = 0 } = {}) {
            let days = getDays(date)
            let week = []
            let weeks = []

            days.forEach(day => {
                if (week.length > 0 && day.getDay() === firstDayOfWeek) {
                    weeks.push(week)
                    week = []
                }
                week.push(day)
                if (days.indexOf(day) === days.length - 1) {
                    weeks.push(week)
                }
            })

            const firstWeek = weeks[0]
            for (let index = DAYS_IN_WEEK - firstWeek.length; index > 0; index--) {
                const outsideDate = cloneDate(firstWeek[0])
                outsideDate.setDate(firstWeek[0].getDate() - 1)
                firstWeek.unshift(outsideDate)
            }

            const lastWeek = weeks[weeks.length - 1]
            for (let index = lastWeek.length; index < DAYS_IN_WEEK; index++) {
                const outsideDate = cloneDate(lastWeek[lastWeek.length - 1])
                outsideDate.setDate(lastWeek[lastWeek.length - 1].getDate() + 1)
                lastWeek.push(outsideDate)
            }

            let monthOfCalendar = weeks.map((week) => {
                return week.map((day) => {
                    return {
                        value: day,
                        isFaded: !isWithinInterval(day, { start: startOfMonth(result), end: lastDayOfMonth(result) }),
                        isSelected: false,
                        isToday: isToday(day),
                        isWeekend: isWeekend(day)
                    }
                })
            });

            return monthOfCalendar
        }

        let arrayMonth = getWeeks(result)
        setCurrentMonthOfCalendar(arrayMonth);
    }

    const selectDay = (date) => {
        let newCalendarMonth = [...currentMonthOfCalendar];
        newCalendarMonth.forEach((week) => {
            week.forEach((day) => {
                if (day.isSelected) {
                    day.isSelected = false;
                }
                if (isSameDay(day.value, date)) {
                    day.isSelected = true;
                }
                setSelectedDay(date)
            })
        })
        setCurrentMonthOfCalendar(newCalendarMonth)
    };

    return {
        currentMonthOfCalendar,
        selectDay,
        currentMonth,
        currentYear,
        switchMonth,
        selectedDay
    }
}

export default useCalendar