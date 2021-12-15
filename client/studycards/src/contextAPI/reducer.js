import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_USER,
  LOGOUT_USER,
  SET_LOADING,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_ERROR,
  CREATE_COLLECTION_SUCCESS,
  CREATE_COLLECTION_ERROR,
  OPEN_ALERT,
  DELETE_COLLECTION_ERROR,
  FETCH_SINGLE_COLLECTION_SUCCESS,
  FETCH_SINGLE_COLLECTION_ERROR,
  FETCH_STUDYCARDS_SUCCESS,
  FETCH_STUDYCARDS_ERROR,
  CREATE_STUDYCARD_SUCCESS,
  CREATE_STUDYCARD_ERROR,

  /*
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS, */
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false };
  }

  if (action.type === OPEN_ALERT) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      showError: false,
      openAlert: false,
      showLogOutAlert: false,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      openAlert: true,
      showError: false,
      showLogOutAlert: false,
      user: action.payload,
      isAuthenticated: true,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      showError: true,
      openAlert: true,
      errorMsg: action.payload,
    };
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload, isAuthenticated: true };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      showAlert: false,
      showLogOutAlert: true,
      jobs: [],
      isEditing: false,
      editItem: null,
    };
  }

  if (action.type === FETCH_COLLECTIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,

      collections: action.payload,
    };
  }
  if (action.type === FETCH_COLLECTIONS_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === CREATE_COLLECTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      collections: [...state.collections, action.payload],
      showCtnAlert: true,
      openAlert: true,
    };
  }
  if (action.type === CREATE_COLLECTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showError: true,
      openAlert: true,
    };
  }

  if (action.type === DELETE_COLLECTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === FETCH_SINGLE_COLLECTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      collection: state.collections.filter(
        (collection) => collection._id === action.payload
      ),
    };
  }
  if (action.type === FETCH_SINGLE_COLLECTION_ERROR) {
    return { ...state, isLoading: false, editItem: "", singleJobError: true };
  }

  if (action.type === CREATE_STUDYCARD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      openAlert: true,
    };
  }

  if (action.type === CREATE_STUDYCARD_ERROR) {
    return { ...state, isLoading: false, showError: true };
  }

  if (action.type === FETCH_STUDYCARDS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      flashcards: action.payload,
    };
  }
  if (action.type === FETCH_STUDYCARDS_ERROR) {
    return { ...state, isLoading: false };
  }

  /*

  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    return { ...state, isLoading: false, editItem: action.payload }
  }
  if (action.type === FETCH_SINGLE_JOB_ERROR) {
    return { ...state, isLoading: false, editItem: '', singleJobError: true }
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: 
      false,
      editComplete: true,
      editItem: action.payload,
    }
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true, 
    }*/

  throw new Error(`no such action : ${action}`);
};

export default reducer;
