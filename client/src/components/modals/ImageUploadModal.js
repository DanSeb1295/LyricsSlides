import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageUploadModal.css';
import image from '../../assets/image.png';
import CloseModalButton from './CloseModalButton';

class ImageUploadModal extends Component {
  state = {
    drag: false,
    fileList: []
  };

  dropRef = React.createRef();

  static defaultProps = {
    fileType: 'file',
    fileIconSrc: image
  };

  static propTypes = {
    fileType: PropTypes.string,
    fileIconSrc: PropTypes.string,
    handleDrop: PropTypes.func.isRequired
  };

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      var validFiles = this.validateFileInput(e.dataTransfer.files);
      if (validFiles) {
        this.props.handleDrop(e.dataTransfer.files);
        this.props.onClose();
      } else {
        alert(`Invalid File Type: please upload only ${this.props.fileType}(s).`);
      }
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  handleUpload = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      var validFiles = this.validateFileInput(e.target.files);
      if (validFiles) {
        this.props.handleDrop(e.target.files);
        this.props.onClose();
      } else {
        alert(`Invalid File Type: please upload only ${this.props.fileType}(s).`);
      }
    }
  };

  validateFileInput = inputFiles => {
    const validFileType = this.props.fileType.toLowerCase();
    const listOfFiles = Object.values(inputFiles);
    if (validFileType === 'file') {
      return true;
    } else {
      return listOfFiles.every(inputFile => inputFile.type.startsWith(validFileType));
    }
  };

  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  render() {
    const { onClose } = this.props;

    return (
      <div className="file-upload-component modal-bg" ref={this.dropRef} style={{ ...this.props.style }}>
        <div className="modal-container">
          <div className="dotted-outline">
            <div className="img-icon-container row">
              <img src={this.props.fileIconSrc} alt="File Icon" className="file-type-placeholder" />
            </div>
            <div className="file-upload-text-container">
              <span className="file-upload-text">
                Drag & Drop {this.props.fileType}
                <br />
                Or
              </span>
            </div>
            <div className="browse-file-container row">
              <input
                type="file"
                className="browse-file-upload"
                id="browse-file-upload"
                onChange={this.handleUpload}
                multiple
              />
              <label className="primary-modal-button" htmlFor="browse-file-upload">
                Browse
              </label>
              <CloseModalButton className="secondary-modal-button" text={'Cancel'} onClick={onClose} />
            </div>
            {this.state.drag && <div className="drag-overlay">Release to drop</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploadModal;