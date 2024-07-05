const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

const sunsetSpots = [
  {
      coordinates: [20.7984, -156.3319],
      name: "Haleakalā National Park, Hawaii, USA",
      sunsetTime: "19:05",
      sunriseTime: "06:17"
  },
  {
      coordinates: [-33.8587, 151.2140],
      name: "Sydney Harbour, Sydney, Australia",
      sunsetTime: "17:04",
      sunriseTime: "06:49"
  },
  {
      coordinates: [36.1070, -112.1130],
      name: "Grand Canyon, Arizona, USA",
      sunsetTime: "19:42",
      sunriseTime: "05:13"
  },
  {
      coordinates: [36.5985, -121.8971],
      name: "Carmel Beach, California, USA",
      sunsetTime: "20:02",
      sunriseTime: "05:54"
  },
  {
      coordinates: [36.0570, -112.1407],
      name: "Horseshoe Bend, Arizona, USA",
      sunsetTime: "19:38",
      sunriseTime: "05:16"
  },
  {
      coordinates: [27.1751, 78.0421],
      name: "Taj Mahal, Agra, India",
      sunsetTime: "18:59",
      sunriseTime: "05:31"
  },
  {
      coordinates: [13.4125, 103.8666],
      name: "Angkor Wat, Cambodia",
      sunsetTime: "18:23",
      sunriseTime: "05:39"
  },
  {
      coordinates: [55.7558, 37.6173],
      name: "Red Square, Moscow, Russia",
      sunsetTime: "21:02",
      sunriseTime: "04:42"
  },
  {
      coordinates: [41.0082, 28.9784],
      name: "Hagia Sophia, Istanbul, Turkey",
      sunsetTime: "20:12",
      sunriseTime: "05:32"
  },
  {
      coordinates: [3.1486, 101.6932],
      name: "Petronas Twin Towers, Kuala Lumpur, Malaysia",
      sunsetTime: "19:31",
      sunriseTime: "07:13"
  },
  {
      coordinates: [-25.3450, 131.0369],
      name: "Uluru, Northern Territory, Australia",
      sunsetTime: "18:38",
      sunriseTime: "06:51"
  },
  {
      coordinates: [36.3932, 25.4615],
      name: "Oia, Santorini, Greece",
      sunsetTime: "20:16",
      sunriseTime: "05:54"
  },
  {
      coordinates: [43.0804, -79.0747],
      name: "Niagara Falls, Ontario, Canada",
      sunsetTime: "20:53",
      sunriseTime: "05:32"
  },
  {
      coordinates: [48.8584, 2.2945],
      name: "Eiffel Tower, Paris, France",
      sunsetTime: "21:57",
      sunriseTime: "05:53"
  },
  {
      coordinates: [40.7488, -73.9857],
      name: "Empire State Building, New York City, USA",
      sunsetTime: "20:29",
      sunriseTime: "05:28"
  },
  {
      coordinates: [-15.7194, -47.7971],
      name: "Chapada dos Veadeiros, Brazil",
      sunsetTime: "17:58",
      sunriseTime: "06:18"
  },
  {
      coordinates: [51.1789, -1.8262],
      name: "Stonehenge, Wiltshire, England",
      sunsetTime: "21:17",
      sunriseTime: "04:54"
  },
  {
      coordinates: [41.9028, 12.4964],
      name: "St. Peter's Basilica, Vatican City",
      sunsetTime: "20:40",
      sunriseTime: "05:34"
  },
  {
      coordinates: [30.3285, 35.4444],
      name: "Petra, Jordan",
      sunsetTime: "19:37",
      sunriseTime: "05:21"
  },
  {
      coordinates: [36.5748, 139.2394],
      name: "Mount Fuji, Japan",
      sunsetTime: "18:43",
      sunriseTime: "04:34"
  },
  {
      coordinates: [25.2760, 55.2962],
      name: "Burj Khalifa, Dubai, UAE",
      sunsetTime: "19:10",
      sunriseTime: "05:40"
  },
  {
      coordinates: [27.9881, 86.9250],
      name: "Mount Everest, Nepal",
      sunsetTime: "18:53",
      sunriseTime: "05:36"
  },
  {
      coordinates: [37.8199, -122.4783],
      name: "Golden Gate Bridge, San Francisco, USA",
      sunsetTime: "20:27",
      sunriseTime: "05:54"
  },
  {
      coordinates: [29.9792, 31.1342],
      name: "Pyramids of Giza, Egypt",
      sunsetTime: "18:55",
      sunriseTime: "05:34"
  },
  {
      coordinates: [-13.1631, -72.5450],
      name: "Machu Picchu, Peru",
      sunsetTime: "17:54",
      sunriseTime: "05:47"
  },
  {
      coordinates: [64.1265, -21.8174],
      name: "Blue Lagoon, Iceland",
      sunsetTime: "00:03",
      sunriseTime: "03:21"
  },
  {
      coordinates: [-8.3405, 115.0920],
      name: "Tanah Lot, Bali, Indonesia",
      sunsetTime: "18:23",
      sunriseTime: "06:20"
  },
  {
      coordinates: [-22.9519, -43.2105],
      name: "Christ the Redeemer, Rio de Janeiro, Brazil",
      sunsetTime: "17:48",
      sunriseTime: "06:18"
  },
  {
      coordinates: [-1.2921, 36.8219],
      name: "Nairobi National Park, Kenya",
      sunsetTime: "18:47",
      sunriseTime: "06:34"
  },
  {
      coordinates: [37.5079, 15.0830],
      name: "Mount Etna, Sicily, Italy",
      sunsetTime: "20:18",
      sunriseTime: "05:37"
  },
  {
      coordinates: [59.4370, 24.7535],
      name: "Tallinn Old Town, Estonia",
      sunsetTime: "22:26",
      sunriseTime: "03:40"
  },
  {
      coordinates: [-33.9249, 18.4241],
      name: "Table Mountain, Cape Town, South Africa",
      sunsetTime: "18:59",
      sunriseTime: "07:47"
  },
  {
      coordinates: [43.6426, -79.3871],
      name: "CN Tower, Toronto, Canada",
      sunsetTime: "21:02",
      sunriseTime: "05:47"
  },
  {
      coordinates: [51.5007, -0.1246],
      name: "Big Ben, London, England",
      sunsetTime: "21:23",
      sunriseTime: "04:53"
  },
  {
      coordinates: [55.9500, -3.1810],
      name: "Arthur's Seat, Edinburgh, Scotland",
      sunsetTime: "22:04",
      sunriseTime: "04:35"
  },
  {
      coordinates: [1.3521, 103.8198],
      name: "Marina Bay Sands, Singapore",
      sunsetTime: "19:11",
      sunriseTime: "07:00"
  },
  {
      coordinates: [-34.6037, -58.3816],
      name: "Obelisco de Buenos Aires, Argentina",
      sunsetTime: "17:45",
      sunriseTime: "07:51"
  },
  {
      coordinates: [35.6895, 139.6917],
      name: "Tokyo Tower, Japan",
      sunsetTime: "18:47",
      sunriseTime: "04:24"
  },
  {
      coordinates: [30.0444, 31.2357],
      name: "Cairo Citadel, Egypt",
      sunsetTime: "18:59",
      sunriseTime: "05:43"
  },
  {
      coordinates: [34.0522, -118.2437],
      name: "Griffith Observatory, Los Angeles, USA",
      sunsetTime: "20:13",
      sunriseTime: "05:42"
  },
  {
      coordinates: [37.7749, -122.4194],
      name: "Twin Peaks, San Francisco, USA",
      sunsetTime: "20:29",
      sunriseTime: "05:53"
  },
  {
      coordinates: [38.7223, -9.1393],
      name: "Miradouro da Senhora do Monte, Lisbon, Portugal",
      sunsetTime: "20:59",
      sunriseTime: "06:09"
  },
  {
      coordinates: [13.7563, 100.5018],
      name: "Wat Arun, Bangkok, Thailand",
      sunsetTime: "18:50",
      sunriseTime: "06:12"
  },
  {
      coordinates: [45.8150, 15.9819],
      name: "Zagreb Cathedral, Croatia",
      sunsetTime: "20:09",
      sunriseTime: "04:56"
  },
  {
      coordinates: [44.4268, 26.1025],
      name: "Palace of the Parliament, Bucharest, Romania",
      sunsetTime: "20:27",
      sunriseTime: "05:50"
  },
  {
      coordinates: [4.2105, 101.9758],
      name: "Cameron Highlands, Malaysia",
      sunsetTime: "19:26",
      sunriseTime: "07:02"
  },
  {
      coordinates: [35.3280, 25.1350],
      name: "Knossos, Crete, Greece",
      sunsetTime: "20:22",
      sunriseTime: "06:16"
  },
  {
      coordinates: [-33.4489, -70.6693],
      name: "San Cristóbal Hill, Santiago, Chile",
      sunsetTime: "17:56",
      sunriseTime: "07:45"
  },
  {
      coordinates: [40.4168, -3.7038],
      name: "Temple of Debod, Madrid, Spain",
      sunsetTime: "21:39",
      sunriseTime: "06:51"
  },
  {
      coordinates: [39.9042, 116.4074],
      name: "Jingshan Park, Beijing, China",
      sunsetTime: "19:49",
      sunriseTime: "05:01"
  },
  // Add 50 more places here with coordinates, name, sunsetTime, and sunriseTime
];



app.get('/get-place', async (req, res) => {
  try {
      const now = new Date();
      let closestSpot = null;
      let closestDelta = Infinity;

      for (const spot of sunsetSpots) {
          const sunsetTime = new Date(`${now.toDateString()} ${spot.sunsetTime}`);
          const delta = Math.abs(now - sunsetTime);

          if (delta < closestDelta) {
              closestDelta = delta;
              closestSpot = spot;
          }
      }

      if (!closestSpot) {
          return res.status(500).json({ error: 'No sunset data found' });
      }

      res.json({ closestSpot });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/get-image', async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
    }
  
    try {
      const apiResponse = await fetch(`https://api.example.com/get-image-title?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`);
      const apiData = await apiResponse.json();
  
      if (!apiResponse.ok) {
        throw new Error(apiData.message || 'Failed to fetch data from external API');
      }
  
      res.json({
        image: apiData.image,
        title: apiData.title,
      });
    } catch (error) {
      console.error('Error fetching image data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});