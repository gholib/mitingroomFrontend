export default {
    isAuthenticated: false,
    error: false,
    token: localStorage.getItem('mitingroom-user-token') || null,
    user: localStorage.getItem('mitingroom-user-profile') || null,
    permissions: localStorage.getItem('user-permissions') || null,
    process: false,
    permissionsLoaded: false
}
