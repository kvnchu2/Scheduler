import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js"



export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    return setName("") + setInterviewer(null);
  }

  const cancel = function() {
    return reset() + props.onCancel();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
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
              data-testid="student-name-input"
              /*
                This must be a controlled component
              */
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} onChange={(event) => setInterviewer(event)} value={interviewer}/>
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick= {cancel}>Cancel</Button>
            <Button confirm onClick={() => validate()}>Save</Button>
          </section>
        </section>
      </main>
    );
}


