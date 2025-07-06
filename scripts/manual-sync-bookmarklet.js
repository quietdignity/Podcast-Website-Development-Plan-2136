// Create a bookmarklet for manual RSS sync
javascript:(function(){
  fetch('https://feeds.captivate.fm/jamesbrowninterviews/')
    .then(r => r.text())
    .then(rssText => {
      // Parse and sync logic here
      console.log('Manual RSS sync started...')
      // Could send to your Supabase directly from browser
    })
    .catch(console.error)
})()