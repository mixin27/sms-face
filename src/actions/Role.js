import history from "../router/history";
import { noti } from "../utils/index";
import {
  FETCH_ROLES
  // FETCH_DEPARTMENT_ID,
  // FETCH_DEPARTMENT
} from "./types";

import api from "../apis";
import { encryptId } from "../utils";

export const fetchRoles = () => async dispatch => {
  try {
    const res = await api.get(`roles`);
    if (res.data) {
      dispatch({ type: FETCH_ROLES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const putRole = (data, id) => async dispatch => {
  try {
    const res = await api.put(`roles/${id}`, data);
    if (res.data.status == "success") {
      const dep = await api.get(`roles`);
      if (dep.data.status == "success") {
        dispatch({ type: FETCH_ROLES, payload: dep.data.data });
        noti(
          "success",
          "Successfully!",
          "Role has been updated successfully."
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

export const postRole = data => async dispatch => {
  try {
    const res = await api.post(`roles`, data);
    if (res.data.status == "success") {
      const disres = await api.get("roles");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_ROLES, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Role has been created Successfully."
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

export const deleteRole = id => async dispatch => {
  try {
    const res = await api.delete(`roles/${id}`);
    if (res.data.status == "success") {
      const disres = await api.get("roles");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_ROLES, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Role has been deleted successfully."
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