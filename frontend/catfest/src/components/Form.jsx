import React from 'react'

export default class Form extends React.Component{
    state ={
        adaptability: '',
        affection_level: '',
        energy_level: '',
        intelligence: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.props.filterByProp([event.target.name], event.target.value)
    }

    render(){
        return(
            <form>
            <label>Adaptability</label>
            <input 
            id='adaptability'
            type='range' 
            min='1'
            max='5'
            name='adaptability' 
            value={this.state.adaptability} 
            onChange={this.handleChange}
            />
            <label>{this.state.adaptability}</label>
            <label>Affection Level</label>
            <input
            type='range' 
            min='1'
            max='5'
            name='affection_level' 
            value={this.state.affection_level} 
            placeholder='Affection Level' 
            onChange={this.handleChange}
            />
            <label>{this.state.affection_level}</label>
            <label>Energy Level</label>
            <input 
            type='range' 
            min='1'
            max='5'
            name='energy_level' 
            value={this.state.energy_level} 
            placeholder='Energy Level' 
            onChange={this.handleChange}
            />
            <label>{this.state.energy_level}</label>
            <label>Intellegence</label>
            <input 
            type='range' 
            min='1'
            max='5'
            name='intelligence' 
            value={this.state.intelligence} 
            placeholder='Intelligence' 
            onChange={this.handleChange}
            />
            <label>{this.state.intelligence}</label>
            </form>
        )
    }        
}
