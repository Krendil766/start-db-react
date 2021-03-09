import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    peopleList: null
  }
  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
      this.setState({peopleList})
    })
  }
  /* onPeopleLoaded = (peopleList) => {
    this.setState({ peopleList })
  }
  listPeople = () => {
    const id = Math.floor(Math.random() * 25) + 3;

    this.swapiService
      .getAllPeople(id)
      .then(this.onPeopleLoaded)
  } */
  renderItems (arr){
   return arr.map(({ name, id }) => {
      return (
        <li className="list-group-item"
          onClick={()=>this.props.onItemSelected(id)}
          key={id}>{name}</li>
      )
    })
  }
  render() {
    const { peopleList } = this.state;
    if (!peopleList) {
      return <Spinner />
    }
    return (
      <ul className="item-list list-group">
      {this.renderItems(peopleList)}
      </ul>
    );
  }
}