import React , { useState }from "react";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Ajout de l'état pour le bouton

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Démarre le processus de soumission

    try {
      const response = await axios.post('http://localhost:5000/api/feedback', formData);
      setStatusMessage(response.data.message); // Message de succès
      setFormData({ name: '', email: '', message: '' }); // Reset du formulaire
    } catch (error) {
      setStatusMessage('Erreur lors de la soumission, essayez de nouveau.');
    } finally {
      setIsSubmitting(false); // Fin de la soumission
    }
  };


  return (
    <div>
      <Header></Header>
      <div className="page-heading about-page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Contact Us</h2>
                <span>Awesome, clean &amp; creative HTML5 Template</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.8535868759367!2d10.416698715430304!3d36.3501700800467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130292f5457b6a7d%3A0xe802a7ccf752fd89!2sBouficha%2C%20Tunisia!5e0!3m2!1sen!2sth!4v1695828034698!5m2!1sen!2sth"
                  width="100%"
                  height="400px"
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Google Map showing Bouficha, Sousse, Tunisia"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-heading">
                <h2>Say Hello. Don't Be Shy!</h2>
                <span>
                  Details to details is what makes Hexashop different from the
                  other themes.
                </span>
              </div>
              <form id="contact" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6">
          <fieldset>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Votre nom"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="col-lg-6">
          <fieldset>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Votre email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="col-lg-12">
          <fieldset>
            <textarea
              name="message"
              rows={6}
              id="message"
              placeholder="Votre message"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="col-lg-12">
          <fieldset>
            <button
              type="submit"
              id="form-submit"
              className="main-dark-button"
              disabled={isSubmitting} // Désactive le bouton pendant la soumission
            >
              {isSubmitting ? (
                <i className="fa fa-spinner fa-spin" /> // Affiche un spinner pendant la soumission
              ) : (
                <i className="fa fa-paper-plane" />
              )}
            </button>
          </fieldset>
        </div>
      </div>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="subscribe">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-heading">
                <h2>By Subscribing To Our Newsletter You Can Get 30% Off</h2>
                <span>
                  Details to details is what makes Hexashop different from the
                  other themes.
                </span>
              </div>
              <form id="subscribe" action method="get">
                <div className="row">
                  <div className="col-lg-5">
                    <fieldset>
                      <input
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-5">
                    <fieldset>
                      <input
                        name="email"
                        type="text"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your Email Address"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-2">
                    <fieldset>
                      <button
                        type="submit"
                        id="form-submit"
                        className="main-dark-button"
                      >
                        <i className="fa fa-paper-plane" />
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-6">
                  <ul>
                    <li>
                      Store Location:
                      <br />
                      <span>Sunny Isles Beach, FL 33160, United States</span>
                    </li>
                    <li>
                      Phone:
                      <br />
                      <span>010-020-0340</span>
                    </li>
                    <li>
                      Office Location:
                      <br />
                      <span>North Miami Beach</span>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul>
                    <li>
                      Work Hours:
                      <br />
                      <span>07:30 AM - 9:30 PM Daily</span>
                    </li>
                    <li>
                      Email:
                      <br />
                      <span>info@company.com</span>
                    </li>
                    <li>
                      Social Media:
                      <br />
                      <span>
                        <a href="/">Facebook</a>, <a href="/">Instagram</a>,{" "}
                        <a href="/">Behance</a>, <a href="/">Linkedin</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
