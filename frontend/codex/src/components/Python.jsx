import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Python() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const codeRef = useRef(null);

  const getDownloadFileName = (item) => {
    const parts = item.url.split('/');
    return parts[parts.length - 1] || `${item.name}`;
  };

  const notebooks = [
    { name: 'lab1', url: '/notebooks/lab1.ipynb' },
    { name: 'lab2', url: '/notebooks/lab2.ipynb' },
    { name: 'lab3', url: '/notebooks/lab3.ipynb' },
    { name: 'lab4', url: '/notebooks/lab4.ipynb' },
    { name: 'lab5', url: '/notebooks/lab5.ipynb' },
    { name: 'lab6', url: '/notebooks/lab6.ipynb' },
    { name: 'lab7', url: '/notebooks/lab7.ipynb' },
    { name: 'lab8', url: '/notebooks/lab8.ipynb' },
    { name: 'lab9', url: '/notebooks/lab9.ipynb' },
    { name: 'lab10', url: '/notebooks/lab10.ipynb' },
    { name: 'lab11', url: '/notebooks/lab11.ipynb' },
    { name: 'lab12', url: '/notebooks/lab12.ipynb' },
    { name: 'Dataset - Employee_data( 1st )', url: '/notebooks/Salary_Data.csv' },
    { name: 'Dataset - Diabetes ( 2nd )', url: '/notebooks/diabetes.csv' },
    { name: 'Dataset - IRIS ( 3rd and 4th )', url: '/notebooks/Iris.csv' },
    { name: 'Dataset - Trip Details ( 6th )', url: '/notebooks/tripDetails.csv' },
    { name: 'Dataset - Air Passengers ( 9th) ', url: '/notebooks/AirPassengers.csv' },
    { name: 'DW & DM  - Emploee CSV ( 1st and 2nd program )', url: '/notebooks/employee.csv' },
    { name: 'DW & DM  - Emploee xlsx ( 2nd program)', url: '/notebooks/employee.xlsx' },
    { name: 'DW & DM  - Emploee txt ( 2nd program )', url: '/notebooks/employee.txt' },

  ];

  useEffect(() => {
    fetch('https://akashm8245.pythonanywhere.com/api/python/')
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
    <div className="d-flex flex-column vh-100 bg-dark text-light" style={{ marginTop: '-18px' }}>
      {/* <ul className="nav nav-tabs bg-dark border-bottom border-secondary flex-shrink-0">
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
      </ul> */}
      <div className="flex-grow-1 overflow-auto p-3">
        {/* <h4 className="text-info mb-3">{tabs[activeTab].title}</h4> */}
        {/* <div className="mb-3">
          <h5 className="text-secondary mb-2">Code Snippet:</h5>
          <div ref={codeRef} className="bg-black border border-secondary rounded">
            <SyntaxHighlighter
              language="python"
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
        </div> */}

        {/* <button
          className={`btn ${copySuccess ? 'btn-success' : 'btn-outline-info'} btn-sm`}
          onClick={copyToClipboard}
        >
          {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
        </button> */}

        {/* <div className="mt-3">
          <h5 className="text-secondary mb-2">Output:</h5>
          <div className="bg-black border border-secondary rounded">
            <SyntaxHighlighter
              language="python"
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
        </div> */}

        <div className="mt-4">
          <h5 className="text-white mb-2">Download Notebooks:</h5>
          <ul className="list-group">
            {notebooks.map((notebook, index) => (
              <li key={index} className="list-group-item bg-dark border-secondary d-flex justify-content-between align-items-center">
                <span className="text-light">{notebook.name}</span>
                <a href={notebook.url} download={getDownloadFileName(notebook)} className="btn btn-outline-info btn-sm">
                  Download
                </a>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
