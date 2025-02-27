import React, { Component } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export class AppliedJobs extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            employers: [],
            candidates: [],
            jobs: [],
            count_allemployer: '',
            count_allcandidates: '',
            count_alljobs: '',
        };
    }
    getemployers() {
        fetch('https://pegasus-backend.herokuapp.com/admin/getallemployers')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var obj = [];
                var j = 0;
                for (var i = data.length - 1; i > data.length - 6; i--) {
                    obj[j] = {
                        'key': data[i].id,
                        'username': data[i].username,
                        'companyname': data[i].companyname,
                    };
                    j++;
                }
                this.setState({ employers: obj, count_allemployer: data.length });
                console.log(this.state);
            });
    }
    getcandidates() {
        fetch('https://pegasus-backend.herokuapp.com/admin/getallstudents')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var obj = [];
                var j = 0;
                for (var i = data.length - 1; i > data.length - 6; i--) {
                    obj[j] = {
                        'key': data[i].id,
                        'username': data[i].username,
                        'email': data[i].email,
                    };
                    j++;
                }
                this.setState({ candidates: obj, count_allcandidates: data.length });
                console.log(this.state);
            });
    }
    getjobs() {
        fetch('https://pegasus-backend.herokuapp.com/admin/getalljobs')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var obj = [];
                var j = 0;
                for (var i = data.length - 1; i > data.length - 6; i--) {
                    obj[j] = {
                        'key': data[i].id,
                        'empid': data[i].empid,
                        'title': data[i].title,
                        'description': data[i].description,
                        'dateposted': data[i].dateposted,
                    };
                    j++;
                }
                this.setState({ jobs: obj, count_alljobs: data.length });
                console.log(this.state);
            });
    }
    componentDidMount() {
        this.getemployers();
        this.getcandidates();
        this.getjobs();
    }
    render() {
        const { employers, candidates, jobs } = this.state;
        return (
            <Container fluid style={{ width: '95%' }}>
                <br />
                <Row>
                    <h1 style={{ textAlign: 'center' }}>Dashboard <span ><sub></sub></span></h1>
                </Row>
                <br />
                <Row>
                    <Col md={{ span: 3 }}>

                        <Card>
                            <Card.Body>
                                <Card.Title>{this.state.count_allemployer}</Card.Title>
                                <Card.Text>
                                    All Employers
                                </Card.Text>
                                <Link to="/admin/employer" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></Link>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col md={{ span: 3 }}>

                        <Card>
                            <Card.Body>
                                <Card.Title>{this.state.count_allcandidates}</Card.Title>
                                <Card.Text>
                                    All Candidates
                                </Card.Text>
                                <Link to="/admin/candidate" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></Link>

                            </Card.Body>
                        </Card>

                    </Col>
                    <Col md={{ span: 3 }}>

                        <Card>
                            <Card.Body>
                                <Card.Title>{this.state.count_alljobs}</Card.Title>
                                <Card.Text>
                                    All Jobs
                            </Card.Text>
                                <Link to="/admin/jobs" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></Link>

                            </Card.Body>
                        </Card>

                    </Col>
                    <Col md={{ span: 3 }}>

                        <Card>
                            <Card.Body>
                                <Card.Title>2</Card.Title>
                                <Card.Text>
                                    Reports
                            </Card.Text>
                                <Link to="/admin/reports" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></Link>

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={{ span: 12 }} >

                        <Card>
                            <Card.Body>
                                <Card.Title>Latest Added Jobs</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Employeer ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job =>
                                    <tr key={job.key}>
                                        <td>{job.empid}</td>
                                        <td>{job.title}</td>
                                        <td>{job.description}</td>
                                        <td>{job.dateposted}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6 }} >
                        <Card>
                            <Card.Body>
                                <Card.Title>Latest Added Candidates</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Table striped bordered hover>
                            <thead >
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map(candidate =>
                                    <tr key={candidate.key}>
                                        <td>{candidate.username}</td>
                                        <td>{candidate.email}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Latest Added Employers</Card.Title>
                                <Card.Text>

                                </Card.Text>

                            </Card.Body>

                        </Card>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employers.map(emp =>
                                    <tr key={emp.key}>
                                        <td>{emp.username}</td>
                                        <td>{emp.companyname}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <br />
            </Container>
        );
    }
}

export default AppliedJobs;