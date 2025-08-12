import React from 'react';

const VideoPlayer = () => {
  return (
    <div style={{ display:"flex", width:"100%", justifyContent:"center"}}>
      <iframe class='sproutvideo-player' src='https://videos.sproutvideo.com/embed/ea90d5ba141ee6c363/5dc137a4d516c05d?autoPlay=false' width='100%' height='auto' frameborder='0' allowfullscreen referrerpolicy='no-referrer-when-downgrade' title='Video Player'></iframe>
    </div>
  );
};

export default VideoPlayer;