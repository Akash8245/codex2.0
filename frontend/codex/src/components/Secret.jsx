import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose the theme you like

export default function Secret() {
  const [copySuccess, setCopySuccess] = useState(false);
  const codeRef = useRef(null);

  const copyToClipboard = () => {
    const text = codeRef.current.textContent || '';
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Clear success message after 2 seconds
      })
      .catch(err => console.error('Failed to copy:', err));
  };

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
        <SyntaxHighlighter language="javascript" style={solarizedlight} ref={codeRef}>
          {`console.log('Hello, World!');`}
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
