import React, { useState } from 'react';
import { Menu, X, Plane, Settings } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Guides', href: '#guides' },
    { name: 'Inspirations', href: '#inspirations' },
    { name: 'Récits', href: '#stories' },
    { name: 'Concerts', href: '#concerts' },
    { name: 'Conseils', href: '#tips' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="bg-gradient-to-r from-sage-green to-terracotta p-2 rounded-full">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sage-green">POP travel</h1>
              <p className="text-xs text-terracotta">✈️ Voyage avec style</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-sage-green transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/admin"
              className="flex items-center text-gray-700 hover:text-sage-green transition-colors duration-200 font-medium"
              title="Administration"
            >
              <Settings className="h-5 w-5" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-sage-green"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-sage-green transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/admin"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-sage-green transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-5 w-5 mr-2" />
                Administration
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;