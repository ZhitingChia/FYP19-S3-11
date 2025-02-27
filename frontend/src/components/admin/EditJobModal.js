import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/SnackBar'
import IconButton from '@material-ui/core/IconButton'

export class EditJobModal extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };
    refresh(){
        console.log("asdf");
    }
    handleSubmit(event) {
        event.preventDefault();

        fetch('https://pegasus-backend.herokuapp.com/admin/editjob/' + event.target.id.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: event.target.title.value,
                industry: event.target.industry.value,
                description: event.target.description.value,
                requiredskills: event.target.requiredskills.value,
                dateposted: event.target.dateposted.value,
                location: event.target.location.value,
                yearsofexperience: event.target.yearsofexperience.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.setState({ snackbaropen: true, snackbarmsg: 'Successfully updated job listing!'});
            },
                (error) => {
                    //alert('Failed')
                    this.setState({ snackbaropen: true, snackbarmsg: 'Failed to update job listing...' });
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
                            Edit Job Listing
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="id">
                                        <Form.Label>Job ID:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="id"
                                            required
                                            disabled
                                            defaultValue={this.props.id}
                                            placeholder="id"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="empid">
                                        <Form.Label>empid:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="empid"
                                            required
                                            defaultValue={this.props.empid}
                                            placeholder="empid"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="title">
                                        <Form.Label>title:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            required
                                            defaultValue={this.props.title}
                                            placeholder="title"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="industry">
                                        <Form.Label>industry:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="industry"
                                            
                                            defaultValue={this.props.industry}
                                            placeholder="industry"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="description">
                                        <Form.Label>description:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            
                                            defaultValue={this.props.description}
                                            placeholder="description"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="requiredskills">
                                        <Form.Label>requiredskills:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="requiredskills"
                                            
                                            defaultValue={this.props.requiredskills}
                                            placeholder="requiredskills"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="dateposted">
                                        <Form.Label>dateposted:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dateposted"
                                            
                                            defaultValue={this.props.dateposted}
                                            placeholder="dateposted"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="location">
                                        <Form.Label>location:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            
                                            defaultValue={this.props.location}
                                            placeholder="location"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="yearsofexperience">
                                        <Form.Label>yearsofexperience:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="yearsofexperience"
                                            
                                            defaultValue={this.props.yearsofexperience}
                                            placeholder="yearsofexperience"></Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Job Listing
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