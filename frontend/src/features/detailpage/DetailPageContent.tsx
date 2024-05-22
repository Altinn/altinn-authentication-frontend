import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Heading,
  Modal,
  Paragraph,
  Link,
  Textfield,
  Alert,
} from '@digdir/designsystemet-react';
import { TrashIcon, ArrowLeftIcon } from '@navikt/aksel-icons';
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
        <Modal.Header>Sletting av systemtilgang</Modal.Header>
        <Modal.Content>
          {`Er du sikker på at du vil slette systemtilgang "${systemUser.integrationTitle}"?`}
        </Modal.Content>
        {isDeleteError && <Alert severity='danger'>Kunne ikke slette systemtilgang</Alert>}
        <Modal.Footer>
          <Button
            color='danger'
            onClick={() =>
              deleteSystemUser(systemUser.id)
                .unwrap()
                .then(() => navigate(AuthenticationRoute.Overview))
            }
          >
            Slett systemtilgang
          </Button>
          <Button variant='tertiary' onClick={() => deleteModalRef.current?.close()}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
      <Link asChild>
        <RouterLink to={AuthenticationRoute.Overview} className={classes.backLink}>
          <ArrowLeftIcon fontSize={28} />
          Tilbake til oversikt
        </RouterLink>
      </Link>
      <div>
        <Heading level={2} size='medium'>
          {systemUser.integrationTitle}
        </Heading>
        <Paragraph size='small' spacing>
          {vendor?.systemVendor?.toUpperCase()}
        </Paragraph>
      </div>
      <Textfield
        label='Endre navn på systemtilgang'
        className={classes.nameField}
        size='small'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div>
        <Heading level={3} size='xxsmall' spacing>
          Inkluderte rettigheter:
        </Heading>
        {!vendor?.defaultRights.length && <div>Systemtilgangen har ingen rettigheter</div>}
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
      {isUpdateError && <Alert severity='danger'>Kunne ikke oppdatere systemtilgang</Alert>}
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
            Lagre endringer
          </Button>
          <Button variant='tertiary' asChild>
            <RouterLink to={AuthenticationRoute.Overview}>Avbryt</RouterLink>
          </Button>
        </div>
        <Button
          variant='tertiary'
          color='danger'
          onClick={() => deleteModalRef.current?.showModal()}
        >
          <TrashIcon />
          Slett systemtilgang
        </Button>
      </div>
    </div>
  );
};
