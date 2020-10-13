import React from "react";
import Form from "../components/form";
import { connect } from 'react-redux';
import Joi from "joi";
import { addStock, updateStock, listProducts } from "../actions/productActions";
import Table from "../components/table";
import { getStockList } from "../service/stockService";
import axios from "axios";
import isLogIn from '../util/userLogInStatus';
class StockScreen extends Form {
  state = {
    field: {
      image: "",
      _id: "",
      name: "",
      brand: "",
      price: 0,
      category: "",
      countInStock: 0,
      description: ""
    },
    errors: {},
    image: [],
    imageUrls: [],
    display: false,
    products: null
  }

  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  schemaRule = {
    image: Joi.array(),
    _id: Joi.string(),
    name: Joi.string().required().min(3).max(50),
    price: Joi.number().required(),
    category: Joi.string().required().min(3).max(50),
    countInStock: Joi.number().required(),
    brand: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(3).max(50)
  }

  doSubmit = async (e) => {
    e.preventDefault();

    this.handleSubmit();
    if (true) {
      const formData = new FormData(this.form.current);
      this.state.image.map(async image => {
        formData.set('image', image, image.name);
      })
      const { data } = await axios.post("/api/upload", formData);
      this.props.addStock(this.state.field);
      this.setState({ display: false });
    }
    // this.setState({ display: false });

  }
  update = async (e) => {
    e.preventDefault();

    this.handleSubmit();
    if (true) {
      // const id = this.state.field._id;
      // const { data } = await axios.put(`/api/upload/${id}`, this.state.field);
      this.props.updateStock(this.state.field);
      this.setState({ display: false });
      // console.log(data);
    }
  }
  // to refresh the screen
  async componentDidUpdate(prevProps) {
    if (this.props.stocks !== prevProps.stocks) {
      let products = [{ ...this.state.products }]
      products.push(this.props.stocks);
      // const { data: products } = await getStockList();
      this.setState({ products });
    }
  }



  // setImageUrls = () => {
  //   const formData = new FormData();
  //   this.state.image.map(async image => {
  //     formData.append('image', image, image.name);
  //   })
  //   const { data } = await axios.post("/api/upload", formData);
  //   const imageUrls = data.map(image => image.path);
  //   this.setState({ imageUrls });
  //   console.log(this.state.imageUrls);
  // }

  async componentDidMount() {
    const { data: products } = await axios.get("/api/products/getStock");
    this.setState({ products });
    // const { data: products } = await getStockList();
    // this.setState({ products });
  }

  openForm = (product) => {
    this.setState({ field: product, display: true });
  }

  closeForm = (e) => {
    e.preventDefault();
    this.setState({ display: false });
  }
  //   const fieldName = Object.keys(field);
  //   const array = [];
  //   const iterable = fieldName.map(name => array.push(field[name]));
  /* <TableHeader obj={products} /> */
  render() {
    const { products } = this.state;

    return (
      <div>
        {isLogIn() ? <div><button className="button" onClick={() => this.openForm({})}>Add stock</button></div>
          : <p> please log in first</p>}
        {this.state.display && <div className="form">
          <h3 className="product-id">{this.state.field._id ? `ID: ${this.state.field._id}` : "Create new stock"}</h3>
          <form onSubmit={this.doSumbit} className="form-content" ref={this.form} >
            {this.generateForm("name", "Name")}
            {this.state.field._id ? this.generateForm("image", "Image") : this.generateUploadForm()}
            {this.generateForm("brand", "Brand")}
            {this.generateForm("category", "Category")}
            {this.generateForm("description", "Description")}
            {this.generateForm("price", "Price")}
            {this.generateForm("countInStock", "Number of item in stock")}
            <br />
            {this.state.field._id ?
              this.generateButton("Update", this.update) :
              this.generateButton("Submit", this.doSubmit)}
            <br />
            <button className="button" onClick={this.closeForm}>Back</button>
          </form>
        </div>}
        {products &&
          <Table obj={products} titles={Object.keys(this.schemaRule)} onClick={this.openForm} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.productList
});

const mapDispatchToProps = dispatch => ({
  addStock: (state) => dispatch(addStock(state)),
  updateStock: (state) => dispatch(updateStock(state)),
  loadStockList: (state) => dispatch(listProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockScreen);