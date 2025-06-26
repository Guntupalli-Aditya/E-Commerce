import React from 'react';
import Layout from './Layout';

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <p>Information Collection:  Clearly outline what types of personal information your website collects from users. This may include names, addresses, email addresses, phone numbers, payment details, and any other relevant information. Explain whether this information is collected directly from users or through third parties</p>
            <p>Purpose of Information:  Clearly state the purposes for which you collect and use the personal information. This could include order processing, customer support, marketing communications, and any other legitimate business purposes. Ensure that users understand how their data will be utilized.</p>
            <p>User Rights and Choices: Inform users about their rights regarding their personal information. This may include the right to access, correct, delete, or restrict the processing of their data. Explain how users can exercise these rights and provide contact information for privacy-related inquirie</p>
            <p>Data Security Measures:  Assure users that their personal information is treated securely. Describe the security measures you have in place to protect against unauthorized access, disclosure, alteration, and destruction of data.</p>
          </div>
        </div>
      </Layout>
    )
}

export default Policy;