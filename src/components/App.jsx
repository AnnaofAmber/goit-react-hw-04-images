import { useEffect, useState } from 'react';
import css from './App.module.css';

import { searchForImage } from '../api/gallery-api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import Notiflix from 'notiflix';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const perPage = 12;

    const fetchImages = async () => {
      try {
        if (query === '') return;

        setIsLoading(true);
        setIsMore(false);
        const result = await searchForImage(query, page, perPage);
        const data = result.hits;

        setImages(prevState => {
          return [...prevState, ...data];
        });
        setIsMore(true);

        if (result.totalHits < perPage * page && page !== 1) {
          setIsMore(false);
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
        if (data.length < perPage && page === 1) {
          setIsMore(false);
        }
        if (data.length === 0 && page === 1) {
          Notiflix.Notify.failure(
            'Oops! There are no images that match your request!'
          );
          setIsMore(false);
        }
        if (page === 1 && data.length !== 0) {
          Notiflix.Notify.success(
            `"Hooray! We found ${result.totalHits} images."`
          );
        }
      } catch (error) {
        setApiError(true);
        Notiflix.Notify.failure(
          `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query, apiError]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
    setIsMore(false);
  };

  const showModalImage = image => {
    setModalImage(image);
    setIsModal(true);
  };

  const closeModal = () => {
    setModalImage({});
    setIsModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} showModalImage={showModalImage} />
      )}
      {isLoading && <Loader />}
      {isMore && <Button onLoadMore={onLoadMore} />}
      {isModal && <Modal largeImage={modalImage} onClose={closeModal} />}
    </div>
  );
};
