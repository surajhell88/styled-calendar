import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';

import { getCalendar, CONSTANTS } from './utils';
import { Calendar } from './blocks';
import { Wrapper, Grid } from './elements';

injectGlobal`
  body {
    background-color: #fdfdfd;
  }
`;

const { MONTH_LIST, DAY_LIST, MONTH_LIST_SHORT } = CONSTANTS;

class CalendarApp extends Component {
  today = new Date();
  currentYear = this.today.getFullYear();
  currentMonth = this.today.getMonth();
  originalMonth = this.currentMonth;
  originalYear = this.currentYear;
  originalDate = this.today.getDate();

  constructor(props, context) {
    super(props, context);
    this.state = {
      calendar: {},
      month: MONTH_LIST[this.currentMonth],
      year: this.currentYear,
    };
  }

  componentDidMount() {
    this.fillCalendar();
  }

  fillCalendar = () => {
    this.setState({
      calendar: getCalendar(this.currentMonth, this.currentYear),
      month: MONTH_LIST[this.currentMonth],
      year: this.currentYear
    });
  };

  goToNextMonth = () => {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
    this.fillCalendar();
  };

  whereIWas = () => {
    this.currentMonth = this.originalMonth;
    this.fillCalendar();
  };

  goToPrevMonth = () => {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
    this.fillCalendar();
  };

  render() {
    const {
      calendar: {
        prev = [],
        current = [],
        next = []
      },
      month,
      year
    } = this.state;

    const {
      currentMonth,
      currentYear,
      originalMonth,
      originalYear,
      originalDate,
      goToPrevMonth,
      whereIWas,
      goToNextMonth
    } = this;

    return (
      <Wrapper>
        <Calendar.Header month={month} year={year} goToPrevMonth={goToPrevMonth} whereIWas={whereIWas} goToNextMonth={goToNextMonth} />
        <div>
          <Grid>
            {
              DAY_LIST.map((day, index) =>
                <Calendar.Day key={index}>{day}</Calendar.Day>
              )
            }
          </Grid>
          <Grid>
            {
              prev.map((day, index) =>
                <Calendar.DateComp gray key={index}>{day}</Calendar.DateComp>
              )
            }
            {
              current.map((day, index) => {
                const whatALovelyDay = (day === 1 ? `${day} ${MONTH_LIST_SHORT[currentMonth]}` : day);
                if (
                  originalMonth === currentMonth &&
                  originalYear === currentYear &&
                  originalDate === day
                ) {
                  return (
                    <Calendar.DateComp key={index}>
                      <Calendar.Today>{whatALovelyDay}</Calendar.Today>
                    </Calendar.DateComp>
                  );
                }
                return <Calendar.DateComp key={index}>{whatALovelyDay}</Calendar.DateComp>
              })
            }
            {
              next.map((day, index) => {
                const nextMonth = currentMonth + 1;
                const whatALovelyDay = (day === 1 ? `${day} ${
                  MONTH_LIST_SHORT[nextMonth > 11 ? 0 : nextMonth]}
                ` : day);
                return <Calendar.DateComp gray key={index}>{whatALovelyDay}</Calendar.DateComp>
              })
            }
          </Grid>
        </div>
      </Wrapper>
    );
  }
}

export default CalendarApp;
