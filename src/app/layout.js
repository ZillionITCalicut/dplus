"use client"

import { Inter } from 'next/font/google'
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
const inter = Inter({ subsets: ['latin'] })
import 'animate.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';
import ProjectId1 from '../../config1';


export default function RootLayout({ children }) {
  const [data, setData] = useState([]);
  const [metaDetails, setMetaDetails] = useState({
    title: 'DesignPlus Calicut',
    description: 'Architecture, DesignPlus kozhikode',
    keywords: 'kozhikode, DesignPlus',
  });

  useEffect(() => {
    const fetchMetaDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/project/view/${ProjectId1}`);
        setData(response.data.Metta);
      } catch (error) {
        console.error('Error fetching meta details:', error);
      }
    };

    fetchMetaDetails();
  }, []);

useEffect(() => {
    // Check if the current URL starts with 'www.' on the client side
    if (window.location.hostname.startsWith('www.')) {
      const newURL =
        window.location.protocol +
        '//' +
        window.location.hostname.slice(4) +
        window.location.pathname +
        window.location.search +
        window.location.hash;
      window.location.replace(newURL);
    }
  }, []);

  // Filter data for the "Home" page
  const homePageData = data.find((item) => item.page === 'Home');

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i|Montserrat:400,700" rel="stylesheet"></link>

        <link href="https://fonts.googleapis.com/css2?family=Abel&family=Dancing+Script&family=Nanum+Myeongjo&family=Playfair+Display&family=Rajdhani:wght@300&display=swap" rel="stylesheet"></link>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>


      </head>

      <body className={inter.className}>
        
        <title>{homePageData?.title || metaDetails.title}</title>
        <meta name="title" content={homePageData?.metatitle || metaDetails.title} />
        <meta name="description" content={homePageData?.description || metaDetails.description} />
        <meta name="keywords" content={homePageData?.keywords || metaDetails.keywords} />

        {children}

      </body>

    </html>

  )
}
