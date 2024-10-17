import React, { useState } from 'react';


function Model() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    setLoading(true);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setPrediction(data.predicted_class);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        alert('Prediction failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setTimeout(() => setLoading(false), 3000); // Simulate a longer loading time for testing
    }
  };
  
  return (
    <div className='container mx-auto'>
      <h1 className="text-4xl font-bold text-center pt-5">Image Classification Model</h1>
      <div className='grid grid-cols-1 md:grid-cols-2  pt-10 '>
        <div className='flex flex-col items-center border-2 border-gray-300 rounded-lg p-6 shadow-lg mx-auto'>
          <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <label htmlFor="images" className="drop-container w-full text-center  ">
              {imagePreview && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Uploaded Image:</h2>
                  <img src={imagePreview} alt="Selected" className="max-w-xs mt-2" />
                </div>
              )}
              <input 
                className='pt-4 w-full text-center' 
                type="file" 
                id="images" 
                accept="image/*" 
                required 
                onChange={handleFileChange}
              />
            </label>
            <button 
              type="submit" 
              className="mt-6 bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-16 rounded-lg"
            >
              Predict
            </button>
          </form>
        </div>

        <div className=' border-2 border-gray-300 rounded-lg p-6 mx-20 pb-10 mb-auto shadow-lg'>
        <h2 className="text-2xl font-semibold">Prediction Result:</h2>
          {!loading && prediction && (
            <div>
              <p className="mt-6 text-2xl text-center text-red-600 font-semibold">{prediction}</p>
            </div>
          )}
          {loading && (
            <div className="overlay fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="text-center">
                <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 mx-auto mb-4 animate-spin"></div>
                <h2 className="text-white text-lg">Loading...</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Model;
