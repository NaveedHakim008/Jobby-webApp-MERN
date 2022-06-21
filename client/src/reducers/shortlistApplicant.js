const initialState = {
    jobid: "",
    applicantid: ""
}
const setShortlistinginfo = (state = initialState, action) => {
    switch (action.type) {
        case 'getShortlistinginfo': return {
            ...state,
            jobid: action.payload[0].appliedcandidate.jobid,
            applicantid: action.payload[0]._id





        }
        default:
            {
                return state
            }
    }
}
export default setShortlistinginfo;