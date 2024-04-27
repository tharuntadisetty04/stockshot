import React from 'react';

const MediaItem = ({ item, onDownload, onCopy }) => {

    return (
        <>
            <div className='m-2 text-center max-w-sm rounded overflow-hidden shadow-lg bg-slate-100'>
                {item.type === 'image' ? (
                    <>
                        <img src={item.url} alt={`${item.source} Image`} className='w-full h-72 duration-300 hover:scale-110' loading="lazy" />

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-purple-600">Photo by {item.user}</div>
                            <ul>
                                <li>
                                    <strong>Views: </strong>
                                    <span>{item.views}</span>
                                </li>
                                <li>
                                    <strong>Likes: </strong>
                                    <span>{item.likes}</span>
                                </li>
                                <li>
                                    <strong>Downloads: </strong>
                                    <span>{item.downloads}</span>
                                </li>
                            </ul>
                        </div>

                        <div className='mb-4 flex gap-4 justify-center'>
                            <button onClick={() => onCopy(item.url)} className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold rounded-md'>Copy URL</button>
                            <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold rounded-md' onClick={() => onDownload(item.url)}>Download</button>
                        </div>
                    </>
                ) : (
                    <>
                        <video controls className='w-full max-h-52'>
                            <source src={item.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-purple-600">Video by {item.user}</div>
                            <ul>
                                <li>
                                    <strong>Views: </strong>
                                    <span>{item.views}</span>
                                </li>
                                <li>
                                    <strong>Downloads: </strong>
                                    <span>{item.downloads}</span>
                                </li>
                                <li>
                                    <strong>Likes: </strong>
                                    <span>{item.likes}</span>
                                </li>
                            </ul>
                        </div>

                        <div className='mb-4 flex gap-4 justify-center'>
                            <button onClick={() => onCopy(item.url)} className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold rounded-md'>Copy URL</button>
                            <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold rounded-md' onClick={() => onDownload(item.url)}>Download</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default MediaItem;
