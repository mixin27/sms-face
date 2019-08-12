import history from "../router/history";
import { noti } from "../utils/index";
import {
  FETCH_DAILY_REPORTS
  // FETCH_DEPARTMENT_ID,
  // FETCH_DEPARTMENT
} from "./types";

import api from "../apis";
import { encryptId } from "../utils";

export const fetchDailyReport = () => async dispatch => {
  try {
    const res = await api.get(`daily-reports`);
    if (res.data) {
      dispatch({ type: FETCH_DAILY_REPORTS, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};

export const postDailyReport = data => async dispatch => {
  try {
    const res = await api.post(`daily-reports`, data);
    if (res.data.status == "success") {
      const disres = await api.get("daily-reports");
      if (disres.data.status == "success") {
        dispatch({ type: FETCH_DAILY_REPORTS, payload: disres.data.data });
        noti(
          "success",
          "Successfully!",
          "Daily Report has been created Successfully."
        );
      }
    } else {
      noti("error", "Unsuccessfully", "Fail to create.");
    }
  } catch (error) {
    // noti('error', 'Error', 'Cannot get data from server!!!')
    noti("error", "Error", "Duplicate Data Entry. Please Try again!!!");
  }
};

export const fetchDailyReportByJobCode = job_code => async dispatch => {
  try {
    const res = await api.get(`daily-reports/report/${job_code}`);
    if (res.data) {
      dispatch({ type: FETCH_DAILY_REPORTS, payload: res.data.data });
    } else {
      //Alert message
    }
  } catch (error) {
    noti("error", "Error", "Cannot get data from server!!!");
  }
};
