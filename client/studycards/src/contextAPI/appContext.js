import axios from "axios";
import "../axios";
import React, { useContext, useEffect, useReducer } from "react";
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_ERROR,
  CREATE_COLLECTION_SUCCESS,
  CREATE_COLLECTION_ERROR,
  OPEN_ALERT,
  DELETE_COLLECTION_ERROR,
  FETCH_SINGLE_COLLECTION_ERROR,
  FETCH_SINGLE_COLLECTION_SUCCESS,
  /*
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR, */
} from "./actions";
import reducer from "./reducer";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  collections: [],
  collection:[],  //single collection
  errorMsg: "",
  openAlert: false,
  showError: false,
  showAlert: false,
  showCtnAlert: false,
  showLogOutAlert: false,
  editItem: null,
  editComplete: false,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const closeAlert = () => {
    dispatch({ type: OPEN_ALERT });
  };

  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/register`, {
        ...userInput,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
    }
  };

  // login
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      });
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };

  ///fetch jobs
  const fetchCollections = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/collection`);
      dispatch({ type: FETCH_COLLECTIONS_SUCCESS, payload: data.collections });
    } catch (error) {
      dispatch({ type: FETCH_COLLECTIONS_ERROR });
      logout();
    }
  };

  //create collection
  const createCollection = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/collection`, {
        ...userInput,
      });

      dispatch({ type: CREATE_COLLECTION_SUCCESS, payload: data.collections });
    } catch (error) {
      dispatch({ type: CREATE_COLLECTION_ERROR });
    }
  };

  const deleteCollection = async (ctnId) => {
    setLoading();
    try {
      await axios.delete(`/collection/${ctnId}`);

      fetchCollections();
    } catch (error) {
      dispatch({ type: DELETE_COLLECTION_ERROR });
    }
  };

  const fetchSingleCollection = async (ctnId) => {
    setLoading();
    createCollection();
    dispatch({
      type: FETCH_SINGLE_COLLECTION_SUCCESS,
      payload: ctnId,
    });
  };

  /*
  
  const fetchSingleJob = async (jobId) => {
    setLoading();
    try {
      const { data } = await axios.get(`/jobs/${jobId}`);
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR });
    }
  };
  const editJob = async (jobId, userInput) => {
    setLoading();
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      });
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR });
    }
  };
 */

  const loadUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  };

  // set user
  /* useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  }, []); */
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchCollections,
        createCollection,
        closeAlert,
        deleteCollection,
        loadUser,
        fetchSingleCollection,
        /* fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob, */
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
