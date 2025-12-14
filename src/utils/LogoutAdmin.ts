const LogoutAdmin = ()=> {
    localStorage.removeItem("token")
    localStorage.removeItem("permissionLevel")
    window.location.href="/admin/login"
}

export default LogoutAdmin