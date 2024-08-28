export const usernameAndPasswordValidation = (username, password, newPassword) => {
    if (username === password) {
        throw new Error('Username and password cannot be the same')
    }
    if (username.trim().length === 0) {
        throw new Error('Username cannot be blank')
    }
    if (!/^[A-Za-z0-9_]{4,}$/.test(username)) {
        throw new Error('Username must be atleast 4 characters, and have only letters, numbers and underscores')
    }
    if (password.trim().length === 0) {
        throw new Error('Password cannot be blank')
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) {
        throw new Error('Password must be atleast 8 characters, with atleast one uppercase, one lowercase and one number')
    }

    if (newPassword) {
        if (newPassword.trim().length === 0) {
            throw new Error('Password cannot be blank')
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(newPassword)) {
            throw new Error('Password must be atleast 8 characters, with atleast one uppercase, one lowercase and one number')
        }
    }
}