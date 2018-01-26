
export const selectUser = (user) => {
  console.log('You clicked on: ', user.first_name, user.last_name);
  return {
    type: 'USER_SELECTED',
    payload: user
  }
}
