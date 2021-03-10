import { Loading, Wallet } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card, Modal } from 'components';
import CustomUpload from 'components/custom-upload';
import { IModalRef } from 'components/modal';
import UserContext from 'context/user';
import { UpdateUserApiService } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext, useRef } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { IResponse } from 'types/response';
import { ICard, IUser } from 'types/user';
import { IDCardTypes } from './defaults';
import styles from './verification.module.scss';

const Verification = () => {
  const modal = useRef<IModalRef>(null);

  const { isLoading, mutate } = useMutation(UpdateUserApiService, {
    onSuccess: (res: AxiosResponse<IResponse<IUser>>) => {
      const { data } = res.data;
      if (data) {
        toast.success('ID Sent Successfully');
        updateCurrentUser(data);
        return;
      }
    },
    onError: (error) => {
      const { response, message = null } = handleError(error);
      toast.error(response.message);
    },
  });

  const { currentUser, updateCurrentUser } = useContext(UserContext);
  const submit = () =>
    mutate({ ...currentUser, idCard: { ...inputs, status: 'Pending' } });

  const { image, type, status }: ICard = currentUser.idCard;
  const initIDCard = {
    image,
    type,
    status,
  };
  const { inputs, handleChange, handleSubmit } = useForm<ICard>(
    initIDCard,
    submit
  );

  return (
    <div className={styles.verification}>
      <form className={styles.id_card_form} onSubmit={handleSubmit}>
        <div>
          <Card variant="outline">
            <div className={styles.v_details}>
              <div className={styles.icon}>
                <Wallet />
              </div>
              <div className={[styles.text, 'mt-10 mb-10'].join(' ')}>
                <div className={styles.title}>Identity</div>
                <div className={styles.subtitle}>
                  Upload your government issued ID card (International passport,
                  driver's license)
                </div>
              </div>
              <div className={styles.status_not_verified}>
                {currentUser.idCard.image ? (
                  <span className={styles.status_pending}>
                    {currentUser.idCard.status}
                  </span>
                ) : currentUser.idCard.status == 'Verified' ? (
                  <span className={styles.status_verified}>
                    {currentUser.idCard.status}
                  </span>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      modal?.current?.open();
                    }}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Modal ref={modal}>
            Please select type of identification and upload it
            <div className="mt-30">
              <div className={styles.id_card_form}>
                {IDCardTypes.map((idCardTypes: string, index: number) => (
                  <div key={index} className="mt-10">
                    <input
                      type="radio"
                      name="type"
                      id={idCardTypes}
                      value={idCardTypes}
                      onChange={handleChange}
                    />
                    <label htmlFor={idCardTypes}>{idCardTypes}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group mt-30 flex justify-content-between">
              <CustomUpload
                name="image"
                type="file"
                accept="image/*"
                variant="outline"
                onChange={handleChange}
                label="Upload ID"
              />
            </div>
          </Modal>
        </div>
        {currentUser.idCard.status === 'Not Verified' && (
          <div>
            <Button type="submit">
              {isLoading ? <Loading /> : 'Send Identification'}
            </Button>
            {!currentUser.idCard && (
              <span className="ml-30">
                <img src={inputs.image} className="profile-img medium mr-10" />
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Verification;
