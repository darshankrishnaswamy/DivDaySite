import React from "react";
import {Button, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import ImageUploader from 'react-images-upload';
import axios from "axios";
import {Navbar} from "../Header/navbar";

export class Input extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phrase: "",
            paragraph: "",
            image: "",
            phraseError: false,
            phraseMessage: "",
            paragraphError: false,
            paragraphMessage: ""
        }
        this.submit = this.submit.bind(this);
        this.phraseChange = this.phraseChange.bind(this);
        this.paragraphChange = this.paragraphChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    phraseChange(event){
        let phrase = event.target.value;
        this.setState({phrase: phrase, phraseError: false, phraseMessage: ""});
    }

    paragraphChange(event){
        let paragraph = event.target.value;
        this.setState({paragraph: paragraph, paragraphError: false, paragraphMessage: ""});
    }

    onDrop(picture){
        this.setState({image: picture})
    }

    submit(){
        let data = {
            phrase: this.state.phrase,
            paragraph: this.state.paragraph,
            image: this.state.image
        }
        console.log(data)
        let error = false;
        if (data.phrase.trim() === ""){
            this.setState({phraseError: true, phraseMessage: "Enter a phrase"});
            error = true;
        }
        if (data.paragraph.trim() === ""){
            this.setState({paragraphError: true, paragraphMessage: "Enter a phrase"});
            error = true;
        }
        if(error)
            return;

        console.log("SUCCESS")
        console.log("DATA:")
        console.log(data)
        console.log('handled image')

        const img = new FormData();
        img.append('file', this.uploadInput.files[0]);
        img.append('filename', this.state.phrase);

        fetch('/image', {
            method: 'POST',
            body: img,
        }).then((response) => {
            console.log("POSTED")
            console.log(response);
            this.setState({image: this.uploadInput.files[0].name});
            data = {
                phrase: this.state.phrase,
                paragraph: this.state.paragraph,
                image: this.state.image
            }
            console.log("DATA")
            console.log(data)
            fetch('/data', {
                method: 'POST',
                body: JSON.stringify({ phrase: data.phrase, image: data.image, paragraph: data.paragraph }),
                headers: { 'Content-Type': 'application/json',
                    'Accept': 'application/json' }
            }).then((response) => {
                console.log("RESPONSE: ");
                console.log(response);
                window.location.href = "/";

            });
        });
    }




    render(){
        return (
            <div>
                <Navbar/>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>Enter the information for your race card</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl item xs={12} style={{width: "50%"}}>
                            <TextField required label={"Enter the 6-word phrase here"} onChange={this.phraseChange} multiline={false}  error={this.state.phraseError} helperText={this.state.phraseMessage}/>
                         </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl item xs={12} style={{width: "50%"}}>
                            <TextField required label={"Enter the full paragraph here"} onChange={this.paragraphChange} multiline={true} error={this.state.paragraphError} helperText={this.state.paragraphMessage}/>
                        </FormControl>
                     </Grid>
                    <Grid item xs={12}>
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{backgroundColor: "gray"}} onClick={this.submit}>Submit</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
