import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Heading, Modal, Paragraph, Textfield, Alert } from '@digdir/designsystemet-react';
import { TrashIcon } from '@navikt/aksel-icons';
import classes from './DetailPage.module.css';
import { AuthenticationRoute } from '@/routes/paths';
import {
  useDeleteSystemuserMutation,
  useUpdateSystemuserMutation,
} from '@/rtk/features/systemUserApi';
import { SystemUser } from '@/types';

interface DetailPageContentProps {
  systemUser: SystemUser;
}

const IS_EDIT_NAME_ENABLED = localStorage.getItem('systemuser-editname');

export const DetailPageContent = ({ systemUser }: DetailPageContentProps) => {
  const { t } = useTranslation();
  const deleteModalRef = useRef<HTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const [deleteSystemUser, { isError: isDeleteError, isLoading: isDeletingSystemUser }] =
    useDeleteSystemuserMutation();
  const [updateSystemUser, { isError: isUpdateError, isLoading: isUpdatingSystemUser }] =
    useUpdateSystemuserMutation();

  const [name, setName] = useState<string>(systemUser.integrationTitle ?? '');

  const isNameTooLong = name.length > 255;

  return (
    <div className={classes.detailPageContent}>
      <Modal.Dialog ref={deleteModalRef}>
        <Modal.Header>{t('authent_detailpage.delete_systemuser_header')}</Modal.Header>
        <Modal.Content>
          {t('authent_detailpage.delete_systemuser_body', {
            title: systemUser.integrationTitle,
          })}
        </Modal.Content>
        {isDeleteError && (
          <Alert color='danger' role='alert'>
            {t('authent_detailpage.delete_systemuser_error')}
          </Alert>
        )}
        <Modal.Footer>
          <Button
            color='danger'
            disabled={isDeletingSystemUser}
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
      </Modal.Dialog>
      <div>
        <Heading level={2} size='md'>
          {systemUser.integrationTitle || t('authent_detailpage.no_name')}
        </Heading>
        <Paragraph size='sm' spacing>
          {systemUser.supplierName?.toUpperCase()}
        </Paragraph>
      </div>
      {IS_EDIT_NAME_ENABLED && (
        <Textfield
          label={t('authent_detailpage.edit_systemuser_name')}
          className={classes.nameField}
          size='sm'
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={
            isNameTooLong && t('authent_detailpage.name_too_long', { nameLength: name.length })
          }
        />
      )}
      {isUpdateError && (
        <Alert color='danger' role='alert'>
          {t('authent_detailpage.update_systemuser_error')}
        </Alert>
      )}
      <div>
        {IS_EDIT_NAME_ENABLED && (
          <div className={classes.buttonContainer}>
            <Button
              onClick={() => {
                updateSystemUser({
                  ...systemUser,
                  integrationTitle: name,
                });
              }}
              disabled={!name.trim() || isUpdatingSystemUser || isNameTooLong}
            >
              {t('authent_detailpage.save_systemuser')}
            </Button>
            <Button variant='tertiary' asChild>
              <RouterLink to={AuthenticationRoute.Overview}>{t('common.cancel')}</RouterLink>
            </Button>
          </div>
        )}
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
