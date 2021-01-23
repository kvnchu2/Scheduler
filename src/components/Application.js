import "components/Application.scss";
import DayList from "components/DayList.js"
import React, { useEffect, useState } from "react";
import Appointment from "components/Appointment";
import axios from 'axios';
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js"




export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.day);

  //id is appointment id and interview is student name and interviewer id 
  function bookInterview(id, interview) {
    const appointment = {
      //gets the entire appointments object based on id
      ...state.appointments[id],
      //replaces interview with new interview object
      interview: { ...interview }
    };
    //adds new appointment object into new appointments array
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //maintains previous state, and adds new appointment state 
    setState({...state, appointments})
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview});
  }
  
  function cancelInterview(id) {
    
  return  axios.delete(`http://localhost:8001/api/appointments/${id}`)
  }

  function canInt(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState({...state, appointments})
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      console.log(all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])


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
      {dailyAppointments.map(appointment => {
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
      })} 


      </section>
    </main>
  );
}
