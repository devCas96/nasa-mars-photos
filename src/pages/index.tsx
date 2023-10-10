import withLayout from '@/components/_hoc/with-layout';
import SectionHome from '@/components/organisms/section-home/section-home';
import Head from 'next/head';

export default function Home() {

  const WrappedHome = withLayout(SectionHome);

  return (
    <>
      <Head>
        <title>Mars photos from NASA API</title>
        <meta
          name='description'
          content='Frontend app to get Mars photos from the official NASA API'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WrappedHome />
    </>
  );
}
