import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

const useForm = <T>(callback: () => void, initState: T) => {
  const [inputs, setInputs] = useState<T>(initState);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    callback();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  return { handleChange, handleSubmit, inputs };
};

export default useForm;
