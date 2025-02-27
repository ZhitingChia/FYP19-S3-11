import React, { Component } from 'react';
import classes from './ViewProfile.module.css';
import LeftSide from '../../Components/ViewProfile/LeftSide/LeftSide';
import { Card, Container, Col, Row, CardColumns } from 'react-bootstrap';
// import { Timeline, Event } from '../../../common_assets/Timeline/Timeline';
import { ViewCard, Element } from '../../Components/ViewProfile/ViewCard/ViewCard';
import Axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';

import Tabs from './IconLabelTabs';
import apiURL from '../../../../config';

const PersonalParticularsShell = {
    "StudentID": 0,
    "FirstName": "",
    "MiddleName": "",
    "LastName": "",
    "Email": "",
    "Phone": "",
    "Country": "",
    "City": "",
    "CurrentAddress": "",
    "PostalCode": "",
    "Nationality": ""
}

const EducationShell = {
    "EducationID": 0,
    "University": "",
    "Degree": "",
    "FieldOfStudy": "",
    "Major": "",
    "StartDate": "",
    "EndDate": "",
    "Mode": "",
    "GPA": ""
}

const WorkExpShell = {
    "WorkExpID": 0,
    "Position": "",
    "Company": "",
    "StartDate": "",
    "EndDate": "",
    "Mode": "",
    "Industry": "",
    "AnnualSalary": 0,
    "Description": ""
}

const JobPreferenceShell = {
    "JobPreferenceID": 0,
    "Industry": "",
    "Position": "",
    "JobType": "",
    "ExpectedSalary": 0,
    "Location": "",
    "Availability": ""
}

const AwardsShell = {
    "AwardID": 0,
    "Award": "",
    "Date": "",
    "Description": ""
}

const CertificationShell = {
    "CertificateID": 0,
    "Name": "",
    "IssuedBy": "",
    "IssueDate": "",
    "ValidUntil": ""
}

const SkillsShell = {
    "SkillID": 0,
    "SkillName": "",
    "Edit": false
}

const ProjectsShell = {
    "ProjectID": 0,
    "Title": "",
    "Status": "",
    "Description": "",
    "Link": ""
}

const DocumentShell = {
    "DocumentID": 0,
    "Title": "",
    "Link": ""
}

class Profile extends Component {
    state = {
        "ProfileImage": "data:image/jpeg;base64,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",
        "PersonalParticulars": {},
        "Education": [],
        "WorkExp": [],
        "JobPreference": [],
        "Awards": [],
        "Certification": [],
        "Skills": [],
        "Projects": [],
        "Document": [],
        "isActive": [],
        "activatedToggle": "-1",
        'ActiveTab': 'Education'
    }

    // Handling Form Inputs starts here

    componentDidMount() {
        // Axios.get('http://localhost:3000/studentProfile')
        //     .then(receivedData => {
        //         console.log(receivedData.data);
        //         let tempPP = { ...PersonalParticularsShell }
        //         for (let key in tempPP) {
        //             console.log(key, receivedData.data.PersonalParticulars[key]);
        //             tempPP[key] = receivedData.data.PersonalParticulars[key];
        //         }
        //         this.setState({ PersonalParticulars: tempPP });

        //         let tempEducation = [];
        //         for (let i in receivedData.data.Education) {
        //             let tempE = { ...EducationShell }
        //             for (let key in tempE) {
        //                 console.log(key, receivedData.data.Education[i][key]);
        //                 tempE[key] = receivedData.data.Education[i][key];
        //             }
        //             tempEducation.push(tempE);
        //         }
        //         this.setState({ Education: tempEducation });


        //         this.setState({ WorkExp: receivedData.data.WorkExp });
        //         this.setState({ JobPreference: receivedData.data.JobPreference });
        //         this.setState({ Awards: receivedData.data.Awards });
        //         this.setState({ Certification: receivedData.data.Certification });
        //         this.setState({ Skills: receivedData.data.Skills });
        //         this.setState({ Projects: receivedData.data.Projects });
        //         this.setState({ Document: receivedData.data.Document });
        //     });
            
        Axios.get(`${apiURL}student/studentinfo/1`)
            .then(receivedData => {
                console.log(receivedData.data.PersonalParticulars);
                let tempPP = { ...PersonalParticularsShell }
                for (let key in tempPP) {
                    console.log(key, receivedData.data.PersonalParticulars[key]);
                    tempPP[key] = receivedData.data.PersonalParticulars[key];
                }
                this.setState({ PersonalParticulars: tempPP });
            });

        Axios.get(`${apiURL}student/studenteducation/1`)
            .then(receivedData => {
                console.log(receivedData.data.Education);
                let tempEducation = [];
                for (let i in receivedData.data.Education) {
                    let tempE = { ...EducationShell }
                    for (let key in tempE) {
                        console.log(key, receivedData.data.Education[i][key]);
                        tempE[key] = receivedData.data.Education[i][key];
                    }
                    let tempDate = new Date(tempE["StartDate"]);
                    tempE.StartDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()}`;
                    tempDate = new Date(tempE["EndDate"]);
                    tempE.EndDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()}`;
                    tempEducation.push(tempE);
                }
                this.setState({ Education: tempEducation });
            });

        Axios.get(`${apiURL}student/studentworkexp/1`)
            .then(receivedData => {
                console.log(receivedData.data.WorkExp);
                let tempWorkExp = [];
                for (let i in receivedData.data.WorkExp) {
                    let tempW = { ...WorkExpShell }
                    for (let key in tempW) {
                        console.log(key, receivedData.data.WorkExp[i][key]);
                        tempW[key] = receivedData.data.WorkExp[i][key];
                    }
                    let tempDate = new Date(tempW["StartDate"]);
                    tempW.StartDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()}`;
                    tempDate = new Date(tempW["EndDate"]);
                    tempW.EndDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()}`;
                    tempWorkExp.push(tempW);
                }
                this.setState({ WorkExp: tempWorkExp });
            });

            Axios.get(`${apiURL}student/studentjobpref/1`)
            .then(receivedData => {
                console.log(receivedData.data.JobPreference);
                let tempJobPreference = [];
                for (let i in receivedData.data.JobPreference) {
                    let tempJP = { ...JobPreferenceShell }
                    for (let key in tempJP) {
                        console.log(key, receivedData.data.JobPreference[i][key]);
                        tempJP[key] = receivedData.data.JobPreference[i][key];
                    }
                    tempJobPreference.push(tempJP);
                }
                this.setState({ JobPreference: tempJobPreference });
            });

            Axios.get(`${apiURL}student/studentawards/1`)
            .then(receivedData => {
                console.log(receivedData.data.Awards);
                let tempAwards = [];
                for (let i in receivedData.data.Awards) {
                    let tempA = { ...AwardsShell }
                    for (let key in tempA) {
                        console.log(key, receivedData.data.Awards[i][key]);
                        tempA[key] = receivedData.data.Awards[i][key];
                    }
                    tempAwards.push(tempA);
                }
                this.setState({ Awards: tempAwards });
            });

            Axios.get(`${apiURL}student/studentcertificate/1`)
            .then(receivedData => {
                console.log(receivedData.data.Certification);
                let tempCertification = [];
                for (let i in receivedData.data.Certification) {
                    let tempC = { ...CertificationShell }
                    for (let key in tempC) {
                        console.log(key, receivedData.data.Certification[i][key]);
                        tempC[key] = receivedData.data.Certification[i][key];
                    }
                    tempCertification.push(tempC);
                }
                this.setState({ Certification: tempCertification });
            });

            Axios.get(`${apiURL}student/studentproject/1`)
            .then(receivedData => {
                console.log(receivedData.data.Projects);
                let tempProjects = [];
                for (let i in receivedData.data.Projects) {
                    let tempP = { ...ProjectsShell }
                    for (let key in tempP) {
                        console.log(key, receivedData.data.Projects[i][key]);
                        tempP[key] = receivedData.data.Projects[i][key];
                    }
                    tempProjects.push(tempP);
                }
                this.setState({ Projects: tempProjects });
            });            
    }

    updateActiveTab() {
        
    }

    render() {
        return (
            <Container fluid>
                <br />
                <Row >
                    <Col md={{ span: 3 }} className={classes.LeftSide}>
                        <LeftSide imageLink={this.state.ProfileImage} details={this.state.PersonalParticulars} />

                    </Col>
                    <Col md={{ offset: 3, span: 9 }} >
                        {/* <CardColumns className={classes.CardColumn}>
                            <Timeline title={"Education"}>
                                {this.state.Education.map(educationDetail => {
                                    return (
                                        <React.Fragment key={educationDetail.EducationID}>
                                            <Event 
                                            interval={educationDetail.StartDate + " - " + educationDetail.EndDate}
                                            title={educationDetail.Degree + " in " +
                                            educationDetail.FieldOfStudy + " (" +
                                            educationDetail.Major + ")"}
                                            subtitle={educationDetail.University}
                                            >
                                                {educationDetail.GPA}
                                            </Event>
                                        </React.Fragment>
                                    );
                                })}
                            </Timeline>
                            <Timeline title={"Work Experience"}>
                                {this.state.WorkExp.map(workDetail => {
                                    return (
                                        <React.Fragment key={workDetail.WorkExpID}>
                                            <Event interval={workDetail.StartDate + " - " + workDetail.EndDate} title={workDetail.Position + " at " + workDetail.Company + " (" + workDetail.Mode + ")"} subtitle={workDetail.Industry + ", " + workDetail.AnnualSalary}>
                                                {workDetail.Description}
                                            </Event>
                                        </React.Fragment>
                                    );
                                })}
                            </Timeline>

                            <ViewCard title={"Awards"}>
                                {this.state.Awards.map(awardDetail => {
                                    return (
                                        <React.Fragment key={awardDetail.AwardID}>
                                            <Element interval={awardDetail.Date} title={awardDetail.Award}>
                                                {awardDetail.Des}
                                            </Element>
                                        </React.Fragment>
                                    );
                                })}
                            </ViewCard>

                            <ViewCard title={"Awards"}>
                                {this.state.Awards.map(awardDetail => {
                                    return (
                                        <React.Fragment key={awardDetail.AwardID}>
                                            <Element interval={awardDetail.Date} title={awardDetail.Award}>
                                                {awardDetail.Des}
                                            </Element>
                                        </React.Fragment>
                                    );
                                })}
                            </ViewCard>
                            <Timeline title={"Work Experience"}>
                                {this.state.Education.map(educationDetail => {
                                    return (
                                        <React.Fragment key={educationDetail.EducationID}>
                                            <Event interval={educationDetail.StartDate + " - " + educationDetail.EndDate} title={educationDetail.Degree + " in " + educationDetail.FieldOfStudy + " (" + educationDetail.Major + ")"} subtitle={educationDetail.University}>
                                                {educationDetail.GPA}
                                            </Event>
                                        </React.Fragment>
                                    );
                                })}
                            </Timeline>
                        </CardColumns> */}

                        {/* <body > */}
                        {/* <Tabs variant="scrollable"> */}
                        <Tabs activeTab={this.state.ActiveTab} 
                        click={this.updateActiveTab} 
                        Education={this.state.Education} 
                        WorkExp = {this.state.WorkExp} 
                        Certification={this.state.Certification} 
                        Awards = {this.state.Awards} 
                        Projects={this.state.Projects} Skills={this.state.Skills}>
                            
                            {/* <VerticalTimeline education>
                                {this.state.Education.map(educationDetail => {
                                    return (
                                        <VerticalTimelineElement
                                            className="vertical-timeline-element--work"
                                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                            date={educationDetail.StartDate + " - " + educationDetail.EndDate}
                                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                            icon={<WorkIcon />}
                                        >
                                            <h3 className="vertical-timeline-element-title">{educationDetail.Degree + " in " +
                                                educationDetail.FieldOfStudy + " (" +
                                                educationDetail.Major + ")"}</h3>
                                            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                                            <p>
                                                {educationDetail.University}
                                                <br />
                                                {educationDetail.GPA}
                                            </p>
                                        </VerticalTimelineElement>
                                    );
                                })}
                            </VerticalTimeline> */}
                            {/* </Tab> */}
                        </Tabs>

                        {/* <VerticalTimeline> */}
                            {/* {this.state.Education.map(educationDetail => {
                                return (
                                    <VerticalTimelineElement
                                        className="vertical-timeline-element--work"
                                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                        date={educationDetail.StartDate + " - " + educationDetail.EndDate}
                                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                        icon={<WorkIcon />}
                                    >
                                        <h3 className="vertical-timeline-element-title">{educationDetail.Degree + " in " +
                                            educationDetail.FieldOfStudy + " (" +
                                            educationDetail.Major + ")"}</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                                        <p>
                                            {educationDetail.University}
                                            <br />
                                            {educationDetail.GPA}
                                        </p>
                                    </VerticalTimelineElement>
                                );
                            })} */}

                            {/* {this.state.WorkExp.map(workDetail => {
                                return (
                                    <VerticalTimelineElement
                                        className="vertical-timeline-element--work"
                                        date={workDetail.StartDate + " - " + workDetail.EndDate}
                                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                        icon={<WorkIcon />}
                                    >
                                        <h3 className="vertical-timeline-element-title">{workDetail.Position + " at " +
                                            workDetail.Company + " (" + workDetail.Mode + ")"} </h3>
                                        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                                        <p>
                                            {workDetail.Industry + ", " + workDetail.AnnualSalary}
                                            <br />
                                            {workDetail.Description}
                                        </p>
                                    </VerticalTimelineElement>
                                );
                            })} */}

                            {/* <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date="2008 - 2010"
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<WorkIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                                <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                                <p>
                                    User Experience, Visual Design
                                    </p>
                            </VerticalTimelineElement>

                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date="2006 - 2008"
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<WorkIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                                <p>
                                    User Experience, Visual Design
                                    </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                date="April 2013"
                                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                icon={<SchoolIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                                <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                                <p>
                                    Strategy, Social Media
                                    </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                date="November 2012"
                                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                icon={<SchoolIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                                <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                                <p>
                                    Creative Direction, User Experience, Visual Design
                                    </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                date="2002 - 2006"
                                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                icon={<SchoolIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                                <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                                <p>
                                    Creative Direction, Visual Design
                                    </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                                icon={<StarIcon />}
                            />
                        </VerticalTimeline> */}
                        {/* </body> */}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;