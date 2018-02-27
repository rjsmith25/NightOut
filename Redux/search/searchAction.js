export function setSearchString(searchString){
   return {
     type: 'SET_SEARCH_STRING',
     payload: {
       searchString: searchString
     }
   }
}

export function clearSearchString(){
  return {
    type: 'CLEAR_SEARCH_STRING',
    payload: {
      searchString: ''
    }
  }
}
