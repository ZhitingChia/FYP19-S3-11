import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/SnackBar'
import IconButton from '@material-ui/core/IconButton'

export class AddCanModal extends Component {
    constructor(props,context) {
        super(props, context);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };
    handleSubmit(event) {
        event.preventDefault();
        fetch('https://pegasus-backend.herokuapp.com/createuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: event.target.firstname.value,
                middlename: event.target.middlename.value,
                lastname: event.target.lastname.value,
                email: event.target.email.value,
                phone: event.target.phone.value,
                country: event.target.country.value,
                city: event.target.city.value,
                currentaddress: event.target.currentaddress.value,
                postalcode: event.target.postalcode.value,
                nationality: event.target.nationality.value,
                username: event.target.username.value,
                password: event.target.password.value,
                usertype: event.target.usertype.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.setState({ snackbaropen: true, snackbarmsg: 'Successfully created new candidate account!' });
                this.timer = setTimeout(()=>{window.location.href = '/admin/candidate'}, 1000);
            },
                (error) => {
                    //alert('Failed')
                    this.setState({ snackbaropen: true, snackbarmsg: 'Failed to create new candidate account...' });
                }
            )
    }

    render() {
        return (
            <div className="container">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={5000}
                    onClose={this.snackbarClose}

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        >
                            x
                </IconButton>
                    ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create New Candidate Account
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit} >

                                    <Form.Group controlId="usertype">
                                        <Form.Label>User Type:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="usertype"
                                            required
                                            disabled
                                            defaultValue="student"
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="firstname">
                                        <Form.Label>firstname:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstname"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="middlename">
                                        <Form.Label>middlename:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="middlename"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="lastname">
                                        <Form.Label>lastname Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastname"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label>email Phone:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="phone">
                                        <Form.Label>phone E-mail:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="phone"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="country">
                                        <Form.Label>country Description:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="country"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="city">
                                        <Form.Label>city Address:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="currentaddress">
                                        <Form.Label>currentaddress:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="currentaddress"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="postalcode">
                                        <Form.Label>postalcode:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postalcode"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="nationality">
                                        <Form.Label>nationality:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nationality"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="username">
                                        <Form.Label>username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Create New Candidate Account
                                        </Button>
                                    </Form.Group>

                                </Form>

                            </Col>

                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
