import { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import './i18n';

const prefixes = ['', '/es', '/en'];

const App = () => (
  <Router>
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)]" />}>
      <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-[var(--ink)] focus:px-3 focus:py-2 focus:text-[var(--bg)]"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            {prefixes.map((p) => [
              <Route key={`${p}/`} path={`${p}/`} element={<Home />} />,
              <Route key={`${p}/projects`} path={`${p}/projects`} element={<Home section="projects" />} />,
              <Route key={`${p}/contact`} path={`${p}/contact`} element={<Home section="contact" />} />,
            ])}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Suspense>
  </Router>
);

export default App;
