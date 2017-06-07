import React, { Component } from 'react';

class Geolocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position : {
                coords: {}
            }
        }
    }

    componentDidMount() {
      const getPosOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000
      };
      console.log(position);
      navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
              this.setState({
                position: {
                  coords: {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                  }
                }
              });
          },
          (error) => alert(error.message),
          getPosOptions
      );
      navigator.geolocation.watchPosition((position) => {
          this.setState({
            position: {
              coords: {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
              }
            }
          });
      });
    }
}

export default Geolocation;
