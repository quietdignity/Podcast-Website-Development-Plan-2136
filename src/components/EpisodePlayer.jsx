import React, { useEffect, useState } from 'react'

const EpisodePlayer = ({ episodeTitle = "The Daily Note" }) => {
  const [userSession] = useState(() => 
    sessionStorage.getItem('userSession') || Math.random().toString(36).substring(2, 15)
  )

  useEffect(() => {
    sessionStorage.setItem('userSession', userSession)
  }, [userSession])

  return (
    <div className="episode-player">
      <div 
        style={{ 
          width: '100%', 
          height: '200px', 
          marginBottom: '20px', 
          borderRadius: '6px', 
          overflow: 'hidden' 
        }}
      >
        <iframe
          style={{ width: '100%', height: '200px' }}
          frameBorder="no"
          scrolling="no"
          seamless
          src="https://player.captivate.fm/show/b56182bf-22f2-42e4-b14d-6eb32f52dd81"
          title="The Daily Note Podcast Player"
        />
      </div>
    </div>
  )
}

export default EpisodePlayer