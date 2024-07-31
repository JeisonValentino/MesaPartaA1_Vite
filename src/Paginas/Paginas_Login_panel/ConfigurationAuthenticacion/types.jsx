export  const SET_CURRENT_USER="SET_CURRENT_USER";

export const UPDATE_TIME_REMAINING = 'UPDATE_TIME_REMAINING';

export const updateTimeRemaining = (time) => ({
  type: UPDATE_TIME_REMAINING,
  payload: time,
});