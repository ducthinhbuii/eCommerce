export default function Validation(value){
    const error = {}
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    if(value.lastName === ""){
        error.lastName = "Last name is required"
    }

    if(value.email === ""){
        error.email = "Email is required"
    }else if(!emailPattern.test(value.email)){
        error.email = "Invalid email format"
    }

    if(value.username === ""){
        error.username = "Username is required"
    }

    if(value.password === ""){
        error.password = "Password is required"
    }else if(!passwordPattern.test(value.password)){
        error.password = "Password must contain at least 6 characters, one letter and one number"
    }

    if(value.rePassword === ""){
        error.rePassword = "Password is required"
    }else if(value.password !== value.rePassword){
        error.rePassword = "Passwords do not match"
    }

    return error
}