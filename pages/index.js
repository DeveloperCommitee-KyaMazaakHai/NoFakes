import React from 'react';
import Home from '../views/Home';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Home1(props){
  return(
    <React.StrictMode>
      <div style={{height:'100vh', display:'grid'}}>
        <Header navPosition="right" className="reveal-from-bottom" />
          <main className="site-content">
            <Home />
          </main>
        <Footer />
      </div>
        
    </React.StrictMode>
  )
}