import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";
import Footer from './Footer';
import HeadContent from "./HeadContent";

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Oswald|Poppins&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />

        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>TradeSimpli</title>
      </Head>
      <Header user={user} />
      <Container fluid text style={{ paddingTop: "2em", paddingBottom: "4em" }}>
        {children}
      </Container>
      <Footer user={user}></Footer>
    </>
  );
}

export default Layout;
