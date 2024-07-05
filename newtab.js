document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('placeData', (data) => {
    if (data.placeData && data.placeData.imageData) {
      const { image, imageTitle } = data.placeData.imageData;
      document.getElementById('image').src = image;
      document.getElementById('title').textContent = imageTitle;
    }
  });
});
