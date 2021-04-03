import { AxiosResponse } from 'axios';
import { CustomInput, Modal } from 'components';
import Button from 'components/button';
import { IModalRef } from 'components/modal';
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
const Payment = ({ inputs, reference, closeCB }: any) => {
  const { currentUser } = useContext(UserContext);
  const triggerRef = useRef<any>(null); //TODO change any
  const modal = useRef<IModalRef>(null);
  //TODO Add a public key to .env
  const config = {
    reference: reference,
    amount: calculateCharges(inputs.amount).finalAmount,
    email: currentUser.email,
    publicKey: `${process.env.REACT_APP_PUBLIC_KEY}`,
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

  const makePayment = () => {
    modal?.current?.close();
    initializePayment(onSuccess, onClose);
  };

  useEffect(() => {
    modal?.current?.open();
  }, []);

  return (
    <>
      <Modal ref={modal}>
        <div className="mb-20 text-center">
          <b>Verify Transaction</b>
        </div>

        <div className="mb-10">
          <CustomInput
            label="Amount"
            defaultValue={inputs.amount}
            disable={true}
          />
        </div>
        <div className="flex justify-content-between">
          <small>Reference:</small>
          <small>
            <b>{reference}</b>
          </small>
        </div>
        <hr className="border-color" />
        <div className="flex justify-content-between">
          <small>Charges: </small>
          <small>
            <b>{calculateCharges(inputs.amount).chargesPlus100}</b>
          </small>
        </div>
        <Button className="mt-35" onClick={makePayment}>
          Proceed
        </Button>
      </Modal>
    </>
  );
};

export default Payment;
