chrome.runtime.onInstalled.addListener(async () => {
    // On installation or update, set up initial data
    await chrome.storage.sync.set({ placeData: { place: '', imageData: null } });
    await fetchPlaceData();
  });
  
  // Function to fetch place data from your API
  async function fetchPlaceData() {
    try {
      const response = await fetch('http://localhost:3000/get-place');
      const data = await response.json();
      
      // Save the place name and coordinates in chrome storage
      await new Promise((resolve, reject) => {
        chrome.storage.sync.set({ 
          placeData: { 
            place: data.closestSpot.name,
            coordinates: data.closestSpot.coordinates 
          }
        }, resolve);
      });
  
      const result = await new Promise((resolve, reject) => {
        chrome.storage.sync.get('placeData', (result) => resolve(result));
      });
  
      if (data.closestSpot.name !== result.placeData.place) {
        await fetchImageData(data.closestSpot.coordinates);
      }
    } catch (error) {
      console.error('Error fetching place data:', error);
    }
  }
  
  async function fetchImageData(coordinates) {
    try {
      const response = await fetch(`http://localhost:3000/get-image?lat=${coordinates[0]}&lon=${coordinates[1]}`);
      const data = await response.json();
  
      // Save the image data and title in chrome storage
      await chrome.storage.sync.set({ 
        placeData: { 
          imageData: data.image,
          imageTitle: data.title 
        }
      });
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  }
  
  
  // Fetch place data every 24 hours
  setInterval(fetchPlaceData, 24 * 60 * 60 * 1000); // Fetch every 24 hours
  