import React from 'react';
import Header from '../../componets/header/header';
import BlogList from '../../componets/bloglist/blogList';
import Footer from '../../componets/footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <BlogList />
      <Footer />
    </div>
  );
};

export default Home