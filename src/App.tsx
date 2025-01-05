import axios from "axios";
import { useState } from "react";
import './App.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [translate, setTranslate] = useState<string>('no');
  const [targetLanguage, setTargetLanguage] = useState<string>('en');
  const [language, setLanguage] = useState<string>('en');
  const [improveExtraction, setImproveExtraction] = useState<string>('no');
  const [summarizeText, setSummarizeText] = useState<string>('no');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTranslate(event.target.value);
  };

  const handleTargetLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleImproveExtractionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImproveExtraction(event.target.value);
  };

  const handleSummarizeTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSummarizeText(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert(language === 'en' ? 'Please select an image file.' : 'Por favor, selecione um arquivo de imagem.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    if (improveExtraction.toLowerCase() === 'yes') {
      formData.append('improveExtraction', improveExtraction);
    }
    if (translate.toLowerCase() === 'yes') {
      formData.append('targetLanguage', targetLanguage);
    }
    if (summarizeText.toLowerCase() === 'yes') {
      formData.append('summarizeText', summarizeText);
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
      setError(language === 'en' ? 'Failed to extract text. Please try again later.' : 'Falha ao extrair o texto. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <label htmlFor="language" className="form-label">{language === 'en' ? 'Select the website Language' : 'Selecione o Idioma do site'}</label>
        <select id="language" value={language} onChange={handleLanguageChange} className="form-control">
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>
      <h1 className="text-center mb-4">{language === 'en' ? 'Transform Your Image into Text' : 'Transforme Sua Imagem em Texto'}</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="translate" className="form-label">{language === 'en' ? 'Do you want to translate with AI?' : 'Você quer traduzir usando IA?'}</label>
          <select id="translate" value={translate} onChange={handleTranslateChange} className="form-control">
            <option value="no">{language === 'en' ? 'No' : 'Não'}</option>
            <option value="yes">{language === 'en' ? 'Yes' : 'Sim'}</option>
          </select>
        </div>
        {translate === 'yes' && (
          <div className="mb-3">
            <label htmlFor="targetLanguage" className="form-label">{language === 'en' ? 'Select target language' : 'Selecione o idioma de destino'}</label>
            <select id="targetLanguage" value={targetLanguage} onChange={handleTargetLanguageChange} className="form-control">
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="improveExtraction" className="form-label">{language === 'en' ? 'Do you want to improve the text extraction with AI?' : 'Você quer melhorar a extração do texto com IA?'}</label>
          <select id="improveExtraction" value={improveExtraction} onChange={handleImproveExtractionChange} className="form-control">
            <option value="no">{language === 'en' ? 'No' : 'Não'}</option>
            <option value="yes">{language === 'en' ? 'Yes' : 'Sim'}</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="summarizeText" className="form-label">{language === 'en' ? 'Do you want to summarize the text with AI?' : 'Você quer resumir o texto usando IA?'}</label>
          <select id="summarizeText" value={summarizeText} onChange={handleSummarizeTextChange} className="form-control">
            <option value="no">{language === 'en' ? 'No' : 'Não'}</option>
            <option value="yes">{language === 'en' ? 'Yes' : 'Sim'}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (language === 'en' ? 'Extracting...' : 'Extraindo...') : (language === 'en' ? 'Extract text' : 'Extrair texto')}
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {extractedText && (
        <div className="mt-4">
          <h2>{language === 'en' ? 'Extracted Text:' : 'Texto Extraído:'}</h2>
          <pre className="bg-light p-3">{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default App;