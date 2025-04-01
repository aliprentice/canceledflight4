import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
