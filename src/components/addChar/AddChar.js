import { useState } from 'react';
import useMarvelService from '../../services/MarvelService'; 

import './addChar.scss';


const AddChar = () => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');

    const {addNewCharacter} = useMarvelService();

    const onAdd = (event) => {
      event.preventDefault();
      console.log('wefwef');
      addNewCharacter(name,desc,image).then(res => console.log(res)).catch(e => console.log(e))
    }

    return(
        <div className='page'>
            <form method='POST' onSubmit={onAdd} class="login-form">
        <h1 class="form-title">Add Char</h1>
        <div class="form-control">
          <label class="form-label" for="name-char">Name Char
          <input
            onChange={e=>setName(e.target.value)}
            class="form-input"
            type="text"
            name="name-char"
            required
          />
          </label>
          <div>
            {image}
          </div>
        </div>
        <div class="form-control">
          <label class="form-label">Description Char
            <input 
            onChange={e=>setDesc(e.target.value)}
            class="form-input" 
            type="text" 
            name="DescChar" />
          </label>
        </div>
        <div class="form-control">
          <label class="form-label" for="password">Image Char
            <input 
            onChange={e=>setImage(e.target.value)}
            class="form-input" 
            type="url"  
            name="ImageChar" 
            required />
          </label>
        </div>
        <button class="add-button"> Add Char</button>

        <button class="del-button" type="button">Deleted Char</button>
      </form>
        </div>
        
    )

}


export  default AddChar;