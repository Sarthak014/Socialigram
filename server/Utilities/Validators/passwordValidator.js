export const validatePassword = (pswd) => {
    const re = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$";

    return re.test(pswd);
}
