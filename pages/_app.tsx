import { AppProps } from 'next/app';
import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';

import Header from '../components/Header';
import { wrapper } from '../store';

function app({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
}

export default wrapper.withRedux(app);
