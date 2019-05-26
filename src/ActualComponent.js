import React  from 'react';
 import Square from './Square';
import Circle from "./circle";
import './ActualComponent.css';

//import PowerballPrimaryList from './PowerballPrimaryList';
import axios from "axios";

 var renderCircle = [];
 var renderSquare = [];
 var renderUserSquare = [];

for (var i = 1; i < 8; i++) {
    renderCircle.push('');
}

for (var j = 1; j < 36; j++) {
    renderSquare.push({value:j,flag:true});
}
for (var k = 1; k < 21; k++) {
    renderUserSquare.push({value:k,flag:true});
}    
     
  class PowerBall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          PrimaryNosCircle: renderCircle,
          SecondaryNosCircle:['PB'],
          SecondaryNos: renderSquare,
          UserChoice:renderUserSquare
        };
        this.FetchPowerBallResult = this.FetchPowerBallResult.bind(this);

      }
      
      FetchPowerBallResult() {
     const url="https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults";
      const dataToPost = {
          "CompanyId":"GoldenCasket","MaxDrawCountPerProduct":1,"OptionalProductFilter":["Powerball"]
        };
      axios
        .post(url,dataToPost)
        .then(response => {
            console.log(response.data.DrawResults);
        const PowerballResult = response.data.DrawResults.map(c => {
               return {
                              
                  Primary: c.PrimaryNumbers,
                  Secondary: c.SecondaryNumbers,
              
            };
          });
         
   this.setState({PrimaryNosCircle:PowerballResult[0].Primary});
   this.setState({SecondaryNosCircle:PowerballResult[0].Secondary});
   
        PowerballResult[0].Primary.map(c => {
          let pos = renderSquare.map(function(e) { return e.value; }).indexOf(c);
             renderSquare[pos].flag=false;
             this.setState({SecondaryNos:renderSquare});
             return renderSquare;
           });

           PowerballResult[0].Secondary.map(c => {
            let pos = renderUserSquare.map(function(e) { return e.value; }).indexOf(c);
            renderUserSquare[pos].flag=false;
               this.setState({UserChoice:renderUserSquare});
               return renderUserSquare;
             });
           
          console.log(renderSquare);
          
    })
           
        .catch(error => console.log(error));
    }
  

    render() {
      return (
        <div className="Container">
        <div className="row m-2">
           <div className="col-lg-4 col-md-4">
           
              {
                  this.state.PrimaryNosCircle.map((p, index) => {  
                  return <Circle  key={index} className="CircleDefault" value={p}></Circle>
              })
              }
              {
                this.state.SecondaryNosCircle.map((p, index) => {  
                 return <Circle  key={index} className="CircleDefault" value={p}></Circle>
               })

              }
            

          </div>
          <div className="col-lg-1 col-md-1">
           <button onClick={this.FetchPowerBallResult} className="AutoFillButton float-right"></button>
              </div>
         
          <div className="col-lg-5 col-md-5">
            </div>

              </div>
          
 <div className="row">
         
          <div className="col-lg-4 col-md-4">
         
          {
          this.state.SecondaryNos.map((p, index) => {  
            if(p.flag===false)
            {
              return <Square  key={index} className="SquareMarked" value={p.value}></Square>
            }
           else{
            return <Square  key={index} className="SquareDefault" value={p.value}></Square>
           }

            
          })
       }     
        </div>
        
        </div>
       <div className="row">
         
          <div className="col-lg-4 col-md-4">
              <span className="label">Select Your Powerball</span>
          {
            this.state.UserChoice.map((p, index) => {  
            if(p.flag===false)
            {
              return <Square  key={index} className="SquareMarked" value={p.value}></Square>
            }
           else{
            return <Square  key={index} className="SquareDefault" value={p.value}></Square>
           }

            
          })
        }
        </div>
        
        </div> 
        </div>
       
      );

    }
  }
  
  export default PowerBall;