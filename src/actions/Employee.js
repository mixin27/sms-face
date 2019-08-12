// import history from '../router/history';
import { noti } from "../utils/index";
import {
  FETCH_EMPLOYEES
  // FETCH_DEPARTMENT_ID,
  // FETCH_DEPARTMENT
} from "./types";

import api from "../apis";
// import { encryptId } from '../utils'
export const fetchEmployee = () => async dispatch => {
  try {
    const res = await api.get(`employee`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

// Service Men
export const fetchServiceMen = position => async dispatch => {
  try {
    const res = await api.get(`employee/service-men/${position}`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const fetchEmployeeByEmail = email => async dispatch => {
  try {
    const res = await api.get(`employee/employee/${email}`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const fetchEmployeeByName = name => async dispatch => {
  try {
    const res = await api.get(`employee/employee/user/${name}`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

// Available Service Men
export const fetchServiceMenAvailable = position => async dispatch => {
  try {
    const res = await api.get(`employee/positions/${position}`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

// Fetch employee by emp_code
export const fetchEmployeeByEmpCode = emp_code => async dispatch => {
  try {
    const res = await api.get(`employee/employee/${emp_code}`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

// Fetch service man by status
export const fetchServiceManByStatus = status => async dispatch => {
  try {
    const res = await api.get(`employee/status/${status}`);
    if (res.data) {
      dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const putEmployee = (data, id) => async dispatch => {
  try {
    const res = await api.put(`employee/${id}`, data);
    if (res.data.status == "success") {
      const dep = await api.get(`employee`);
      if (dep.data.status == "success") {
        dispatch({ type: FETCH_EMPLOYEES, payload: dep.data.data });
        noti(
          "success",
          "Successfully!",
          "Employee has been updated successfully."
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

export const postEmployee = data => async dispatch => {
  try {
    const res = await api.post(`employee`, data);
    if (res.data.status == "success") {
      const disres = await api.get("employee");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_EMPLOYEES, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Employee has been created Successfully."
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

export const deleteEmployee = id => async dispatch => {
  try {
    const res = await api.delete(`employee/${id}`);
    if (res.data.status == "success") {
      const disres = await api.get("employee");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_EMPLOYEES, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Employee has been deleted successfully."
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
