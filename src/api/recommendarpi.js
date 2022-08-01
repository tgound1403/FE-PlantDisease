import axios from "axios"

export default axios.create({
    baseURL:"http://localhost:5000",
    headers: { "Content-Type": "multipart/form-data" },
})