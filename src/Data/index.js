import React,{Component} from 'react'
import './data.css'


class Data extends Component{

  render(){
    return(
      <p className='info'>
        {this.props.children}
      </p>
    )
  }

}

export default Data;