import { EmailNotification } from 'assets/svg';
import { Button } from 'components';
import UserContext from 'context/user';
import { Page } from 'core/utils/constants';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Validation = () => {
  const { signUpState } = useContext(UserContext);
  let history = useHistory();
  
  useEffect(() => {
    if(!signUpState.email)
      history.push(Page.signup);
  }, []);

  const proceed= () =>  history.push(Page.setup);

  return (
    <div className="text-center">
      <EmailNotification />
      <p>
        We've sent you a memorandum of understanding to {signUpState.email} with
        a link to agree. <br />
        Please check your spam if you can find your mail.
      </p>
      <Button variant="outline" className="mt-10" onClick={proceed}>
        I Agree
      </Button>
    </div>
  );
};

export default Validation;
