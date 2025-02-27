import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/SnackBar'
import IconButton from '@material-ui/core/IconButton'

export class AddJobModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };
    handleSubmit(event) {
        event.preventDefault();
        fetch('https://pegasus-backend.herokuapp.com/admin/addjob', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                empid: event.target.empid.value,
                title: event.target.title.value,
                industry: event.target.industry.value,
                description: event.target.description.value,
                requiredskills: event.target.requiredskills.value,
                location: event.target.location.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.setState({ snackbaropen: true, snackbarmsg: 'Successfully created new job listing!' });
                this.timer = setTimeout(() => { window.location.href = '/admin/jobs' }, 1000);
            },
                (error) => {
                    //alert('Failed')
                    this.setState({ snackbaropen: true, snackbarmsg: 'Failed to create new job listing...' });
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
                            Create New Job Listing
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit} >

                                    <Form.Group controlId="empid">
                                        <Form.Label>empid:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="empid"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="title">
                                        <Form.Label>title:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="industry">
                                        <Form.Label>industry:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="industry"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="description">
                                        <Form.Label>description:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="requiredskills">
                                        <Form.Label>requiredskills:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="requiredskills"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="location">
                                        <Form.Label>location:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            required
                                            placeholder=""></Form.Control>
                                    </Form.Group>

                       

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Create New Job Listing
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
