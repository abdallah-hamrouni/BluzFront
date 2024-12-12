import React from "react";
import { Link } from "react-router-dom";

const header =() =>{
    return(
<div>
<div className="header-area header-sticky">
<div className="container">
  <div className="row">
    <div className="col-12">
      <nav className="main-nav">
        <Link to="/" className="logo">
        <img style={{height:"100px",width:"100px"}}  src="../assets/images/LOGOBLUZ.png" alt=""/>
        </Link>
       
        <ul className="nav">
          <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
   
          <li className="scroll-to-section"><a href="#women">Women's</a></li>
          
          <li ><Link to="/about">About</Link></li>

          <li ><Link to="/contact">Contact</Link></li>
          <li style={{display:"flex"}}>
            
                <button data-quantity="0" class="btn-cart">
              <svg class="icon-cart"viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                <title>icon-cart</title>
                <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"></path>
              </svg>
              <span class="quantity"></span>
            </button>
            <Link to="/carts">My Cart</Link>
        </li>
        <li><Link to="/login">Login</Link></li>
        </ul>        
          <a href="/" className="menu-trigger">
            <span>Menu</span>
          </a>
        {/* ***** Menu End ***** */}
      </nav>
    </div>
  </div>
</div>
</div>
</div>
    )
}

export default header