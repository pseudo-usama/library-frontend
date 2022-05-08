import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"

import { Container } from '@mui/material'

import Navbar from './Navbar'
import Students from "./list/Students"
import Books from './list/Books'
import StudentDetails from "./update/Student"
import BookDetails from "./update/Book"
import AddStudent from "./add/Student"
import AddBook from "./add/Book"
import NotFound from "./NotFound"


function App() {
    return <>

        <BrowserRouter>
            <Navbar />
            <Container style={{ marginTop: 30 }}>
                <Routes>
                    <Route path="/students" element={<Students />} />
                    <Route path="/student/:id" element={<StudentDetails />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </BrowserRouter>
    </>
}

export default App
