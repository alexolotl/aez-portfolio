import React from 'react';
import { Layout } from '../components/layout';

const NotFoundPage = () => (
  <Layout HEADER_HEIGHT={60} setSelectedProjectIdx={() => null} setActiveContentType={() => null}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
