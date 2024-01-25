import { useState } from 'react';
import axios from 'axios';
import './addChar.scss';


const AddChar = () => {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const onAdd = (event) => {

    event.preventDefault();
    axios.post('http://localhost:5175/chars', {
      "name": name,
      "description": desc,
      "img": image
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
    // addNewCharacter(name,desc,image).then(res => console.log(res)).catch(e => console.log(e))
  }

  return (
    <div className='page'>
      <form method='POST' onSubmit={onAdd} className="login-form">
        <h1 className="form-title">Add Char</h1>
        <div className="form-control">
          <label className="form-label" htmlFor="name-char">Name Char
            <input
              onChange={e => setName(e.target.value)}
              className="form-input"
              type="text"
              name="name-char"
              required
            />
          </label>
          <div>
            {image}
          </div>
        </div>
        <div className="form-control">
          <label className="form-label">Description Char
            <input
              onChange={e => setDesc(e.target.value)}
              className="form-input"
              type="text"
              name="DescChar" />
          </label>
        </div>
        <div className="form-control">
          <label className="form-label" htmlFor="password">Image Char
            <input
              onChange={e => setImage(e.target.value)}
              className="form-input"
              type="url"
              name="ImageChar"
              required />
          </label>
        </div>
        <button className="add-button"> Add Char</button>
      </form>
    </div>

  )

}


export default AddChar;