import React, { useState } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchField = ({ label,onSearch,setQuery,query,placeholder='Search',disabled=false }) => {
  // const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSearch(query); 
  };

  return (
    <Form inline onSubmit={handleSubmit} style={{display:'inline-block'}} className='w-100'>
     <Form.Group>
      {label && <Form.Label className='' >{label}</Form.Label>}
      <InputGroup className='shadow py-1 w-100'>
        {/* <InputGroup.Prepend> */}
          <InputGroup.Text className='bg-white border-0'>
            <FaSearch /> 
          </InputGroup.Text>
        {/* </InputGroup.Prepend> */}
        <FormControl
          type="text"
          placeholder={placeholder}
          className="mr-sm-2 border-0"
          value={query}
          disabled={disabled}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <Button variant="outline-success" type="submit">Search</Button> */}
      </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchField;
