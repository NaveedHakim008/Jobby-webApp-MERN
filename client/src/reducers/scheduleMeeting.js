const initialState = {
    applicantid: '',
    jobid: '',
    date: '',
    venue: " ",
    link: " ",
    time: " ",
    merdianTime: "AM",
    type: "On-site"

}

const MeetingInfo = (state = initialState, action) => {
    switch (action.type) {
        case 'getMeetingInfo':

            return {
                ...state,

                applicantid: action.payload._id,

                jobid: action.payload.appliedcandidate.jobid



            }
        default:
            {
                return state
            }
    }
}
export default MeetingInfo