import React, { Component } from 'react';
import PowerballPrimaryList from "./PowerballPrimaryList";

import axios from "axios";

class apicall extends Component {
    
    constructor(props)
    {
        var renderCircle = [];
        var renderSquare = [];
    
    for (var i = 1; i < 8; i++) {
        renderCircle.push(i);
    }
    
    for (var j = 1; j < 36; j++) {
        renderSquare.push(j);
    }
        super(props);
        this.state={PrimaryNos:renderCircle,SecondaryNos:renderSquare}
    }

  async componentDidMount() {
      const url="https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults";
    const dataToPost = {
        "CompanyId":"GoldenCasket","MaxDrawCountPerProduct":1,"OptionalProductFilter":["Powerball"]
      };
    axios
      .post(url,dataToPost)
      .then(response => {
          console.log(response)
        const PowerballResult = response.data.DrawResults.map(c => {
             return {
                PrimarNos: c.PrimaryNumbers,
                SecondaryNos: c.SecondaryNumbers,
            
          };
        });

       
console.log(PowerballResult);
        this.setState({PrimaryNos:PowerballResult.PrimarNos,SecondaryNos:PowerballResult.SecondaryNos});
      })
      .catch(error => console.log(error));
  }

  render() {
      console.log(this.state.PrimaryNos);
    return (
      <div className="apicall">
        <header className="App-header">
          <h1 className="App-title">Welcome to our Kudo app</h1>
        </header>
        <PowerballPrimaryList PrimaryPowerballs={this.state.PrimaryNos} />
      </div>
    );
  }
}

export default apicall;