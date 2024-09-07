import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Python() {
  const [tabs, setTabs] = useState([]); 
  const [activeTab, setActiveTab] = useState(0); 
  const [copySuccess, setCopySuccess] = useState(false); 
  const codeRef = useRef(null); 

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/python/')
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
    return <p>Loading...</p>; 
  }

  return (
    <div className="container mt-5">
      <ul className="nav nav-pills">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
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

      <div className="tab-content mt-3">
        <div className="tab-pane fade show active">
          <p>{tabs[activeTab].title}</p>
            <br />
          <div className="mb-3">
            <h6>Code Snippet:</h6>
            <div ref={codeRef}>
              <SyntaxHighlighter language="python" style={solarizedlight}>
                {tabs[activeTab].code}
              </SyntaxHighlighter>
            </div>
          </div>

          <button
            className={`btn ${copySuccess ? 'btn-success' : 'btn-primary'}`}
            onClick={copyToClipboard}
          >
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </button>

          <div className="mt-3">
            <h6>Output:</h6>
            <SyntaxHighlighter language="python" style={solarizedlight}>
              {tabs[activeTab].output}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
