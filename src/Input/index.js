import React,{Component} from 'react'

class Input extends Component{

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Input;