import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose the theme you like

export default function Secret() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [code, setCode] = useState(''); // State to store fetched code
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://akashm8245.pythonanywhere.com/api/secret/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCode(data.code); 
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch code:', err);
        setError('Failed to fetch code.');
        setLoading(false);
      });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); 
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <figure className="text-center">
        <blockquote className="blockquote">
          <p>You regret joining this college so do I 🙂</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          Site Admin
        </figcaption>
      </figure>

      <div className="mt-4">
        <h6>Code Snippet:</h6>
        <SyntaxHighlighter language="python" style={solarizedlight}>
          {code}
        </SyntaxHighlighter>
        <button 
          className={`btn ${copySuccess ? 'btn-success' : 'btn-primary'} mt-2`} 
          onClick={copyToClipboard}
        >
          {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}
