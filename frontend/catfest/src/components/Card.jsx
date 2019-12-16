import React from 'react'

export default function Card(props){
    const {name, description, adaptability, affection_level, energy_level, intelligence, wikipedia_url} = props.cat
    return(
        <div className='catCard'>
            <h2>{name}</h2>
            <ul>
                <li>Description: {description}</li>
                <li>Adaptability: {adaptability}</li>
                <li>Affection Level: {affection_level}</li>
                <li>Energy Level: {energy_level}</li>
                <li>Intelligence: {intelligence}</li>
                <li>More Information: {wikipedia_url}</li>
            </ul>
        </div>
    )
}
