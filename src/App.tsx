import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Guides from './components/Guides';
import Inspirations from './components/Inspirations';
import Stories from './components/Stories';
import Concerts from './components/Concerts';
import Tips from './components/Tips';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/Admin/AdminPanel';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Guides />
    <Inspirations />
    <Stories />
    <Concerts />
    <Tips />
    <Contact />
  </>
);
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HomePage />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;