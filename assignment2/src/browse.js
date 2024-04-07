import React, { useState, useEffect } from "react";
import items from "./products.json";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

const Browse = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = (el, bool) => {
    let id = el.id;
    let change = 0;
    let location = 0;
    let i = 0;
    for(i = 0; i < cart.length; i++){
      if (cart[i].id == id){
        change = 1;
        location = i;
      }
    }
    if(change == 1 && bool){
      cart[location].quantity += 1;
    }
    else if(change == 1 && !bool){
      cart[location].quantity = cart[location].quantity
    }
    else{
      setCart([...cart, el]);
    }
    
  };

  const removeFromCart = (el) => {
    var i;
    for(i = 0; i < cart.length; i++){
      if(cart[i].id == el.id){
        cart[i].quantity = cart[i].quantity - 1;
      }
    }
  };
  
  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={50} />
      {el.title}
      ${el.price}
    </div>
    ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }
  function createCart(el){
    addToCart(el,false);
  }

  if(state != null){
    var i;
    for(i = 0; i < state.cartstate.length; i++){
      createCart(state.cartstate[i])
    }
  }
  console.log(cart)
  const listItems = items.map((el) => (
      // PRODUCT
      <div class="col" key={el.id}>
      <div class="card shadow-sm h-70">
        <img src = {el.image} alt = "Salomon QST Access 70 Ski Boots"/>
        <div class="card-body">
          <p class="card-title"><strong>{el.title}</strong> <span class="badge badge-secondary"></span></p>
          <div class="col text-center my-2">
          <span class="badge bg-primary">${el.price}</span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="btn-group">
            <button type="button" class="btn btn-secondary" onClick={() => removeFromCart(el)} > - </button>{" "}
            <button type="button" class="btn btn-secondary" onClick={() => addToCart(el,true)}> + </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>));

  return (
  <div>
    <div class = "container">
      <div class="row justify-content-between">
        <div class="col-2 align-self-center">
          <h4>
            <b>Snow Sports Catalogue</b>
          </h4>    
        </div>
        <div class="col-md-auto col-md-4 align-self-center">
          <input class="form-control" type="text" placeholder="Search for items..."/>
        </div>
        <div class="col-2 align-self-center">
          <button type="button" class="btn btn-md btn-primary" onClick ={()=> navigate('/cart', { state: {cart_state: cart}})}>Checkout</button>
        </div>
      </div>
      </div>
      <div class ="album py-5 bg-body-tertiary">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 row-lg-12">
              {listItems}
            </div>
          </div>
      </div>
      </div>
      

);
}

export default Browse;
