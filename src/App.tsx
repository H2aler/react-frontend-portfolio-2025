import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import SEO from './components/SEO';
import InteractivePet from './components/InteractivePet';
import { useWebVitals } from './hooks/useWebVitals';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  gap: 2rem;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(var(--accent-color-rgb), 0.1);
  border-radius: 50%;
  border-top-color: var(--accent-color);
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const Loading = () => (
  <LoadingContainer>
    <LoadingSpinner />
    <LoadingText>로딩 중...</LoadingText>
  </LoadingContainer>
);

const App = () => {
  // Web Vitals 성능 모니터링
  useWebVitals();

  return (
    <AppContainer>
      <SEO />
      <ScrollProgress />
      <Navbar />
      <MainContent>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </MainContent>
      <Footer />
      <ScrollToTop />
      <ThemeToggle />
      <InteractivePet />
    </AppContainer>
  );
};

export default App; 