import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MediaItem from './components/MediaItem';
import Pagination from './components/Pagination';
import ErrorDisplay from './components/ErrorDisplay';
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 24;
  const totalPages = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!searchQuery) return;
        const startIndex = (page - 1) * itemsPerPage;

        // Fetch images from Pixabay
        const pixabayResponse = await axios.get(
          `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${searchQuery}&per_page=${itemsPerPage}&image_type=photo&page=${page}`
        );

        const pixabayImages = pixabayResponse.data.hits.map(hit => ({
          type: 'image',
          url: hit.webformatURL,
          id: hit.id,
          source: 'Pixabay',
          user: hit.user,
          views: hit.views,
          likes: hit.likes,
          downloads: hit.downloads,
        }));

        // Fetch videos from Pixabay
        const pixabayVideoResponse = await axios.get(
          `https://pixabay.com/api/videos/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${searchQuery}&per_page=${itemsPerPage}&pretty=true&page=${page}`
        );

        const pixabayVideos = pixabayVideoResponse.data.hits.map(hit => ({
          type: 'video',
          url: hit.videos.small.url,
          id: hit.id,
          source: 'Pixabay',
          user: hit.user,
          views: hit.views,
          likes: hit.likes,
          downloads: hit.downloads,
        }));

        const combinedImages = [...pixabayImages, ...pixabayImages, ...pixabayImages, ...pixabayVideos, ...pixabayVideos];
        const currentPageImages = combinedImages.slice(startIndex, startIndex + itemsPerPage);
        setMedia(currentPageImages);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleImgDownload = (url) => {
    saveAs(url, 'image.jpg')
  };

  const handleVideoDownload = (url) => {
    saveAs(url, 'video.mp4')
  };

  const copyToClipboard = (fileUrl) => {
    navigator.clipboard.writeText(fileUrl)
      .then(notify())
      .catch((error) => console.error('Error copying to clipboard:', error));
  };

  const notify = () => toast("URL Copied ...");

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto font-poppins">
      <h1 className="text-center sm:text-4xl text-xl font-semibold py-4 text-purple-500">StockShot - Stock Images & Videos</h1>

      <div className='flex justify-center items-center flex-col sm:flex-row text-center gap-4 md:mt-1 mb-4'>
        <SearchBar value={searchQuery} onChange={handleSearch} />
        <div className="flex justify-center items-center gap-2">
          <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-medium rounded-md' onClick={() => setPage(1)} disabled={page === 1}>Images</button>
          <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-medium rounded-md' onClick={() => setPage(4)}>Videos</button>
        </div>
      </div>

      {!isLoading && media.length === 0 && <ErrorDisplay message="No Images Found" />}

      <div className='flex justify-center items-center flex-col'>
        {!isLoading && (
          <>
            <div className='grid sm:grid-cols-3 sm:gap-4 '>
              {media.map(item => (
                <MediaItem
                  key={item.id}
                  item={item}
                  onDownload={item.type === 'image' ? handleImgDownload : handleVideoDownload}
                  onCopy={copyToClipboard}
                />
              ))}
            </div>
            <ToastContainer />
          </>
        )}
        {!isLoading && (
          <Pagination setPage={setPage} currentPage={page} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default App;
