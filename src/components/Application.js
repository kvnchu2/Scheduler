import "components/Application.scss";
import DayList from "components/DayList.js"
import React, { useEffect, useState } from "react";
import Appointment from "components/Appointment";
import axios from 'axios';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  { id:3,
    time: "2pm",
    interview:{
      student:"Shawn Mendez",
      interviewer: {
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png", 
      }
    }
  },
  { id:4,
    time: "4pm",
    interview:{
      student:"Justin Bieber",
      interviewer: {
        id: 5, 
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg", 
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    const testURL= 'http://localhost:8001/api/days'
    axios.get(testURL).then(response => {
      console.log(response.data)
      return setDays([...response.data])
    })

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
        days={days}
        day={day}
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
      {appointments.map(appointment => {
        return (
          <Appointment key={appointment.id} {...appointment} />
        );
      })} 


      </section>
    </main>
  );
}
