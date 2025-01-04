import axios from "axios";
import { useState } from "react"
import './App.css';


const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ocr/extract`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data.text);
      setExtractedText(response.data.text);
    } catch (error) {
      setError('Failed to extract text. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Transform Your Image into Text</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control"/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Extracting...' : 'Extract text'}
          </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {extractedText && (
        <div className="mt-4">
          <h2>Extracted Text:</h2>
          <pre className="bg-light p-3">{extractedText}</pre>
          </div>
      )}
    </div>
  );
};

export default App;