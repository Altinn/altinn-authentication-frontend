import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Heading, Modal, Paragraph, Textfield, Alert } from '@digdir/designsystemet-react';
import { TrashIcon } from '@navikt/aksel-icons';
import classes from './DetailPage.module.css';
import { ActionBar } from '@/components';
import { AuthenticationRoute } from '@/routes/paths';
import {
  useDeleteSystemuserMutation,
  useGetVendorsQuery,
  useUpdateSystemuserMutation,
} from '@/rtk/features/systemUserApi';
import { SystemUser } from '@/types';

interface DetailPageContentProps {
  systemUser: SystemUser;
}

export const DetailPageContent = ({ systemUser }: DetailPageContentProps) => {
  const { t } = useTranslation();
  const deleteModalRef = useRef<HTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const [deleteSystemUser, { isError: isDeleteError }] = useDeleteSystemuserMutation();
  const [updateSystemUser, { isError: isUpdateError }] = useUpdateSystemuserMutation();
  const { data: vendors } = useGetVendorsQuery();

  const vendor = vendors?.find((x) => systemUser.productName === x.systemTypeId);

  const [name, setName] = useState<string>(systemUser.integrationTitle);

  return (
    <div className={classes.detailPageContent}>
      <Modal ref={deleteModalRef}>
        <Modal.Header>{t('authent_detailpage.delete_systemuser_header')}</Modal.Header>
        <Modal.Content>
          {t('authent_detailpage.delete_systemuser_body', {
            title: systemUser.integrationTitle,
          })}
        </Modal.Content>
        {isDeleteError && (
          <Alert severity='danger'>{t('authent_detailpage.delete_systemuser_error')}</Alert>
        )}
        <Modal.Footer>
          <Button
            color='danger'
            onClick={() =>
              deleteSystemUser(systemUser.id)
                .unwrap()
                .then(() => navigate(AuthenticationRoute.Overview))
            }
          >
            {t('authent_detailpage.delete_systemuser')}
          </Button>
          <Button variant='tertiary' onClick={() => deleteModalRef.current?.close()}>
            {t('common.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Heading level={2} size='medium'>
          {systemUser.integrationTitle}
        </Heading>
        <Paragraph size='small' spacing>
          {vendor?.systemVendor?.toUpperCase()}
        </Paragraph>
      </div>
      <Textfield
        label={t('authent_detailpage.edit_systemuser_name')}
        className={classes.nameField}
        size='small'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div>
        <Heading level={3} size='xxsmall' spacing>
          {t('authent_detailpage.included_rights')}
        </Heading>
        {!vendor?.defaultRights.length && <div>{t('authent_detailpage.no_rights')}</div>}
        {vendor?.defaultRights.map((right) => {
          return (
            <ActionBar
              key={right.right}
              title={right.right}
              subtitle={right.serviceProvider}
              color='neutral'
            />
          );
        })}
      </div>
      {isUpdateError && (
        <Alert severity='danger'>{t('authent_detailpage.update_systemuser_error')}</Alert>
      )}
      <div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => {
              updateSystemUser({
                ...systemUser,
                integrationTitle: name,
              });
            }}
            disabled={!name.trim()}
          >
            {t('authent_detailpage.save_systemuser')}
          </Button>
          <Button variant='tertiary' asChild>
            <RouterLink to={AuthenticationRoute.Overview}>{t('common.cancel')}</RouterLink>
          </Button>
        </div>
        <Button
          variant='tertiary'
          color='danger'
          onClick={() => deleteModalRef.current?.showModal()}
        >
          <TrashIcon />
          {t('authent_detailpage.delete_systemuser')}
        </Button>
      </div>
    </div>
  );
};
