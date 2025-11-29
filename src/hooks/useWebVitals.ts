import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

const sendToAnalytics = (metric: Metric) => {
  // Google Analytics로 전송 (실제 프로덕션에서 사용)
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // 개발 환경에서 콘솔에 출력
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric);
  }
};

export const useWebVitals = () => {
  useEffect(() => {
    // Core Web Vitals 측정
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    onFID(sendToAnalytics); // First Input Delay
    onFCP(sendToAnalytics); // First Contentful Paint
    onLCP(sendToAnalytics); // Largest Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
  }, []);
};

// 타입 정의
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

