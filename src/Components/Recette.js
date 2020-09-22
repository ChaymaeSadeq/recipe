import React from "react";
import {Row,Col,ListGroupItem,Navbar,CardGroup, Card,Button,ButtonToolbar,ListGroup} from "react-bootstrap";
import { AddRecipe } from "./addrecipe";
import { EditRecipe } from "./editrecipe";
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//create the main class for displaying the recipes
class Recette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0,
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  componentDidMount() {
    //load the local storage data after the component renders
    var recipes =
      typeof localStorage["recipes"] !== "undefined"
        ? JSON.parse(localStorage.getItem("recipes"))
        : [
            {
              name: "tajine",
              ingredients: [
                "2 potatos",
                "1/2 cup water",
                "1/2 kg tomatos",
                "2 kg carrots",
                "pinch of cinnamon",
              ],
            },
            {
              name: "Spaghetti",
              ingredients: ["Noodles", "Tomato Sauce", "Meatballs"],
            },
            {
              name: "Split Pea Soup",
              ingredients: [
                "1 pound split peas",
                "1 onion",
                "6 carrots",
                "4 ounces of ham",
              ],
            },
          ];
    this.setState({ recipes: recipes });
  }
  showAddModal() {
    //show the new recipe modal
    this.setState({ showAdd: !this.state.showAdd });
  }
  showEditModal(index) {
    //show the edit recipe modal
    this.setState({ currentlyEditing: index, showEdit: !this.state.showEdit });
  }
  addRecipe(recipe) {
    //create a new recipe
    let recipes = this.state.recipes;
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({ recipes: recipes });
    this.showAddModal();
  }
  editRecipe(newName, newIngredients, currentlyEditing) {
    //edit an existing recipe
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {
      name: newName,
      ingredients: newIngredients,
    };
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({ recipes: recipes });
    this.showEditModal(currentlyEditing);
  }
  deleteRecipe(index) {
    //delete an existing recipe
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({ recipes: recipes, currentlyEditing: 0 });
  }
  render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;
    return (
      <div className="back">
      <Navbar bg="dark" variant="dark">
  <Navbar.Brand >
  <img src="https://www.iconsdb.com/icons/preview/white/restaurant-xxl.png" className="mr-sm-2" width="30" height="30"/>
  CRUD Recette
  </Navbar.Brand>
  </Navbar>
      <div className="wrapper">
        <h1 class="text-white">Application CRUD</h1>
        <CardGroup className="position-static">
          {recipes.map((recipe, index) => (
            <Card eventKey={index} key={index} >
              <Card.Header>
                <Card.Title class="p-3 mb-2 bg-dark text-white" toggle>
                  {recipe.name}
                </Card.Title>
              </Card.Header>
              <Card.Body collapsible>
                <ListGroup>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                
                <ButtonToolbar>
                <Button className="mr-sm-4 center" placement="center" variant="outline-dark" size="lg" onClick={() => {this.showEditModal(index);}} >
                    Editer
                  </Button>
                   <Button variant="outline-danger" size="lg"  onClick={() => {this.deleteRecipe(index);}}>
                    Supprimer
                  </Button>
                </ButtonToolbar>
                
              </Card.Body>
              <EditRecipe
                onShow={this.state.showEdit}
                onEdit={this.editRecipe}
                onEditModal={() => {
                  this.showEditModal(currentlyEditing);
                }}
                currentlyEditing={currentlyEditing}
                recipe={recipes[currentlyEditing]}
              />
            </Card>
          ))}
          
        </CardGroup>
        <br></br>
        <Button variant="success" size="lg" active onClick={this.showAddModal} >
          Ajouter une Recette
        </Button>
        <AddRecipe
          onShow={this.state.showAdd}
          onAdd={this.addRecipe}
          onAddModal={this.showAddModal}
        />
      </div>
      </div>
    );
  }
}
export default Recette;
