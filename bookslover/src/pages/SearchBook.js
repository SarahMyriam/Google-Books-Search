import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Form from "../components/Form";
import API from "../utils/API";
import { List } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import Book from "../components/Book/book";

class SearchBook extends Component {
    //create state for books, query, and message
    state = {
        books: [],
        q: "",
        prompt: "Enter Your Book!"
    };


    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //get books
    getBooks = () => {
        API.getBooks(this.state.q)
            .then(res =>
                this.setState({
                    books: res.data
                })
            )
            .catch(() =>
                this.setState({
                    books: [],
                    prompt: "Try a Different Book"
                })
            );
    };


    //handleFormSubmit to get books
    handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks();
    };

    
    //Find the book by id and save,use API to saveBook, 
    handleBookSave = id => {
        const book = this.state.books.find(book => book.id === id);

        API.saveBook({
            bookId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            link: book.volumeInfo.infoLink,
            image: book.volumeInfo.imageLinks.thumbnail
        }).then(() => this.getBooks())
    };


    render() {
        return (
            
            <Container>
                {/* Keep Jumbo and Form in same grid system */}
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>React Google Book Search</h1>
                        </Jumbotron>
                    </Col>
                    <Col size="md-12">
                        <Card title="Search For a Book">
                            <Form
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                q={this.state.q}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <Card title="Search Results">
                            {this.state.books.length ? (
                                <List>
                                    {this.state.books.map(book => (
                                        <Book
                                            key={book.id}
                                            title={book.volumeInfo.title}
                                            authors={book.volumeInfo.authors}
                                            description={book.volumeInfo.description}
                                            image={book.volumeInfo.imageLinks.thumbnail}
                                            link={book.volumeInfo.infoLink}
                                            Button={() => (
                                                <button
                                                className="btn btn-dark ml-2"
                                                    onClick={() => this.handleBookSave(book.id)}>Save Book</button>
                                            )}
                                        />
                                    ))}
                                </List>
                            ) : (
                                    <h3 className="text-center">{this.state.prompt}</h3>
                                )}
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </Container>
        )
    }
}

export default SearchBook;