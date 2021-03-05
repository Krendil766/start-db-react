import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/";
import ErrorIndicator from '../error-indicator/'
import "./random-planet.css";

export default class RandomPlanet extends Component {
  constructor() {
    super();
    this.updatePlanet();
    setInterval(this.updatePlanet, 2000)
  }
  swapiService = new SwapiService();
  state = {
    planet: {},
    loading: true,
    error:false,
  };
  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };
  onError = (error) => {
    this.setState({error:true, loading:false})
  };
  updatePlanet =()=>{
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading ||error)
    const spinner = loading ? <Spinner /> : null;
    const content = hasData? <PlanetView planet={planet} /> : null;
    const errorMessage = error?<ErrorIndicator/>:null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorMessage}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
