import { useState } from 'react';
import css from './App.module.css';

import {searchForImage} from "../api/gallery-api"

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import Notiflix from 'notiflix';


export const App = ()=> {

  const [images, setImages] = useState([])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isMore, setIsMore] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [modalImage, setModalImage] = useState({})
  const [error, setError] = useState(false)




  async function componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    const perPage = 12;
    if (this.state.query === '') {
      return Notiflix.Notify.failure(
        'Sorry, the field is empty. Please try again.'
      );
    }

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        
        const result = await searchForImage(query, page, perPage);
        const data = result.hits
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data],
            isMore: true,
          };
        });
        if (result.totalHits < perPage * page && page !== 1) {
          this.setState({ isMore: false });
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
        if (data.length < perPage && page === 1) {
          this.setState({ isMore: false });
        }
        if (data.length === 0 && page === 1) {
          Notiflix.Notify.failure(
            'Oops! There are no images that match your request!'
          );
          this.setState({ isMore: false });
        }
        if (page === 1 && data.length !== 0) {
          Notiflix.Notify.success(
            `"Hooray! We found ${result.totalHits} images."`
          );
        }
      } catch (error) {
        this.setState({ error: true });
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  const onSubmit = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
    });
  };

 const onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1,
      isMore: false };
    });
  };

  const showModalImage = image => {
    this.setState({
      modalImage: image,
      isModal: true,
    });
  };
    const closeModal = e => {
      this.setState({
        modalImage: {},
        isModal: false,
      });

  }


    return (
      <div className={css.app}>
        <Searchbar onSubmit={onSubmit} />
        {images.length !==0  && (
          <ImageGallery
            images={images}
            showModalImage={showModalImage}
          />
        )}
        {isLoading && <Loader />}
        {isMore && <Button onLoadMore={onLoadMore} />}
        {isModal && (
          <Modal largeImage={modalImage} onClose={closeModal} />
        )}
      </div>
    );
  }

