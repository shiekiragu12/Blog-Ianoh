import React, { useRef, useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import './Blogs.scss';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverUrl } from "../ServerUrl";

function Blogs() {
  const handleEditorImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);
      // Make an HTTP request to send the file data to the backend
      // and resolve the promise with the response URL
      // Replace 'backend-api-url' with the actual backend API endpoint
      fetch('backend-api-url', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          const imageUrl = data.url;
          resolve({ default: imageUrl });
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          reject(error);
        });
    });
  };

  // uploading pdf
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const fileData = await readFileData(file);
        sendFileToBackend(fileData, file.name);
        setPdfPreviewUrl(fileData);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const sendFileToBackend = (fileData, fileName) => {
    // Make an HTTP request to send the file data and file name to the backend
    // Replace 'backend-api-url' with the actual backend API endpoint
    console.log('File Name:', fileName);
    console.log('File Data:', fileData);
  };
  const handleSendPdf = () => {
    setPdfPreviewUrl(null)
  }

  return (
    <>
      <Header />
      <SideBar />
      <div className='BlogDashboard'>
        <div className='pdf'>
          <p>Import Pdf Blog</p>
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <button className='btn btn-warning text-white align-content-center mt-3' onClick={() => fileInputRef.current.click()}>Import PDF</button>
          {pdfPreviewUrl && (
            <div className='pdfPreview'>
              <h1>PDF Preview</h1>
              <iframe
                src={pdfPreviewUrl}
                width="500"
                height="300"
                title="PDF Preview"
              />
              <button className='btn btn-success opacity-75 text-white align-content-center mt-3' onClick={handleSendPdf}>Save PDF</button>

            </div>

          )}

        </div>
        <h2>Add A NEW BLOG</h2>
        <CKEditor
          editor={Editor}
          data="<p>Title For The Blog</p>"
          config={{
            simpleUpload: {
              uploadUrl: 'http://localhost:5000/api/upload-image',
              withCredentials: true,
            },
          }}
          onReady={(editor) => {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
              return {
                upload: () => handleEditorImageUpload(loader.file),
                abort: () => { },
              };
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
    </>
  );
}

export default Blogs;
