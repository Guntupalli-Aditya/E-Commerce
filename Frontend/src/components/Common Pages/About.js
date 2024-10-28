import React from 'react';
import Layout from './Layout';

const About = () => {
    return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to Our World of Inspired Living!
          At E commerce, our journey began with a simple yet profound idea - to curate a collection of products that elevate everyday living. Our brand was born out of a passion . Guided by our core values we are dedicated to bringing you a shopping experience that goes beyond transactions.
          Our founder, Aditya, envisioned a space where quality meets creativity, and our team of dedicated individuals works tirelessly to bring that vision to life. With an unwavering commitment to customer satisfaction, we believe that each purchase is not just a transaction but a step toward enhancing your lifestyle.
          From the meticulous selection of our products to our sustainable practices, E commerce stands for more than just a brand — it's a celebration of craftsmanship, innovation, and the joy of discovery. Join us on this journey as we continue to create moments of inspiration, one product at a time.
          Thank you for being a part of our story.
          E Commerce
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default About;