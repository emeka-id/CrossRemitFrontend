import { Loading, Wallet } from 'assets/svg';
import { AxiosResponse } from 'axios';
import { Button, Card } from 'components';
import CustomUpload from 'components/custom-upload';
import UserContext from 'context/user';
import { UpdateUserApiService } from 'core/services/user';
import { handleError } from 'core/utils/error-handler';
import useForm from 'core/utils/use-form';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { IResponse } from 'types/response';
import { ICard, IUser } from 'types/user';
import styles from './verification.module.scss';

const Verification = () => {
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
  const submit = () => mutate({ ...currentUser, idCard: { ...inputs } });

  const { image, type, status = 'Pending' }: ICard = currentUser.idCard;
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
      <form onSubmit={handleSubmit}>
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
                  <span>{currentUser.idCard.status}</span>
                ) : (
                  <CustomUpload
                    name="image"
                    type="file"
                    accept="image/*"
                    variant="outline"
                    onChange={handleChange}
                    label="Upload ID"
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
        {currentUser.idCard.status ? (
          <></>
        ) : (
          <Button type="submit">{isLoading ? <Loading /> : 'Send ID'}</Button>
        )}
      </form>
    </div>
  );
};

export default Verification;
