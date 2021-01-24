import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js"



export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    return setName("") + setInterviewer(null);
  }

  const cancel = function() {
    return reset() + props.onCancel();
  }
  
    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              /*
                This must be a controlled component
              */
            />
          </form>
          <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} onChange={(event) => setInterviewer(event)} value={interviewer}/>
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick= {cancel}>Cancel</Button>
            <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
          </section>
        </section>
      </main>
    );
}


