import { useState } from "react"
import { Form, ListGroup } from "react-bootstrap"

import axios from "axios"
import { Link } from "react-router-dom"

const API_URL = "http://localhost:5005"


const MoviesGlobalFilter = () => {


    const [filterValue, setFilterValue] = useState()
    const [filterResults, setFilterResults] = useState([])
    const [showFilterResults, setShowFilterResults] = useState()

    const handleFilterChange = e => {
        const { value } = e.target
        setFilterValue(value)
        handleFilterResults(filterValue)
    }

    const handleFilterResults = search => {
        axios
            .get(`${API_URL}/movies/?title.spanish_like=${search}`)
            .then(response => {
                setFilterResults(response.data)
            })
            .catch(err => console.log(err))
    }

    const handleShowFilterResults = change => {
        setShowFilterResults(change)
    }

    return (
        <div className="CinemasGlobalFilter">
            <Form.Control
                type="text"
                placeholder="Buscar película"
                className="mr-sm-2"
                onChange={handleFilterChange}
                onFocus={() => { setFilterResults([]); setFilterValue(''); handleShowFilterResults(true) }}
                onBlur={() => setTimeout(() => handleShowFilterResults(false), 150)}
                value={filterValue}
            />



            <ListGroup className="position-absolute z-1">

                {
                    filterResults.map(elm => {

                        if (showFilterResults) {
                            return (
                                <ListGroup.Item
                                    as={Link}
                                    to={`/peliculas/detalles/${elm.id}`}
                                    onClick={() => setFilterValue(elm.title.spanish)}
                                >
                                    {elm.title.spanish}
                                </ListGroup.Item>
                            )

                        }
                    })
                }

            </ListGroup>
        </div >
    )
}

export default MoviesGlobalFilter