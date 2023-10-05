import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mars photos from NASA API</title>
        <meta
          name='description'
          content='Frontend app to get Mars photos from the official NASA API'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/assets/favicon.ico' />
      </Head>
      <h1>Started Scafold</h1>
    </>
  );
}
