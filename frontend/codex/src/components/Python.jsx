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
    { name: '1) Basic Data Operation', url: '/notebooks/lab-1.ipynb' },
    { name: '2) Data Cleaning and Preprocessing', url: '/notebooks/lab-2.ipynb' },
    { name: '3) Visualisation Plots', url: '/notebooks/lab-3.ipynb' },
    { name: '4) Linear Regression', url: '/notebooks/lab-4.ipynb' },
    { name: '5) Logistic regression', url: '/notebooks/lab-5.ipynb' },
    { name: '6) Naive Bayes', url: '/notebooks/lab-6.ipynb' },
    { name: '7) KNN Algorithem', url: '/notebooks/lab-7.ipynb' },
    { name: '8) Decission Tree', url: '/notebooks/lab-8.ipynb' },
    { name: '9) Random Forest', url: '/notebooks/lab-9.ipynb' },
    { name: '10) SVM Algorithem', url: '/notebooks/lab-10.ipynb' },
    { name: '11) KMeans Algorithem', url: '/notebooks/lab-11.ipynb' },
    { name: '12) ARIMA', url: '/notebooks/lab-12.ipynb' },
    { name: 'Dataset(ML) - Salary_Data( Linear Regression )', url: '/notebooks/Salary_Data.csv' },
    { name: 'Dataset(ML) - Diabetes ( Logistic regression )', url: '/notebooks/diabetes.csv' },
    { name: 'Dataset(ML) - IRIS ( Naive Bayes , KNN Algorithem )', url: '/notebooks/Iris.csv' },
    { name: 'Dataset(ML) - Trip Details ( KMeans Algorithem )', url: '/notebooks/tripDetails.csv' },
    { name: 'Dataset(ML) - Air Passengers ( ARIMA ) ', url: '/notebooks/AirPassengers.csv' },
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
