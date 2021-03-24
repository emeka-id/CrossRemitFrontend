import { AxiosResponse } from 'axios';
import Button from 'components/button';
import UserContext from 'context/user';
import { VerifyDespositApiService } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { usePaystackPayment } from 'react-paystack';
import { calculateCharges } from './helper';

//TODO change any
const Payment = forwardRef(({ inputs, reference, closeCB }: any, ref) => {
  const { currentUser } = useContext(UserContext);
  const [removeCheckoutButton, setRemoveCheckoutButton] = useState(false);
  const triggerRef = useRef<any>(null); //TODO change any
  //TODO Add a public key to .env
  const config = {
    reference: reference,
    amount: calculateCharges(inputs.amount).finalAmount,
    email: currentUser.email,
    publicKey: 'pk_test_d266be5596c74d3a3721c222d59a8defe87d7c12',
  };

  const verifyDeposit = {
    amount: calculateCharges(inputs.amount).finalAmount,
    charges: calculateCharges(inputs.amount).chargesPlus100,
    purpose: 'Deposit',
    type: 'Deposit',
  };

  //TODO: remove all anyon this page
  const verifyDepositService = async (verifyDeposit: any) => {
    try {
      const response = await VerifyDespositApiService(verifyDeposit);
      toast.success(response.data.message);
    } catch (error) {}
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = useCallback(
    (response) => {
      verifyDepositService({
        ...verifyDeposit,
        ref: response.reference,
      });
    },
    [inputs]
  );

  const onClose = useCallback(() => {
    closeCB(false);
  }, []);

  useImperativeHandle(ref, () => ({
    getAlert() {
      initializePayment(onSuccess, onClose);
    },
  }));

  return (
    <>
      {removeCheckoutButton ? (
        ''
      ) : (
        <button
          id="hello"
          ref={triggerRef}
          onClick={() => initializePayment(onSuccess, onClose)}
        >
          Proceed to Checkout
        </button>
      )}
    </>
  );
});

export default Payment;
