import React, { useState } from 'react';

export const FormSeguimiento = () => {
    const [values, setValues] = useState({
      peso: '',
      repeticiones: ''
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
  
    return (
      <div>
        <form action="">
          <h1>Form</h1>
          <input
            type="text"
            name="peso"
            placeholder="Ingrese el peso"
            onChange={handleInputChange}
          />
            <input
                type="text"
                name="repeticiones"
                placeholder="Ingrese las repeticiones"
                onChange={handleInputChange}
            />
        </form>
      </div>
    );
  };
  