export function getAppointmentsForDay(state, day) {
  const filteredObj = state.days.filter(x => x.name === day);

  if (state.days.length === 0 || filteredObj.length === 0) {
    return [];
  } else {
    
    const filteredArr=[];
    filteredObj[0].appointments.forEach(x => filteredArr.push(state.appointments[x.toString()]));
    return filteredArr;
  }

}



export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  } else {
  const newInterview = {...interview}
  for ( let x in state.interviewers) {
    if(state.interviewers[x]['id'] === interview.interviewer) {
      newInterview.interviewer = state.interviewers[x];
    }
  }

    return newInterview;
  }
}

export function getInterviewersForDay(state, day) {
  const filteredObj = state.days.filter(x => x.name === day);

  if (state.days.length === 0 || filteredObj.length === 0) {
    return [];
  } else {
    
    const filteredArr=[];
    filteredObj[0].interviewers.forEach(x => filteredArr.push(state.interviewers[x.toString()]));
    return filteredArr;
  }

}
