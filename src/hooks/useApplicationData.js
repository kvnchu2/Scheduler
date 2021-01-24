import { getInterview, getInterviewersForDay } from "helpers/selectors.js"
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  });
  let iden;
  if (state.day === "Monday") {
    iden = 0;
  } else if (state.day === "Tuesday") {
    iden = 1;
  } else if (state.day === "Wednesday") {
    iden = 2;
  } else if (state.day === "Thursday") {
    iden = 3; 
  } else if (state.day === "Friday") {
    iden = 4; 
  } 

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
    
    const day = {
      ...state.days.filter(x => x.appointments.indexOf(id) !== -1)[0],
      spots: state.days.filter(x => x.appointments.indexOf(id) !== -1)[0]['spots'] - 1
    }
    const days = [...state.days];
    days[iden] = day;
    
    //maintains previous state, and adds new appointment state 
    setState({...state, appointments, days})
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview});
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

    const day = {
      ...state.days.filter(x => x.appointments.indexOf(id) !== -1)[0],
      spots: state.days.filter(x => x.appointments.indexOf(id) !== -1)[0]['spots'] + 1
    }
    const days = [...state.days];
    days[iden] = day;
    
    //maintains previous state, and adds new appointment state 
    setState({...state, appointments, days})
  }

  function cancelInterview(id) {
    
    return  axios.delete(`http://localhost:8001/api/appointments/${id}`)
    }
  
    
  
  const setDay = day => setState({ ...state, day });

  return { setDay, cancelInterview, canInt, bookInterview, state};
}