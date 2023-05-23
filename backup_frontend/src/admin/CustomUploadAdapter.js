import { Plugin } from '@ckeditor/ckeditor5-core';
import axios from 'axios';

export class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;

    data.append('file', file);

    return new Promise((resolve, reject) => {
      axios
        .post('/api/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          resolve({
            default: response.data.uploadedImagePath,
          });
        })
        .catch((error) => {
          reject(error.response && error.response.data);
        });
    });
  }
}

export default class CustomUploadAdapterPlugin extends Plugin {
  static get requires() {
    return [CustomUploadAdapter];
  }

  init() {
    const editor = this.editor;
    const { schema } = editor;

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };

    schema.extend('$text', { allowAttributes: 'uploadId' });
  }
}
