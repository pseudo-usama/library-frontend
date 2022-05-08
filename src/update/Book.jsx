import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { TextField, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'


function Book() {
    const [book, setBook] = useState({ name: '', author: '', student_name: '', student_id: '', borrowing_date: null, return_date: null })
    const [errorLoading, setError] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/book/' + id)
            .then(res => res.json())
            .then(setBook)
            .catch(err => {
                setError(true)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const encodedUrl = `bookId=${book.id}&name=${book.name}&author=${book.author}&studentId=${book.student_id ? book.student_id : ''}&borrowingDate=${book.borrowing_date ? book.borrowing_date.toISOString().split('T')[0] : ''}&returnDate=${book.return_date ? book.return_date.toISOString().split('T')[0] : ''}`
        console.log(encodedUrl)
        fetch(process.env.REACT_APP_API_URL + '/book', {
            method: 'PUT',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedUrl
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return <>
        {!errorLoading &&
            <form onSubmit={handleSubmit}>
                <div style={{
                    display: 'flex',
                    flexFlow: 'column',
                    width: 350,
                }}>
                    <TextField
                        value={book.name}
                        onChange={e => setBook({ ...book, name: e.target.value })}
                        id="filled-basic"
                        label="Name"
                        variant="outlined"
                        required
                    />
                    <TextField
                        value={book.author}
                        onChange={e => setBook({ ...book, author: e.target.value })}
                        id="filled-basic"
                        label="Author"
                        variant="outlined"
                        required
                        style={{ marginTop: 10 }}
                    />
                    <TextField
                        value={book.student_id}
                        onChange={e => setBook({ ...book, student_id: e.target.value })}
                        type="number"
                        id="filled-basic"
                        label="Student id"
                        variant="outlined"
                        style={{ margin: '10px 0' }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDateRangePicker
                            startText="Borrowing date"
                            value={[book.borrowing_date, book.return_date]}
                            onChange={val => setBook({ ...book, borrowing_date: val[0], return_date: val[1] })}
                            renderInput={(startProps, endProps) => (
                                <Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </Fragment>
                            )}
                        />
                    </LocalizationProvider>

                    <Button
                        type="submit"
                        variant="contained"
                        style={{ width: 100, margin: '10px 0 0 auto' }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        }

        {errorLoading &&
            <Alert severity="error">Error loading data! Please reload page.</Alert>
        }
    </>
}


export default Book
