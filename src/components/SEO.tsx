import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEO = ({
  title = '프론트엔드 개발자 포트폴리오',
  description = 'React, TypeScript, 최신 기술을 활용한 웹 개발자 김재현의 포트폴리오입니다.',
  keywords = 'React, TypeScript, 프론트엔드, 웹개발자, Portfolio, 김재현',
  ogImage = 'https://h2aler.github.io/react-frontend-portfolio-2025/og-image.png',
  ogUrl = 'https://h2aler.github.io/react-frontend-portfolio-2025/',
}: SEOProps) => {
  const fullTitle = title === '프론트엔드 개발자 포트폴리오' 
    ? title 
    : `${title} | 프론트엔드 개발자 포트폴리오`;

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Jaehyun Kim" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Jaehyun Kim Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 추가 메타 태그 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3498db" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};

export default SEO;

