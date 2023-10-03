import css from './Modal.module.css';
import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount = () => {
    const { onClose} = this.props;
    window.addEventListener('keydown', onClose);
  };

  componentWillUnmount = () => {
    const { onClose } = this.props;
    window.removeEventListener('keydown', onClose);
  };

  handleClick = e =>{
    const { onClose} = this.props;
    if (e.target.nodeName === 'DIV' || e.code === 'Escape') {
    onClose()
    }
  }
  
  render() {
    const { largeImage} = this.props;
    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img className={css.modalImage} src={largeImage} alt="" />
        </div>
      </div>
    );
  }
}
