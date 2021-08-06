import { AppProps } from 'next/app';
import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';

function app({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default app;
