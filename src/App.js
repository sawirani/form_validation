import React, {Component} from 'react';
import './App.css';
import ViewInput from './ViewInput'
import Input from './Input'
import ViewButton from "./ViewButton";
import ValidationText from "./ValidationText";
import DataBlock from "./DataBlock";

class App extends Component {

  state = {

    fieldsValue: [],
    fields: [
      {
        Type: 'text',
        Label: 'Имя',
        Name: 'name',
        Required: true,
        ValidateType: 'name'
      },
      {
        Type: 'text',
        Name: 'birthDate',
        Label: 'Дата рождения',
        Required: true,
        ValidateType: 'date'
      },
      {
        Type: 'text',
        Label: 'E-mail',
        Name: 'email',
        Required: true,
        ValidateType: 'email'
      },
      {
        Type: 'text',
        Label: 'Возраст',
        Name: 'age',
        Required: true,
        ValidateType: 'age'
      },
    ],
    validateMassage: '',
    validate: false,

  };

  validateEmail(data) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(data.value);
  }

  validateName(data) {
    let reg = /^[А-Я][а-я]*$/;

    return reg.test(data.value);
  }

  validateDate(data) {
    let arrD = data.value.split(".");
    arrD[1] -= 1;
    let d = new Date(arrD[2], arrD[1], arrD[0]);
    let date = new Date();

    return ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0]) && (date.getFullYear() >= d.getFullYear()));
  }

  validateAge(data) {
    return data.value > 0;
  }

  checkRequired(){
    let validateMessage = '';
    let find = false;

    for (let i = 0; i < this.state.fields.length; i++) {
      find = false;
      for (let j = 0; j < this.state.fieldsValue.length; j++) {
        if (this.state.fields[i].Label === this.state.fieldsValue[j].name) {
          find = true;
          break;
        }
      }
      if (find === false) {
        if (this.state.fields[i].Required === true) {
          validateMessage = 'поле: ' + '\"' + this.state.fields[i].Label + '\"' + ' должно быть заполнено!';
          break;
        }
      }
    }

    return validateMessage;
  }

  getValue = (value, name) => {

    let add = false;
    let fieldsValue = [...this.state.fieldsValue];

    for (let i = 0; i < fieldsValue.length; i++) {
      if (fieldsValue[i].name === name) {
        console.log(i + 'tut');
        fieldsValue[i].value = value;
        add = true;
      }
    }

    if (add === false) {
      fieldsValue.push({name: name, value: value});
    }

    this.setState({
      fieldsValue
    })

  };

  CheckData = () => {
    let validateMessage = '';

    let data = [...this.state.fieldsValue];


    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.state.fields.length; j++) {
        if (this.state.fields[j].Label === data[i].name) {
          if (this.state.fields[j].ValidateType === 'email') {
            if (!this.validateEmail(data[i])) {
              validateMessage = 'Введите корректный e-mail';
              break;
            }
          } else if (this.state.fields[j].ValidateType === 'name') {
            if (!this.validateName(data[i])) {
              validateMessage = 'Введите имя на русском языке с большой буквы';
              break;
            }
          } else if (this.state.fields[j].ValidateType === 'date') {
            if (!this.validateDate(data[i])) {
              validateMessage = "Введена некорректная дата!";
              break;
            }
          } else if (this.state.fields[j].ValidateType === 'age') {
            if (!this.validateAge(data[i])) {
              validateMessage = 'Введен некорректный возраст!';
              break;
            }
          }
        }
      }
    }

    if (!validateMessage) {
      validateMessage = this.checkRequired();
    }

    let validate = false;
    if (!validateMessage) {
      validate = true;
    }

    this.setState({
      validateMessage,
      validate
    })
  };

  render() {
    return (
      <div className='page'>
        <div>

          {this.state.validateMessage && <ValidationText message={this.state.validateMessage}/>}

          <Input>
            {this.state.fields.map((el, i) => (
              <ViewInput data={el} key={i} getValue={this.getValue}/>
            ))}
          </Input>

          <ViewButton click={this.CheckData}/>

          </div>

        { this.state.validate && <DataBlock value={this.state.fieldsValue}/> }

      </div>
    )
  }
}

export default App;