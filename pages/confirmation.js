import React from 'react';
import ConfirmationView from "../views/Confirmation";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Confirmation (props) {
    return(
        <React.StrictMode>
            <div style={{height:'100vh', display:'grid'}}>
                <Header navPosition="right" className="reveal-from-bottom" />
                <main className="site-content">
                    <ConfirmationView />
                </main>
                <Footer />
            </div>
        </React.StrictMode>
    )
}