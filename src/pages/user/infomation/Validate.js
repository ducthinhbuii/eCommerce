export default function Validation(value){
    const error = {}
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(value.lastName === ""){
        error.lastName = "Last name is required"
    }

    if(value.email === ""){
        error.email = "Email is required"
    }else if(!emailPattern.test(value.email)){
        error.email = "Invalid email format"
    }

    return error
}