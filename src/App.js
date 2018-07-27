import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)


class App extends Component {

  constructor() {
    super()
    this.submitContact = this.submitContact.bind(this)
    this.editContact = this.editContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.state = {
      title: 'Address Book',
      contacts: [],
      act: 0,
      index: '',
      removing: 0
    }
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  submitContact(e) {
    e.preventDefault()

    let contacts = this.state.contacts
    let name = this.refs.name.value
    let address = this.refs.address.value

    if(this.state.act === 0) {  // NEW
      let contact = {
        name,
        address
      }
      contacts.push(contact)

    } else {                    // UPDATE
      let i = this.state.index
      contacts[i].name = name
      contacts[i].address = address
    }

    this.setState({
      contacts: contacts,
      act: 0
    })


    this.refs.addressForm.reset()
    this.refs.name.focus()
  }

  // ADD A CANCEL BUTTON UNDERNEATH UPDATE BUTTON //
  editContact(i){
    let contact = this.state.contacts[i]
    this.refs.name.value = contact.name
    this.refs.address.value = contact.address

    this.setState({
      act: 1,
      index: i
    })

    this.refs.name.focus()

  }

  deleteContact(i){
    let contacts = this.state.contacts
    contacts.splice(i,1)
    this.setState({
      contacts: contacts,
      removing: 1
    })

    this.refs.addressForm.reset()
    this.refs.name.focus()

  }


  render() {
    let contacts = this.state.contacts

    return (
      <div className="App">
        <h1 className="title">{this.state.title}</h1>
        <form ref="addressForm" className="addressForm">
          <input type="text" ref="name" placeholder="Enter Name" className="formFeild" />
          <input type="text" ref="address" placeholder="Enter Address" className="formFeild" />
          <button onClick={this.submitContact} className="submissionBtn"><FontAwesomeIcon icon={faCoffee} />{this.state.act === 0 ? 'Add Contact' : 'Update'}</button>
        </form>
        <ul className="contactBook">
          <h3 className="listTitle">Contacts:</h3>
          {contacts.map((contact, i) => 
            <li key={i} className="contactsList ">
              <div className="contactInfo">
                {contact.name}, {contact.address}
              </div>
              <div className="btns">
                <button onClick={this.editContact.bind(null, i)} className="listBtn">Edit Contact</button>
                <button onClick={this.deleteContact.bind(null, i)} className="listBtn">Remove Contact</button>
              </div>
            </li>
            )}
        </ul>
      </div>
    );
  }
}

export default App;
