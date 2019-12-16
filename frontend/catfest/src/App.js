import React from 'react';
import Form from './components/Form'
import Card from './components/Card'
const BASE_URL = 'http://localhost:3000'

export default class App extends React.Component{
    state = {
        cats: [],
        filteredCats: [],
        displayCats: []
    }

    componentDidMount(){
        fetch(`${BASE_URL}/breeds`)
            .then(response => response.json())
            .then(cats => this.setState({ cats, filteredCats: cats }))
    }

    mapCats = () => {
        return this.state.filteredCats.map(cat => {
            return <Card key={cat.id} cat={cat}  />
        })
    }

    filterByProp = (key, value) => {
        const filteredCats = this.state.cats
                .filter(cat => {
                return cat[key] == value
            })

        this.setState({
            filteredCats
        })
    }


    render(){
        return (
            <div className="App">
            <h1>Cat App</h1>
            <Form filterByProp={this.filterByProp}/>
            {this.mapCats()}
            </div>
        );
    }
}

