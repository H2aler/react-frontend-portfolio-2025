import { Component, ReactNode, ErrorInfo } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--background-color);
`;

const ErrorContent = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  background: var(--card-background);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ErrorButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--gradient-accent);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow);

  &:hover {
    opacity: 0.9;
  }
`;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>앗! 무언가 잘못되었어요</ErrorTitle>
            <ErrorMessage>
              죄송합니다. 예상치 못한 오류가 발생했습니다.
              <br />
              페이지를 새로고침하거나 홈으로 돌아가세요.
            </ErrorMessage>
            <ErrorButton
              onClick={this.handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              홈으로 돌아가기
            </ErrorButton>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

