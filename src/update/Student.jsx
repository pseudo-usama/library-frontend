import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { TextField, Button } from '@mui/material'
import Alert from '@mui/material/Alert'


function Student() {
    const [student, setStudent] = useState({ first_name: '', last_name: '' })
    const [errorLoading, setError] = useState(false)
    const [submissionError, setSubmissionError] = useState(undefined)
    const { id } = useParams()

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/student/' + id)
            .then(res => res.json())
            .then(setStudent)
            .catch(err => {
                setError(true)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const encodedUrl = `id=${student.id}&firstName=${student.first_name}&lastName=${student.last_name}`
        fetch(process.env.REACT_APP_API_URL + '/student', {
            method: 'PUT',
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
            })
            .catch(err => {
                console.error(err)
                setSubmissionError(true)
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
                        value={student.first_name}
                        onChange={e => setStudent({ ...student, first_name: e.target.value })}
                        id="filled-basic"
                        label="First name"
                        variant="outlined"
                        required
                    />
                    <TextField
                        value={student.last_name}
                        onChange={e => setStudent({ ...student, last_name: e.target.value })}
                        id="filled-basic"
                        label="Last name"
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
        }
        {errorLoading &&
            <Alert severity="error">Error loading data! Please reload page.</Alert>
        }
        {submissionError == true &&
            <Alert severity="error">Error submitting data! Please try again.</Alert>
        }
        {submissionError == false &&
            <Alert severity="success">Data submitted successfully.</Alert>
        }
    </>
}


export default Student
