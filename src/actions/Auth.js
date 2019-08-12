import api from "../apis";
import { SIGN_IN, SIGN_UP, SIGN_OUT, CURRENT_USER, LOADING } from "./types";
import {
  noti,
  setUserInfo,
  getUserInfo,
  setUserToken,
  getUserToken
} from "../utils";

// export const signIn = (data) => async dispatch => {
//     dispatch({ type: LOADING, isloaded: true })
//     try{
//         const res = await api.post(`/Account/Login`, data);
//             if(res.data.success) {
//                 dispatch({ type: SIGN_IN, payload: res.data.data,rolename: res.data.rolename })
//                 dispatch({ type: LOADING, isloaded: false })
//                 setUserInfo(res.data.data)
//                 setUserToken(res.data.token)
//                 noti('close')
//                 noti('success','Successfully!',res.data.msg)
//             }else{
//                 //Alert message
//                 noti('error','Unsuccessfully!',res.data.msg)
//                 dispatch({ type: LOADING, isloaded: false })
//             }
//         }catch (error) {
//                 noti('error','Unsuccessfully','Connection Time Out!!!')
//                 dispatch({ type: LOADING, isloaded: false })
//         }
// }

// =============================================================================

export const signIn = data => async dispatch => {
  dispatch({ type: LOADING, isloaded: true });
  try {
    //try to authentication
    const res = await api.post(`/auth/login`, data);
    //if user exists
    console.log("Response", res);

    if (res.data.status === "success") {
      console.log(res.data.data.role);

      dispatch({
        type: SIGN_IN,
        payload: res.data.data,
        rolename: res.data.data.role
      });
      dispatch({ type: LOADING, isloaded: false });
      setUserInfo(res.data.data);
      setUserToken(res.data.token);
      noti("close");
      noti("success", "Successfully!", res.data.msg);
    } else {
      //Alert message
      noti("error", "Unsuccessfully!", res.data.msg);
      dispatch({ type: LOADING, isloaded: false });
    }
  } catch (error) {
    noti("error", "Unsuccessfully", "Connection Time Out!!!");
    dispatch({ type: LOADING, isloaded: false });
  }
};

export const currentUser = () => async dispatch => {
  try {
    var saveData = getUserInfo();
    var saveToken = getUserToken();
    if (saveData) {
      api.defaults.headers.common["Authorization"] = `Bearer ${saveToken}`;
      const res = await api.get(`/users/${saveData.id}`);
      console.log(res.data.data);

      if (res.data) {
        dispatch({
          type: CURRENT_USER,
          payload: res.data.data,
          rolename: res.data.data.role
        });
        setUserInfo(res.data.data);
      } else {
        //Alert message
        localStorage.clear();
        dispatch({ type: SIGN_OUT });
      }
    } else {
      localStorage.clear();
      dispatch({ type: SIGN_OUT });
    }
  } catch (error) {
    localStorage.clear();
    dispatch({ type: SIGN_OUT });
  }
};
export const signOut = () => async dispatch => {
  localStorage.clear();
  dispatch({ type: SIGN_OUT });
  noti("success", "Successfully!", "Successfully sign out");
};

// ================================================================================================

export const signUp = data => async dispatch => {
  const res = await api.post(`/signup`, data);
  if (res.data.success) {
    dispatch({ type: SIGN_UP, payload: res.data.currentuser });
    setUserInfo(res.data.currentuser);
  } else {
    //Alert message
  }
};

// export const currentUser = () => async dispatch => {
//     try{
//         var saveData = getUserInfo()
//         var saveToken = getUserToken()
//         if(saveData) {
//             api.defaults.headers.common['Authorization'] = `Bearer ${saveToken}`
//             const res = await api.get(`Account/CurrentUser?id=${saveData.id}`)
//             if(res.data) {
//                 dispatch({ type: CURRENT_USER, payload: res.data.data, rolename : res.data.rolename })
//                 setUserInfo(res.data.data)
//             }else{
//                 //Alert message
//                 localStorage.clear()
//                 dispatch({type: SIGN_OUT})
//             }
//         }else{
//             localStorage.clear()
//             dispatch({type: SIGN_OUT})
//         }
//     }
//     catch(error){
//         localStorage.clear()
//         dispatch({type: SIGN_OUT})
//     }
// }
// export const signOut = () => async dispatch => {
//     localStorage.clear()
//     dispatch({ type: SIGN_OUT })
//     noti('success','Successfully!','Successfully sign out')
// }
