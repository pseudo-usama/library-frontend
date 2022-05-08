import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import EditIcon from '@mui/icons-material/Edit'


export default function Students() {
    const [students, setStudents] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/students')
            .then(res => res.json())
            .then(setStudents)
            .catch(err => {
                setError(true)
            })
    }, [])

    return <>
        {!error &&
            < div style={{ height: '85vh', width: '600px', margin: 'auto' }
            }>
                <DataGrid
                    rows={students}
                    columns={columns}
                    pageSize={100}
                // rowsPerPageOptions={[5]}
                />
            </div >
        }
        {error &&
            <Alert severity="error">Error loading data! Please reload page.</Alert>
        }
    </>
}


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 200 },
    { field: 'last_name', headerName: 'Last name', width: 200 },
    {
        field: "detail",
        headerName: "Edit",
        width: 70,
        renderCell: ({ row }) => <Link to={`/student/${row.id}`}><EditIcon /></Link>
    }
]
