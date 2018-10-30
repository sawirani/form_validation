import React,{Component} from 'react'
import './validation.css'

class ValidationText extends Component{

  render(){
    return(
      <p className='error_message'>{this.props.message}</p>
    )
  }
}

export default ValidationText