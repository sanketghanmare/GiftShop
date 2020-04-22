import React from 'react';

class AboutUs extends React.Component{

  render(){
    return(
        <div>
          <p>
          <div className="ui orange segment">
            <h4 className="ui header">About Us</h4>
            <div className="ui two column grid">
              <div className="column">
                <div className="ui raised segment">
                  <a className="ui huge orange ribbon label">History</a>
                  <div className="ui divider"></div>
                  <p>
                    Gift Shop was developed in March 2019. This project is an
                    academic project for course Database management System.
                    The project aims at sucessfully implementing various database
                    scenarios using Mongoose, React and node.
                  </p>
                  <a className="ui huge orange ribbon label">Attribution</a>
                  <div className="ui divider"></div>
                  <p>
                    <ul>
                      <li>
                        The images used in this project are from pexel
                      </li>
                      <li>
                        Semantic UI is used for various UI elements
                      </li>
                      <li>
                        Professor Annunziato's database management course documents
                        is used for implementing the connections.
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="ui segment">
                  <a className="ui huge orange left ribbon label">Team</a>
                  <div className="ui divider"></div>
                  <p>
                    <div className="ui bulleted list">
                      <div className="item">
                        <h4 className="ui header" >Anagha Bhosale</h4>
                      </div>
                      <div className="item">
                        <h4 className="ui header">Ruchit Urunkar</h4>
                      </div>
                      <div className="item">
                        <h4 className="ui header">Sanket Ghanmare</h4>
                    </div>
                    </div>

                  </p>

                </div>
              </div>
            </div>
          </div>
          </p>
        </div>
    )

  }


}

export default AboutUs