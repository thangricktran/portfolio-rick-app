import React from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PageHeader = ({header}) =>
  <div className="page-header">
  <h1 className="page-header-title">{header}</h1>
  </div>;

const BasePage = (props) => {
  const router = useRouter();
  const { 
    noWrapper,
    indexPage,
    className = "", 
    header, 
    title="Portfolio - Filip Jerga",
    metaDescription = "My name is Filip Jerga and I am an experienced software engineer and freelance developer. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience.", 
    canonicalPath,
    children 
  } = props;

  const pageType = indexPage ? 'index-page' : 'base-page';
  const Wrapper = noWrapper ? React.Fragment : Container;
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={title} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:description" key="og:description" content={metaDescription} />
        <meta property="og:image" key="og:image" content={`${process.env.BASE_URL}/images/section-1.jpg`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link 
          rel="canonical" 
          href={`${process.env.BASE_URL}${canonicalPath ? canonicalPath : router.asPath}`} 
        />
      </Head>
      <div className={`${pageType} ${className}`}>
        <Wrapper>
          { header && <PageHeader header={header} /> }
          {children}
        </Wrapper>
      </div>
    </>
  );
}

export default BasePage;
