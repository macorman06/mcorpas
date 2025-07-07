import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import './i18n';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="pt-18 flex-grow w-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/es" element={<Home />} />
              <Route path="/es/projects" element={<ProjectsPage />} />
              <Route path="/es/contact" element={<ContactPage />} />
              <Route path="/en" element={<Home />} />
              <Route path="/en/projects" element={<ProjectsPage />} />
              <Route path="/en/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
