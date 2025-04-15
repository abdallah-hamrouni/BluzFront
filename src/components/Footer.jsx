import React from "react";


const Footer =() =>{
    return(
        <div>
 <footer>
  <div className="container">
    <div className="row">
      <div className="col-lg-3">
        <div className="first-item">
          <div className="logo">
          <img style={{height:"100px",width:"100px"}}  src="../assets/images/LOGOBLUZ.png" alt=""/>
          </div>
          <ul>
            <li><a href="/">16501 Collins Ave, Sunny Isles Beach, FL 33160, Tunisie</a></li>
            <li><a href="/">abdallahhamrouni@gmail.com</a></li>
            <li><a href="/">malekgabsi@gmail.com</a></li>
            <li><a href="/">010-020-0340</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3">
        <h4>Shopping &amp; Categories</h4>
        <ul>
          
          <li><a href="/">Women’s Shopping</a></li>
          <li><a href="/">Kid's Shopping</a></li>
        </ul>
      </div>
      <div className="col-lg-3">
        <h4>Useful Links</h4>
        <ul>
          <li><a href="/">Homepage</a></li>
          <li><a href="/">About Us</a></li>
          <li><a href="/">Help</a></li>
          <li><a href="/">Contact Us</a></li>
        </ul>
      </div>
      <div className="col-lg-3">
        <h4>Help &amp; Information</h4>
        <ul>
          <li><a href="/">Help</a></li>
          <li><a href="/">FAQ's</a></li>
          <li><a href="/">Shipping</a></li>
          <li><a href="/">Tracking ID</a></li>
        </ul>
      </div>
      <div className="col-lg-12">
        <div className="under-footer">
        
          <ul>
            <li><a href="/"><i className="fa fa-facebook" /></a></li>
            <li><a href="/"><i className="fa fa-twitter" /></a></li>
            <li><a href="/"><i className="fa fa-linkedin" /></a></li>
            <li><a href="/"><i className="fa fa-behance" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>

</div>

    )
}

export default Footer