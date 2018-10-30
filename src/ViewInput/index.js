import React, {Component} from 'react'
import './viewinput.css'

class ViewInput extends Component{

  getValue = (e)=> {
    let value = e.target.value;
    let name = this.props.data.Label;

    this.props.getValue(value,name);
  };

  render(){
    return(
      <div>
        <p>{this.props.data.Label}</p>
        <input type={this.props.data.Type} name={this.props.data.Name} onChange={this.getValue} className='input'/>
      </div>
    )
  }

}

export default ViewInput;