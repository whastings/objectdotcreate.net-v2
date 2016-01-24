import { addUser } from 'app/actions/userActions';
import { setCurrentUserId } from 'app/actions/uiActions';

export function signIn(api, store, dispatchAction, username, password) {
  return {
    type: 'SIGN_IN',
    payload: {
      promise: api.createSession(username, password)
        .then((session) => (action, dispatch) => {
          let { user } = session;
          dispatchAction(addUser, user);
          dispatchAction(setCurrentUserId, user.id);
        })
    }
  };
}
