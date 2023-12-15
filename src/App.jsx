import React, { useState } from 'react';
import './App.css'

const App = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    experienceName: '',
    date: '',
    numberOfPersons: '',
    customerName: '',
  });
   const [buttonVisible, setButtonVisible] = useState(false);
   const [genrImg, setGenrImg] = useState('');
  //  var genrImg;

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
   const handleButtonClick = () => {
    // Open a new tab or window with the generated image
    console.log(genrImg);
   // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = genrImg;
  anchor.target = '_blank';
  anchor.download = 'passprt_ticket.png';

  // Append the anchor to the document
  document.body.appendChild(anchor);

  // Trigger a click event on the anchor
  anchor.click();

  // Remove the anchor from the document
  document.body.removeChild(anchor);
    setButtonVisible(false);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a backend API endpoint (replace with your actual endpoint)
    const apiUrl = 'https://passprtassign.onrender.com/generate-ticket';
    
    try {
      // Perform POST request to the backend
      console.log("payload: ",formData)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
       .then((response) => response.json())
      .then((data) => {
       // Set the Base64 image as the source of the image element
       const genr = `data:image/png;base64,${data.base64Image}`;
       setGenrImg(genr);
       console.log(genr);
         setButtonVisible(true);
       console.log('Form submitted successfully!');
        // You can perform additional actions here if needed
        formData.customerName="";
        formData.experienceName="";
        formData.date="";
        formData.numberOfPersons="";
  });
      
       
    
      
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div>
      <h2>Passprt Travel Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Experience Name:
          <input
            type="text"
            name="experienceName"
            value={formData.experienceName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Date u want to choose:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          No. of Persons:
          <input
            type="number"
            name="numberOfPersons"
            value={formData.numberOfPersons}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
        {buttonVisible && (
        <button className='btnDown' onClick={handleButtonClick}>Download Ticket</button>
      )}
      </form>
    </div>
  );
};

export default App;
