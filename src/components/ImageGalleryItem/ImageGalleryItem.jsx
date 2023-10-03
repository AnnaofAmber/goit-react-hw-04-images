import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatImage,
  largeImage,
  showModalImage,
  description,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.galleryImage}
        src={webformatImage}
        onClick={() => showModalImage(largeImage)}
        alt={description}
      />
    </li>
  );
};
