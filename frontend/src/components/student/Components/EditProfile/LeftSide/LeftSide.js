import React from 'react';
import {Image, Container, Card, ResponsiveEmbed, ProgressBar} from 'react-bootstrap';
import Button1 from '../../../../common_assets/Button1/Button1'
import classes from './LeftSide.module.css';

const leftSide = props => {
    
    return(
        <React.Fragment>
            <Container>
                <Card className={classes.CentralContent}>
                <Card.Body onClick={()=>{alert("Eh!")}}>
                    <ResponsiveEmbed aspectRatio="1by1">
                        <Image src = {props.imageLink} className={classes.Image}/>
                    </ResponsiveEmbed>
                </Card.Body>
                <Card.Body ><Button1>Upload</Button1></Card.Body>
                </Card>
                <Card>
                <Card.Body>
                    Progress:
                    <br />
                    <ProgressBar now={65} label={`${65}%`} />
                </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export default leftSide;