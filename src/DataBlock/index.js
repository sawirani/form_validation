import React,{Component} from 'react'
import './dataBlock.css'
import Data from "../Data";


class DataBlock extends Component{

  render() {
    return (
      <div className='data_block'>
        <Data>
          {this.props.value.map((el) => (
            <p>{el.name}: {el.value}</p>
          ))}
        </Data>
      </div>
    )
  }

}

export default DataBlock;