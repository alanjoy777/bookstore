import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook, editBook } from './redux/bookSlice';

function App() {
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [book, setBook] = useState({ id: "", Title: "", author: "", year: "", image: "" });
    const dispatch = useDispatch();
    const { books } = useSelector((state) => state.bookReducer);

    const handleClose = () => {
        setShow(false);
        setIsEditing(false);
        setBook({ id: "", Title: "", author: "", year: "", image: "" }); // Reset book state
    };
    
    const handleShow = (bookToEdit) => {
        if (bookToEdit) {
            setIsEditing(true);
            setBook(bookToEdit); // Load selected book data for editing
        } else {
            setBook({ id: "", Title: "", author: "", year: "", image: "" });
        }
        setShow(true);
    };

    const handleAddOrEditBook = () => {
        if (isEditing) {
            dispatch(editBook(book)); // Dispatch edit action
            alert("Book updated");
        } else {
            const newId = new Date().getTime(); // Simple unique ID
            dispatch(addBook({ ...book, id: newId })); // Dispatch add action with ID
            alert("Book added");
        }
        handleClose();
    };

    const handleDelete = (id) => {
        dispatch(deleteBook(id)); // Delete by unique ID
    };

    return (
        <>
            <h1 className='text-center'>BookStore</h1>
            <div className="d-flex justify-content-center mb-3">
                <Button variant="primary" onClick={() => handleShow(null)}>
                    Add Book
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit Book" : "Add New Book"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingTitle" label="Book Title">
                        <Form.Control
                            onChange={(e) => setBook({ ...book, Title: e.target.value })}
                            type="text"
                            placeholder="Book Title"
                            value={book.Title}
                        />
                    </FloatingLabel>

                    <FloatingLabel className='mt-2' controlId="floatingAuthor" label="Author Name">
                        <Form.Control
                            onChange={(e) => setBook({ ...book, author: e.target.value })}
                            type="text"
                            placeholder="Author Name"
                            value={book.author}
                        />
                    </FloatingLabel>

                    <FloatingLabel className='mt-2' controlId="floatingYear" label="Year">
                        <Form.Control
                            onChange={(e) => setBook({ ...book, year: e.target.value })}
                            type="text"
                            placeholder="Year"
                            value={book.year}
                        />
                    </FloatingLabel>

                    <FloatingLabel className='mt-2' controlId="floatingImage" label="Image URL">
                        <Form.Control
                            onChange={(e) => setBook({ ...book, image: e.target.value })}
                            type="text"
                            placeholder="Image URL"
                            value={book.image}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddOrEditBook}>
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex flex-wrap justify-content-center">
                {books && books.length > 0 ? (
                    books.map((item) => (
                        <Card style={{ width: '18rem', }} key={item.id} className="m-2">
                            <Card.Img variant="top" height={"350px"} src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.Title}</Card.Title>
                                <Card.Text>
                                    Author: {item.author}
                                </Card.Text>
                                <Card.Text>
                                    Year: {item.year}
                                </Card.Text>
                                <Card.Footer>
                                    <Button variant="info" onClick={() => handleShow(item)}>Edit</Button>
                                    <Button variant="danger" className='ms-5' onClick={() => handleDelete(item.id)}>Delete</Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <div>
                        <p>No Books added yet</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
