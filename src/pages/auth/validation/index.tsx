import { EmailNotification } from 'assets/svg';
import { Button } from 'components';
import React from 'react';

const Validation = () => {
  return (
    <div className="text-center">
      <EmailNotification />
      <p>
        We've sent you a memorandum of understanding to jerry@sitename.com
        with a link to agree. <br />
        Please check your spam if you can find your mail.
      </p>
      <Button variant="outline" className="mt-10">
          I Agree
      </Button>
    </div>
  );
};

export default Validation;
