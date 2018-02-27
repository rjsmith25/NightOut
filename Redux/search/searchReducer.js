const initialState = ''

export default function search(state = initialState, action) {
  switch(action.type){
    case 'SET_SEARCH_STRING':
      return action.payload.searchString;
    case 'CLEAR_SEARCH_STRING':
      return action.payload.searchString;
    default:
      return state
  }
}
