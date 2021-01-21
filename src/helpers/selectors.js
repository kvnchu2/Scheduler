export default function getAppointmentsForDay(state, day) {
  const filteredObj = state.days.filter(x => x.name === day);

  if (state.days.length === 0 || filteredObj.length === 0) {
    return [];
  } else {
    
    const filteredArr=[];
    filteredObj[0].appointments.forEach(x => filteredArr.push(state.appointments[x.toString()]));
    return filteredArr;
  }

}
