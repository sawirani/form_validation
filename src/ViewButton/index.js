import React,{Component} from 'react'
import './viewbutton.css'

class ViewButton extends Component{

  render(){
    return(
      <button className='send_button' onClick={() => {
        this.props.click()}}> Отправить
      </button>
    )
  }
}

export default ViewButton;