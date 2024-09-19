import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Bash() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    fetch('https://akashm8245.pythonanywhere.com/api/bash/')
      .then(response => response.json())
      .then(data => setTabs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    }
  };

  if (tabs.length === 0) {
    return <div className="text-light m-3 vh-100 d-flex align-items-center justify-content-center">Loading...</div>;
  }

  return (
    <div 
      className="d-flex flex-column vh-100 bg-dark text-light"
      style={{ marginTop: '-18px' }}  // Negative margin of 10px at the top
    >
      <ul className="nav nav-tabs bg-dark border-bottom border-secondary flex-shrink-0">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${activeTab === index ? 'active bg-secondary text-light' : 'text-light'}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(index);
              }}
            >
              {tab.no}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex-grow-1 overflow-auto p-3">
        <h4 className="text-info mb-3">{tabs[activeTab].title}</h4>
        <div className="mb-3">
          <h5 className="text-secondary mb-2">Code Snippet:</h5>
          <div ref={codeRef} className="bg-black border border-secondary rounded">
            <SyntaxHighlighter 
              language="bash" 
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: 'transparent',
                margin: 0,
                padding: '1rem',
                fontSize: '14px',
              }}
            >
              {tabs[activeTab].code}
            </SyntaxHighlighter>
          </div>
        </div>
        <button
          className={`btn ${copySuccess ? 'btn-success' : 'btn-outline-info'} btn-sm`}
          onClick={copyToClipboard}
        >
          {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <div className="mt-3">
          <h5 className="text-secondary mb-2">Output:</h5>
          <div className="bg-black border border-secondary rounded">
            <SyntaxHighlighter 
              language="bash" 
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: 'transparent',
                margin: 0,
                padding: '1rem',
                fontSize: '14px',
              }}
            >
              {tabs[activeTab].output}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
