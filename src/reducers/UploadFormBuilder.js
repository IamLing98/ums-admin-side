import {
  UPLOAD_FORM_BUILDER_FAILURE,
  UPLOAD_FORM_BUILDER_REQUEST,
  UPLOAD_FORM_BUILDER_RESET,
  UPLOAD_FORM_BUILDER_SUCCESS,
} from "Actions/types";

export default (
  state = {
    isUploading: false,
    uploaded: false,
  },
  action
) => {
  switch (action.type) {
    case UPLOAD_FORM_BUILDER_REQUEST:
      return { ...state, isUploading: true };
    case UPLOAD_FORM_BUILDER_SUCCESS:
      return { ...state, isUploading: false, uploaded: true };
    case UPLOAD_FORM_BUILDER_FAILURE:
      return { ...state, isUploading: false, uploaded: false };
    case UPLOAD_FORM_BUILDER_RESET:
      return { ...state, uploaded: false };
    default:
      return { ...state };
  }
};
