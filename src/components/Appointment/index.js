import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import useVisualMode from "../../hooks/useVisualMode.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE= "ERROR_SAVE";
  const ERROR_DELETE="ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
   transition(SAVING, true);
   setTimeout(function() {
    props.bookInterview(props.id, interview)
      .then(() =>  transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));} 
    , 2000)
  }

  function deleting() {
    transition(DELETING, true)
    setTimeout(function() {
      props.cancelInterview(props.id)
        .then(() => {props.canInt(props.id); transition(EMPTY)})
        .catch(error => transition(ERROR_DELETE, true))
      }, 2000)
  }


    return (
      <article className="appointment" data-testid="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleting} />}
        {mode === SAVING && <Status message="Saving" /> }
        {mode === DELETING && <Status message="Deleting"/>}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={ save } />}
        {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => back()}/>}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => back()} />}
        {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer} onCancel={() => back()} onSave={ save } />}
      </article>
    );

}