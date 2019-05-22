import React from "react";
import {
  Button,
  Input,
} from "reactstrap";
import api from "../api";
import AutocompletePlace from "./AutocompletePlace"


export default class EditLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      showEditForm: true,
      picture: null,
      libraryId: this.props.theLibrary._id
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

  }
  handleSelect(place) {
    this.setState({ place })
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFileChange(event) {
    console.log("The file added by the user is: ", event.target.files[0])
    this.setState({
      picture: event.target.files[0]
    })
  }

  handleFormSubmit(e) {
    let uploadData = new FormData()
      uploadData.append("name", this.state.name)
      uploadData.append("address", this.state.place.place_name)
      uploadData.append("picture", this.state.picture)
      uploadData.append("coordinates_lng", this.state.place.center[0])
      uploadData.append("coordinates_lat", this.state.place.center[1])
      uploadData.append("description", this.state.description)

    api.updateLibrary(this.state.libraryId,uploadData)
      .then(result => {
        this.props.updateLibrary()
        console.log("DID IT WORK???", result);
        this.setState({
          message: `library was updated!`,
          showEditForm: !this.state.showEditForm
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }))
      }

  showEditForm() {
    this.setState({
      showEditForm: !this.state.showEditForm
    });
  }
  render() {
    return (
      <div className="editForm">
        {this.state.showEditForm ? (
          <Button onClick={e => this.showEditForm(e)} outline color="info" size="sm">
            Edit Library
          </Button>
        ) : (
          <form>
            Name:{" "}
            <Input type="Name" value={this.state.Name} name="name" onChange={this.handleInputChange}
            />{" "}
            Address:{" "}
            <AutocompletePlace onSelect={this.handleSelect} />
            {" "}
            Picture:{" "}
            <Input type="file" name="picture" onChange={this.handleFileChange}
            />{" "}
            <br />
            Description:{" "}
            <Input type="text" value={this.state.description} name="description" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}
            <br />
            <Button outline color="info" onClick={() => this.handleFormSubmit()}
            >
              Confirm
            </Button>
          </form>
        )}
      </div>
    );
  }
}