export default function (state={}, action) {
  switch(action.type) {
    case 'USER_SELECTED':
      return action.payload;
    default:
      break;
  }
  return state;
}
