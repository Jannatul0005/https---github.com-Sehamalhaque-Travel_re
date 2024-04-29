// Gallery.jsx
import React, { useEffect, useState } from 'react';
import '../styles/gallery.css'


const Gallery = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    loadMediaFromLocalStorage();
  }, []);

  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const mediaSrc = e.target.result;
        const mediaType = file.type.startsWith('image') ? 'image' : 'video';
        const location = prompt("Enter media location:");
        const description = prompt("description:");
        const uploadTime = new Date().toISOString();
        const mediaItem = {
          id: new Date().getTime(), // Generate unique ID for the media item
          mediaType,
          mediaUrl: mediaSrc,
          location,
          description,
          uploader: 'User', // Assuming the uploader is the current user
          uploadTime,
          likes: 0, // Initial likes count
          replies: [], // Initial replies array
          enlarged: false, // Initial state for enlargement
        };
        setMediaItems([...mediaItems, mediaItem]);
        // Save the uploaded media locally
        saveMediaLocally([...mediaItems, mediaItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveMediaLocally = (items) => {
    localStorage.setItem('uploadedMedia', JSON.stringify(items));
  };

  const loadMediaFromLocalStorage = () => {
    const storedMedia = localStorage.getItem('uploadedMedia');
    if (storedMedia) {
      setMediaItems(JSON.parse(storedMedia));
    }
  };

  const handleMediaItemClick = (id) => {
    const updatedMediaItems = mediaItems.map((item) => {
      if (item.id === id) {
        item.enlarged = !item.enlarged; // Toggle the enlarged state
      } else {
        item.enlarged = false; // Reset other items to not enlarged
      }
      return item;
    });
    setMediaItems(updatedMediaItems);
  };

  const handleLikeClick = (id) => {
    const updatedMediaItems = mediaItems.map((item) => {
      if (item.id === id) {
        item.likes += 1; // Increment likes count
      }
      return item;
    });
    setMediaItems(updatedMediaItems);
    saveMediaLocally(updatedMediaItems);
  };

  const handleReplySubmit = (id, reply) => {
    const updatedMediaItems = mediaItems.map((item) => {
      if (item.id === id) {
        item.replies.push(reply); // Add reply to the replies array
      }
      return item;
    });
    setMediaItems(updatedMediaItems);
    saveMediaLocally(updatedMediaItems);
  };

  const handleDeleteClick = (id) => {
    const updatedMediaItems = mediaItems.filter((item) => item.id !== id);
    setMediaItems(updatedMediaItems);
    saveMediaLocally(updatedMediaItems);
  };

  return (
    <div id="gallery-container">
      <input
        type="file"
        id="media-input"
        accept="image/*, video/*"
        style={{ display: 'none' }}
        onChange={handleMediaUpload}
      />
      <button id="upload-btn" onClick={() => document.getElementById('media-input').click()}>
        Upload Media
      </button>
      <div id="media-preview">
        {mediaItems.map((item) => (
          <div key={item.id} className={`media-item ${item.enlarged ? 'enlarged' : ''}`}>
            {item.mediaType === 'image' && (
              <img
                src={item.mediaUrl}
                alt="Uploaded media"
                width="300"
                height="200"
                onClick={() => handleMediaItemClick(item.id)}
              />
            )}
            {item.mediaType === 'video' && (
              <video
                src={item.mediaUrl}
                controls
                width="300"
                height="200"
                onClick={() => handleMediaItemClick(item.id)}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {item.enlarged && (
              <div className="media-info">
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Place:</strong> {item.placeName}
                </p>
                <p>
                  <strong>Uploaded by:</strong> {item.uploader}
                </p>
                <p>
                  <strong>Upload time:</strong> {new Date(item.uploadTime).toLocaleString()}
                </p>
                <p>
                  <strong>Likes:</strong> {item.likes}
                </p>
                <div>
                  <button onClick={() => handleLikeClick(item.id)}>Like</button>
                  <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                  <button onClick={() => handleMediaItemClick(item.id)}>Back</button>
                </div>
                <div>
                  <h4>Replies:</h4>
                  {item.replies.map((reply, index) => (
                    <p key={index}>{reply}</p>
                  ))}
                  <textarea
                    placeholder="Type your reply here"
                    onChange={(e) => {
                      const reply = e.target.value;
                      if (reply.trim() !== '') {
                        handleReplySubmit(item.id, reply);
                      }
                    }}
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;