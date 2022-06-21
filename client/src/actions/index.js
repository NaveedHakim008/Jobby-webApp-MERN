export const editJob = (job) => {
    return { type: 'EditJob', job }
}
export const postJob = () => {
    return { type: 'PostJob' }
}
export const getShortlistinginfo = (shortlistedapplicant) => {
    return { type: 'getShortlistinginfo', shortlistedapplicant }

}
export const getMeetingInfo = (meeting) => {
    return { type: "getMeetingInfo", meeting }
}
