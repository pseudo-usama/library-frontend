import { useState, } from 'react'

import { TextField, Button } from '@mui/material'
import Alert from '@mui/material/Alert'


function Book() {
    const [book, setBook] = useState({ name: '', author: '' })
    const [submissionError, setSubmissionError] = useState(undefined)

    const handleSubmit = (e) => {
        e.preventDefault()

        const encodedUrl = `name=${book.name}&author=${book.author}`
        fetch(process.env.REACT_APP_API_URL + '/book', {
            method: 'POST',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedUrl
        })
            .then(res => {
                if (res.status !== 201) {
                    console.log(res)
                    setSubmissionError(true)
                    return
                }
                setSubmissionError(false)
                setBook({ name: '', author: '' })
            })
            .catch(err => {
                console.error(err)
                setSubmissionError(true)
            })
    }

    return <>
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

                <Button
                    type="submit"
                    variant="contained"
                    style={{ width: 100, margin: '10px 0 0 auto' }}
                >
                    Submit
                </Button>
            </div>
        </form>

        {submissionError == true &&
            <Alert severity="error">Error submitting data! Please try again.</Alert>
        }
        {submissionError == false &&
            <Alert severity="success">Data submitted successfully.</Alert>
        }
    </>
}


export default Book
