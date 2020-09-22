import React, { Component } from "react";
import {Modal,FormLabel,FormGroup,FormControl,Button,} from "react-bootstrap";

//create a class for displaying the modal for adding a new recipe and export it
export class AddRecipe extends Component {
  constructor(props) {
    //create a state to handle the new recipe
    super(props);
    this.state = { name: "", ingredients: ""};
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleRecipeNameChange(e) {
    //changer le nom
    this.setState({ name: e.target.value });
  }
  handleRecipeIngredientsChange(e) {
    //changer ingrédiant
    this.setState({ ingredients: e.target.value });
  }
  handleSubmit(e) {
    //appeler la fonction pour créer une nouvelle recette
    e.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    let newName = this.state.name;
    let newIngredients = this.state.ingredients.split(regExp);
    let newRecipe = {
      name: newName,
      ingredients: newIngredients,
    };
    onAdd(newRecipe);
    this.setState({ name: "", ingredients: ""});
  }
  handleCancel() {
    const onAddModal = this.props.onAddModal;
    this.setState({ name: "", ingredients: ""});
    onAddModal();
  }
  render() {
    const onShow = this.props.onShow;
    let regex1 = /^\S/;
    let regex2 = /^[^,\s]/;
    let regex3 = /[^,\s]$/;
    const validRecipe =
      regex1.test(this.state.name) &&
      regex2.test(this.state.ingredients) &&
      regex3.test(this.state.ingredients);
    return (
      <Modal show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle Recette</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsName">
            <FormLabel>Nom Recette</FormLabel>
            <FormControl
              type="text"
              required
              onChange={this.handleRecipeNameChange}
              value={this.state.name}
              placeholder="Nom Recette"
            />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <FormLabel>Ingrédiants Recette</FormLabel>
            <FormControl
              componentClass="textarea"
              type="text"
              required
              onChange={this.handleRecipeIngredientsChange}
              value={this.state.ingredients}
              placeholder="Ingrédiants(séparé par une virgule)"
            />
          </FormGroup>
          
        </Modal.Body>

        <Modal.Footer>
          <Button
            disabled={!validRecipe}
            bsStyle="success"
            onClick={this.handleSubmit}
          >
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default AddRecipe;
