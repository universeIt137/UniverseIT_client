import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const PhotoGallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const axiosPublic = useAxiosPublic();

    const { data: allPhotos = [], refetch, isLoading } = useQuery({
        queryKey: ['studentGallery'],
        queryFn: async () => {
            const res = await axiosPublic.get('/studentGallery');
            return res.data;
        }
    });

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allPhotos.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allPhotos.length) % allPhotos.length);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrevious();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="bg-[#fefaee]">
            <Helmet>
                <title>Universe IT | photoGallery</title>
            </Helmet>
            <div className="py-4">
                <ComponentsTitle title={'Photo Gallery'} description={'Shine a spotlight on the stories of our determined students who have achieved remarkable feats through their unwavering dedication.'} />
            </div>

            <div className="gallery-container grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 w-10/12 mx-auto">
                {allPhotos?.map((photo, index) => (
                    <img
                        key={photo._id}
                        src={photo.ImageUrl}
                        alt={`Gallery Image ${index + 1}`}
                        className=" w-64 h-64 object-cover cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105"
                        onClick={() => openModal(index)}
                    />
                ))}

                {isOpen && (
                    <div
                        className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                        onClick={handleOutsideClick}
                    >
                        <div className="relative max-w-3xl w-full p-4">
                            <img
                                src={allPhotos[currentIndex]?.ImageUrl}
                                alt={`Zoomed Image ${currentIndex + 1}`}
                                className="w-full h-auto rounded-lg"
                            />
                            <div className="absolute inset-y-0 left-2 flex items-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="text-white bg-black text-3xl p-2 mx-4 bg-opacity-75 rounded-full"
                                >
                                    &#10094;
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-2 flex items-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="text-white bg-black text-3xl p-2 mx-4 bg-opacity-75 rounded-full"
                                >
                                    &#10095;
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;
