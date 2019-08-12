import history from "../router/history";
import { noti } from "../utils/index";
import {
  FETCH_DEPARTMENTS
  // FETCH_DEPARTMENT_ID,
  // FETCH_DEPARTMENT
} from "./types";

import api from "../apis";
import { encryptId } from "../utils";
export const fetchDepartment = () => async dispatch => {
  try {
    const res = await api.get(`departments`);
    if (res.data) {
      dispatch({ type: FETCH_DEPARTMENTS, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const putDepartment = (data, id) => async dispatch => {
  try {
    const res = await api.put(`departments/${id}`, data);
    if (res.data.status == "success") {
      const dep = await api.get(`departments`);
      if (dep.data.status == "success") {
        dispatch({ type: FETCH_DEPARTMENTS, payload: dep.data.data });
        noti(
          "success",
          "Successfully!",
          "Department has been updated successfully."
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

export const postDepartment = data => async dispatch => {
  try {
    const res = await api.post(`departments`, data);
    if (res.data.status == "success") {
      const disres = await api.get("departments");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_DEPARTMENTS, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Department has been created Successfully."
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

export const deleteDepartment = id => async dispatch => {
  try {
    const res = await api.delete(`departments/${id}`);
    if (res.data.status == "success") {
      const disres = await api.get("departments");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_DEPARTMENTS, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Department has been deleted successfully."
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