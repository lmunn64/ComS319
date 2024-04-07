import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


const Cart = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [cartTotal, setCartTotal] = useState(0);
  
  const total = () => {
    
    let totalVal = 0;
    for (let i = 0; i < state.cart_state.length; i++) {
    totalVal += (state.cart_state[i].price * state.cart_state[i].quantity);
    }
    setCartTotal(totalVal);
    };

    useEffect(() => {
      total();
      }, [state.cart_state]);

  console.log(state.cart_state)
  const cartItems = state.cart_state.map((el) => (
    <div class = "row justify-content-between" key={el.id}>
      <div class = "col-2 col-md-4">
        <img class="img-fluid" src={el.image} width={100} />
      </div>
      <div class = "col-2 col-md-3">
        <h6>{el.quantity}</h6>
      </div>
      <div class = "col-2 col-md-1">
        <h7>x</h7>
      </div>
      <div class = "col-2 col-md-4">
        <h6>${el.price}</h6>
      </div>
      <hr></hr>
      </div>
    ));

  return (
  <div>
    <div class = "container">
    <div class="row justify-content-between ">
      <div class="col-2 align-self-center">
        <h4>
          <b>Snow Sports Catalogue</b>
        </h4>    
      </div>
      <div class="col-2 align-self-center">
          <button type="button" class="btn btn-md btn-primary" onClick ={()=> navigate('/', { state: {cartstate: state.cart_state}})}>Go back</button>
        </div>
    </div>
    </div>
    <div class ="album py-5 bg-body-tertiary">
        <div class="container">
          <div class = "row justify-content-between">
            <div class = "col-2 col-md-1">
              <h5>Item</h5>
            </div>
            <div class = "col-2 col-md-2">
             <h5>Quantity</h5>
            </div>
            <div class = "col-2 col-md-4">
              <h5>Price</h5>
            </div>
            <hr></hr>
            {cartItems}
          </div>
          <div class = "row justify-content-between">
          <div class = "col-2 col-md-1">
              <h5>Total</h5>
          </div>
          <div class = "col-2 col-md-2">
              <h5>=</h5>
          </div>
          <div class = "col-2 col-md-4">
              <h5>${cartTotal.toFixed(2)}</h5>
          </div>
          
          </div>
          
        </div>
        
    </div>
    <div class = "container">
    <h3>Payment Information</h3>
    <form>
      <div class="row justify-content-around">
        <div class="col mb-3">
          <label for="validationDefault01">First name</label>
          <input type="text" class="form-control" id="validationDefault01" placeholder="First name" value="Mark" required/>
        </div>
        <div class="col mb-3">
          <label for="validationDefault02">Last name</label>
          <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required/>
        </div>
      </div>
      <div class = "row justify-content-center">
        <div class="col mb-3">
          <label for="validationDefaultUsername">Credit Card</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg></span>
              </div>
              <input type="text" class="form-control" id="validationDefaultUsername" placeholder="XXXX-XXXX-XXXX-XXXX" aria-describedby="inputGroupPrepend2" required/>
            </div>
          </div>
          <div class="col-2 mb-3">
            <label for="validationDefault01">CVV</label>
            <input type="text" class="form-control" id="validationDefault01" placeholder="XXX" required/>
        </div>
      </div>
      <div class="row justify-content-around">
        <div class="col mb-3">
          <label for="validationDefault01">Address</label>
          <input type="text" class="form-control" id="validationDefault01" placeholder="1234 Main St." required/>
        </div>
        <div class="col mb-3">
          <label for="validationDefault02">Address 2</label>
          <input type="text" class="form-control" id="validationDefault02" placeholder="Apartment Number, studio etc." required/>
        </div>
      </div>
      <div class="row justify-content-center"><h6>Payment Information</h6>
      
        <div class="col-md-6 mb-3">
          <label for="validationDefault03">City</label>
          <input type="text" class="form-control" id="validationDefault03" placeholder="City" required/>
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault04">State</label>
          <input type="text" class="form-control" id="validationDefault04" placeholder="State" required/>
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault05">Zip</label>
          <input type="text" class="form-control" id="validationDefault05" placeholder="Zip" required/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
          <label class="form-check-label" for="invalidCheck2">
            Agree to terms and conditions
          </label>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Submit form</button>
    </form>
    </div>
  </div>
);
}

export default Cart;
