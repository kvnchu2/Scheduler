import "components/Application.scss";
import DayList from "components/DayList.js"
import React, { useEffect, useState } from "react";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js"
import useApplicationData from "../hooks/useApplicationData.js"




export default function Application(props) {
  const { setDay, cancelInterview, canInt, bookInterview, state } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state,state.day);


  const appointmentsObject = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const dailyInterviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      canInt={canInt}
    />
    );
  })



  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu" >
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {appointmentsObject} 
      <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
