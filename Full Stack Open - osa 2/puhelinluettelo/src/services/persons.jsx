import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const createNew = (person) => {
    return axios.post(baseUrl, person)
}

const deleteById = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
}

const update = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

const exports = {
    getAll,
    createNew,
    deleteById,
    update
}

export default exports