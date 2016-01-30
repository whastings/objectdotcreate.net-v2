import createReducer from 'app/utils/createReducer';

export default createReducer({
  USER_ADD: function addUser(state, action) {
    let newUser = action.payload;
    return state.merge({
      [newUser.id]: newUser
    });
  }
});