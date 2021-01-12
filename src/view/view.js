import React, {useEffect} from "react";
import {Navbar} from "../Header/navbar";


export class View extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: [],
            cards: []
        }
        this.createCard = this.createCard.bind(this);
        this.cardClick = this.createCard.bind(this);
        //
        fetch('http://127.0.0.1:5000/data', {'Content-Type': 'application/json',
            'Accept': 'application/json'}).then(res => res.json()).then(data => {
            //console.log(data.data);
            let i = -this.state.visible.length + data.data.length;
            for(let j = 0; j < i; j++){
                let {visible} = this.state;
                visible.push(false);
                this.setState({visible: visible})
            }
            this.setState({cards: data.data})
        });
        fetch('http://127.0.0.1:5000/data')
            // .then(res => res.json()) // comment this out for now
            .then(res => res.text())          // convert to plain text
            .then(text => console.log(text))  // then log it out
    }

    cardClick(index){
        console.log("CLICK")
        let {visible} = this.state;
        visible[index] = !visible[index];
        this.setState({visible: visible});
        console.log(this.state.visible)
    }

    createCard(phrase, paragraph, img, index) {
        return (
            <div className="container" onClick={() => {
                let {visible} = this.state;
                visible[index] = !visible[index];
                this.setState({visible: visible});
            }}>
                <div className="card" onClick={() => {this.cardClick(index)}}>
                    <img src={"/images/"+img} alt="error, not loading :(" width="50%" onClick={() => {this.cardClick(index)}}/>
                    <h2>{phrase}</h2>
                    <p id="paragraph" style={{"display" : this.state.visible[index] ? 'inline' : 'none'}}>{ paragraph }</p>
                </div>
            </div>
        );
    }

    render() {
       // console.log("VISIBLE")
     //   console.log(this.state.visible)

        return (
            <div>
                <Navbar/>
                <div className="container">
                    {this.state.cards.map((item, index) => {return this.createCard(item[0], item[1], item[2], index)})}
                </div>
            </div>
        );
    }
}

