import history from "../router/history";
import { noti } from "../utils/index";
import {
  FETCH_MACHINES
  // FETCH_DEPARTMENT_ID,
  // FETCH_DEPARTMENT
} from "./types";

import api from "../apis";
import { encryptId } from "../utils";
export const fetchMachine = () => async dispatch => {
  try {
    const res = await api.get(`machines`);
    if (res.data) {
      dispatch({ type: FETCH_MACHINES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const putMachine = (data, id) => async dispatch => {
  try {
    const res = await api.put(`machines/${id}`, data);
    if (res.data.status == "success") {
      const dep = await api.get(`machines`);
      if (dep.data.status == "success") {
        dispatch({ type: FETCH_MACHINES, payload: dep.data.data });
        noti(
          "success",
          "Successfully!",
          "Machine has been updated successfully."
        );
      }
    } else {
      noti("error", "Unsuccessfully!", "Fail to update.");
    }
  } catch (error) {
    // noti("error", "Error", "Cannot get data from server!!!");
    noti("error", "Unsuccessfully!", "Fail to update.");
  }
};

export const postMachine = data => async dispatch => {
  try {
    const res = await api.post(`machines`, data);
    if (res.data.status == "success") {
      const disres = await api.get("machines");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_MACHINES, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Machine has been created Successfully."
        );
      }
    } else {
      noti("error", "Unsuccessfully", "Fail to create.");
    }
  } catch (error) {
    // noti("error", "Error", "Cannot get data from server!!!");
    noti("error", "Error", "Duplicate Data Entry. Please Try again!!!");
  }
};

export const deleteMachine = id => async dispatch => {
  try {
    const res = await api.delete(`machines/${id}`);
    if (res.data.status == "success") {
      const disres = await api.get("machines");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_MACHINES, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Machine has been deleted successfully."
        );
      }
    } else {
      //Alert message
      noti("error", "Unsuccessfully!", "Fail to delete.");
    }
  } catch (error) {
    // noti("error", "Error", "Cannot get data from server!!!");
    noti("error", "Unsuccessfully!", "Fail to delete.");
  }
};