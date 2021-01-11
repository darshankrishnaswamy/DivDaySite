import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {Redirect} from "react-router-dom";


export class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {time: 0}
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        return (
           <Redirect to="/data"/>
        )
    }
    render(){
        return(
            <div>
                <Link to={"/"}>
                    <Button style={{backgroundColor: "black", color: "white"}}>View Cards</Button>
                </Link>

                <Link to={"/input"}>
                    <Button style={{backgroundColor: "black", color: "white"}}>Create a new card</Button>
                </Link>
            </div>
        );
    }
}
