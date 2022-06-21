import changeJobpostingform from "./editJob";
import setShortlistinginfo from './shortlistApplicant';
import MeetingInfo from "./scheduleMeeting";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    changeJobpostingform,
    setShortlistinginfo,
    MeetingInfo

})
export default rootReducer