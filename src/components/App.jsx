import { useEffect, useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'Servises/getImages';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isShowButton, setIsShowButton] = useState(true);

  useEffect(() => {
    if (searchText === '') return;
    setIsLoading(true);
    getImages(searchText, page)
      .then(response => response.json())
      .then(data => {
        setImages(prev => (prev ? [...prev, ...data.hits] : data.hits));
        setIsShowButton(page < data.totalHits / 12);
      })
      .catch(error => {
        console.log('my error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchText]);

  const handleFormSubmit = searchText => {
    setImages([]);
    setSearchText(searchText);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const toogleModal = () => {
    setIsShowModal(prev => !prev);
  };

  const handleModalLargeImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        images={images}
        isLoading={isLoading}
        openModal={toogleModal}
        handleModalLargeImage={handleModalLargeImage}
      />
      {images && images.length > 0 && isShowButton && (
        <Button handleClick={loadMore} />
      )}
      {isShowModal && (
        <Modal openModal={toogleModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};
