import fetch from 'isomorphic-fetch'

export default const http = {
  get(url, action){
    return (dispatch,state) => {
      return handleResponse(fetch(url), dispatch, action) //http://www.reddit.com/r/reactjs.json
    }
  },
  post(url, data, action){
    return (dispatch,state) => {
      dispatch({type: LOADING})
      return handleResponse(fetch(url, {
          method: 'post',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: data
        }), dispatch, action)
    }
  }
}
