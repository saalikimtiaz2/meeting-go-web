import Layout from 'components/Layout';
import React from 'react';

function HomePage() {
  return (
    <Layout>
      <div>
        <div className="cover  rounded-xl text-white h-[250px] relative overflow-hidden">
          <div className="absolute px-8 top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-black to-transparent flex flex-col justify-center">
            <p className="text-white text-[94px] leading-none font-Oswald">
              7:10 <span className="inline-block text-xl">PM</span>
            </p>
            <p className="">Satureday 8 May, 2024</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
