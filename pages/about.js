import { Header, Image, Container } from 'semantic-ui-react'

function About() {
    return (
        <center>
            <Container>
            <Header as='h1'>About Me</Header>
            <Image size='small' src='../static/Allen.PNG'></Image>
            <br></br>
            <p id="abouttext">Hello! My name is Allen Wu and I am 
                a Computer Science student at the 
                University of Waterloo. Through my past
                internship experiences and personal projects,
                I have developed experience working with
                Full-Stack Web Development and Applied 
                Machine Learning. In my spare time, I enjoy
                programming, hiking, canoing and reading non-fiction.
                You can visit my personal portfolio
                website at <a href='http://www.allenwu.ca'>www.allenwu.ca</a>,
                or contact me at allenwu25@yahoo.com.
            </p>
            </Container>
        </center>
    )
}

export default About;