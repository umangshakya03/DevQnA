import * as api from '../api'

export const updateCurrentUser = (data) => async (dispatch) => {
  // get current user from local storage and update the user data in local storage
  const currentUser = JSON.parse(localStorage.getItem('Profile'));
  // get latest user data from data
  const updatedUser = data.find(user => user._id === currentUser.result._id);
  // update user data in local storage
  localStorage.setItem('Profile', JSON.stringify({...currentUser, result: updatedUser}));
  dispatch({type: 'UPDATE_CURRENT_USER', payload: {result: updatedUser}});
}

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
    dispatch(updateCurrentUser(data));
  } catch (error) {
    console.log(error);
  }
};


export const updateProfile = (id, updatedData) => async (dispatch) => {
  try {
    await api.updateProfile(id, updatedData)
    dispatch(fetchAllUsers())
  } catch (error) {
    console.log(error)
  }
}