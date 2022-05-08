import { useState, useEffect } from 'react'
import * as React from 'react'

import { Link } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid'

import Alert from '@mui/material/Alert'
import EditIcon from '@mui/icons-material/Edit'


export default function Books() {
    const [books, setBooks] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/books')
            .then(res => res.json())
            .then(setBooks)
            .catch(err => {
                setError(true)
            })
    }, [])

    return <>
        {!error &&
            <div style={{ height: '85vh', width: '950px', margin: 'auto' }}>
                <DataGrid
                    rows={books}
                    columns={columns}
                    pageSize={100}
                // rowsPerPageOptions={[5]}
                />
            </div>
        }
        {error &&
            <Alert severity="error">Error loading data! Please reload page.</Alert>
        }
    </>
}

const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'author', headerName: 'Author', width: 180 },
    { field: 'student_name', headerName: 'Student Name', width: 180 },
    {
        field: 'borrowing_date',
        headerName: 'Borrowing Date',
        width: 130,
        valueGetter: ({ row }) => row.borrowing_date === null ? '' : new Date(row.borrowing_date).toLocaleDateString("en-US")
    },
    {
        field: 'return_date',
        headerName: 'Return Date',
        width: 130,
        valueGetter: ({ row }) => row.return_date === null ? '' : new Date(row.return_date).toLocaleDateString("en-US")
    },
    {
        field: "detail",
        headerName: "Edit",
        width: 40,
        renderCell: ({ row }) => <Link to={`/book/${row.id}`}><EditIcon /></Link>
    }
]
