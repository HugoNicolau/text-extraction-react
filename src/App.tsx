import axios from "axios";
import { useState } from "react"
import './App.css';


const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [translate, setTranslate] = useState<string>('no');
  const [targetLanguage, setTargetLanguage] = useState<string>('en');
  const [improve, setImprove] = useState<string>('no');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTranslate(event.target.value);
  }

  const handleTargetLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
  }

  const handleImproveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImprove(event.target.value);
  }

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

    if (translate.toLowerCase() === 'yes') {
      formData.append('targetLanguage', targetLanguage);
    }

    if (improve.toLowerCase() === 'yes') {
      formData.append('improve', improve);
    }

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
      setExtractedText(response.data);
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
      <div className="mb-3">
        <label htmlFor="translate" className="form-label">Do you want to translate?</label>
        <select id="translate" value={translate} onChange={handleTranslateChange} className="form-control">
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      {translate === 'yes' && (
        <div className="mb-3">
          <label htmlFor="targetLanguage" className="form-label">Select target language</label>
          <select id="targetLanguage" value={targetLanguage} onChange={handleTargetLanguageChange} className="form-control">
            <option value="pt">Portuguese</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="it">Italian</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="improve" className="form-label">Do you want to improve the text extraction with AI?</label>
        <select id="improve" value={improve} onChange={handleImproveChange} className="form-control">
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
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