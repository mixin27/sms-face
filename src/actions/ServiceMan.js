// import history from '../router/history';
import { noti } from "../utils/index";
import {
  FETCH_SERVICE_MEN,
  FETCH_SERVICE_MAN
} from "./types";

import api from "../apis";
// import { encryptId } from '../utils'
export const fetchServiceMen = () => async dispatch => {
  try {
    const res = await api.get(`service-men`);
    if (res.data) {
      dispatch({ type: FETCH_SERVICE_MEN, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const putServiceMan = (data, id) => async dispatch => {
  try {
    const res = await api.put(`service-men/${id}`, data);
    if (res.data.status == "success") {
      const dep = await api.get(`service-men`);
      if (dep.data.status == "success") {
        dispatch({ type: FETCH_SERVICE_MEN, payload: dep.data.data });
        noti(
          "success",
          "Successfully!",
          "Service Man has been updated successfully."
        );
      }
    } else {
      noti("error", "Unsuccessfully!", "Fail to update.");
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const postServiceMan = data => async dispatch => {
  try {
    const res = await api.post(`service-men`, data);
    if (res.data.status == "success") {
      const disres = await api.get("service-men");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_SERVICE_MEN, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Service Man has been created Successfully."
        );
      }
    } else {
      noti("error", "Unsuccessfully", "Fail to create.");
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const deleteServiceMan = id => async dispatch => {
  try {
    const res = await api.delete(`service-men/${id}`);
    if (res.data.status == "success") {
      const disres = await api.get("service-men");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_SERVICE_MEN, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Service Man has been deleted successfully."
        );
      }
    } else {
      //Alert message
      noti("error", "Unsuccessfully!", "Fail to delete.");
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};
