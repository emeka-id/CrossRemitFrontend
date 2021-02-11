import { Button } from 'components';
import React from 'react';

const Signup = () => {
  return (
    <div>
      <div className="text-center">
        <h2>Join Rabbi</h2>
      </div>
      <form className="mt-40">
        <div className="form-group">
          <input placeholder="Email Address" />
        </div>
        <div className="flex justify-content-end mt-40">
          <Button>Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
