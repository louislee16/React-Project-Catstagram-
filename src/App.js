import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Container, Navbar, Nav, Col, Row, Card } from "react-bootstrap";
import { useState,useEffect } from "react";

const axios = require("axios");


function App() {
  return (
    <Router>
      <Container>
        <Navbar expand="lg" variant="light" bg="dark">
          <Navbar.Brand><Link to="/" style={{ color: "white", fontSize: "2em" }}>Catstagram</Link></Navbar.Brand>
       </Navbar>
        <Routes>
           <Route exact path="/" element={<Feed />} />
           <Route exact path="/profile/:id"  element={<Profile />}/>
        </Routes>
      </Container>
    </Router>
  );
}

function FeedCard(props) {
  return (
    <Col sm={4}>
      <Card style={{ width: "100%", marginBottom: "30px", backgroundColor:'white'}}>
        <Card.Img variant="top" src={props.breed.image.url} />
        <Card.Body>
          <Card.Title>{props.breed.name}</Card.Title>
          <Card.Text>
          {props.breed.description}
          </Card.Text>
          <Link to={"/profile/" + props.breed.id}>Profile</Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Feed() {
  const [breed, setBreeds] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((response) => {
        setBreeds(
          response.data.filter((data) => {
            return data.image;
          })
        );
        // handle success
        console.log(response);
        // Fill in your code.
      })
      .catch((error) => {
        // handle error
        console.log(error);
        alert("error", error);
      });
    },[]);

  return (
    <div>
      <h2>Feed</h2>
      <div>
        <Row>
        {breed.map((data) => {
        return (
        <FeedCard key={data.id} breed={data}></FeedCard>
        )})}
        </Row>
      </div>
    </div>
  );
}

function Profile() {
  const urlParams = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
      axios
        .get("https://api.thecatapi.com/v1/images/search?breed_id" + urlParams.id + "&limit=5")
        .then((response) => {         
          console.log(response); 
        setImages(response.data)
        })
        .catch((error) => {
          console.log(error);
          alert("error", error);
        });
  },[]);
  
  return (
    <div>
    <p style={{ color: "black", fontSize: "1.5em" }}>{urlParams.id}'s profile</p>
    {images.map((image) => 
    {return (
    <Card key={image.id}> <Card.Img src={image.url}/></Card>
    )})}
    </div>
    );
}

export default App;


