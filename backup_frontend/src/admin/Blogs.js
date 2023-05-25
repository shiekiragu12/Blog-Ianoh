import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import './Blogs.scss';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverUrl } from "../ServerUrl";
import { Button, Modal, Form, FormControl, FormSelect } from 'react-bootstrap';
import { toast } from "react-toastify";

function Blogs() {
  // initializing the variables to be used in the uploading of the pdf
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogTag, setBlogTag] = useState('');
  const editorRef = useRef(); // Add this line to define the editorRef
  const [editorData, setEditorData] = useState('');
  const [editorTitle, setEditorTitle] = useState('');
  const [editorImage, setEditorImage] = useState('');



  // ckeditor image upload functionality
  const handleEditorImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      fetch('http://localhost:5000/api/upload-image', {
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
  // saving the data from the ckeditor as blogs

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');

    
    const titleElement = htmlDoc.querySelector('h1');
    setEditorTitle(titleElement ? titleElement.textContent : '');

    const imageElement = htmlDoc.querySelector('img');
    setEditorImage(imageElement ? imageElement.src : '');

    setEditorData(data)
    setBlogCategory('');
    setBlogTag('');


  };


  const handleSaveBlog = () => {
    // You can perform any necessary validations before saving the blog
    // For example, check if the required fields are filled

     if (blogCategory && blogTag) {
    // Send the data to the backend
    serverUrl
      .post('/blog', {
        title: editorTitle,
        description: editorData,
        category: blogCategory,
        tag: blogTag,
      })
      .then(res => {
        console.log(res)
        toast.success('Blog saved successfully.');
      })
      .catch(error => {
        console.error('Error saving blog:', error);
        toast.error('Error saving blog.');
      });
  } else {
    toast.error('Please fill in all the required fields.');
  }
  };

  // importing of the pdf and how to preview it


  // handling how the pdf would be uploaded
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const fileData = await readFileData(file);
        setPdfPreviewUrl(fileData);
        setSelectedFile(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  // reading the pdf uploaded and preview
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

  // imported pdf send it to the backend
  const sendFileToBackend = async (fileData, fileName) => {
    try {
      const formData = new FormData();
      formData.append('pdf', fileData);
      formData.append('title', blogTitle);
      formData.append('category', blogCategory);
      formData.append('tag', blogTag);
      serverUrl.post('/upload-pdf', formData)
        .then((res) => {
          toast.success('PDF uploaded successfully.');
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error uploading PDF:', error.response.data.message);
        })

    } catch (error) {
      console.error('Error uploading PDF:', error);
      // Handle upload error
    }
  };

  //  on the click of the button that uploads the pdf
  const handleSendPdf = async () => {
    if (selectedFile) {
      try {
        await sendFileToBackend(selectedFile, selectedFile.name);
      } catch (error) {
        console.error('Error sending PDF to backend:', error);
      }
    }
    setPdfPreviewUrl(null);
    setBlogTitle('');
    setBlogCategory('');
    setBlogTag('');
  };

  // get the tags that are in the database
  const [tag, setTag] = useState([]);

  useEffect(() => {
    serverUrl.get(`/tag`)
      .then((res) => {
        setTag(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {pdfPreviewUrl ? (
            <div className='pdfPreview'>
              <h1>PDF Preview</h1>
              <Form className='mb-3'>
                <FormControl type='text' placeholder='Blog Title' value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                <FormSelect value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} required>
                  <option disabled value="">Select Blog Category</option>
                  {tag.map((tags) => (
                    <option key={tags.category} value={tags.category}>
                      {tags.category}
                    </option>
                  ))}
                </FormSelect>
                <FormSelect value={blogTag} onChange={(e) => setBlogTag(e.target.value)} required>
                  <option disabled value="">Select Blog Tag</option>
                  {tag.map((tags) => (
                    <option key={tags.name} value={tags.name}>
                      {tags.name}
                    </option>
                  ))}
                </FormSelect>
              </Form>
              <iframe
                src={pdfPreviewUrl}
                width="500"
                height="350"
                title="PDF Preview"
              />
              <button className='btn btn-success opacity-75 text-white align-content-center mt-3' onClick={handleSendPdf}>Save PDF</button>
            </div>
          ) : (
            <>
              <h2>Add A NEW BLOG</h2>

              <Form className='ckeditorForm'>
                <FormSelect value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} required>
                  <option disabled value="">Select Blog Category</option>
                  {tag.map((tags) => (
                    <option key={tags.category} value={tags.category}>
                      {tags.category}
                    </option>
                  ))}
                </FormSelect>

                <FormSelect value={blogTag} onChange={(e) => setBlogTag(e.target.value)} required>
                  <option disabled value="">Select Blog Tag</option>
                  {tag.map((tags) => (
                    <option key={tags.name} value={tags.name}>
                      {tags.name}
                    </option>
                  ))}
                </FormSelect>

                <Button type='submit' className='btn btn-primary mt-3' onClick={handleSaveBlog}>Save Blog</Button> {/* New "Save Blog" button */}

              </Form>

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
                onChange={handleEditorChange}
                onBlur={(event, editor) => {
                  // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  // console.log('Focus.', editor);
                }}
              />


            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Blogs;
