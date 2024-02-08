import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Chip,
  Heading,
  Modal,
  Paragraph,
  Link,
  Textfield,
  Alert,
} from '@digdir/design-system-react';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowUndoIcon,
} from '@navikt/aksel-icons';
import classes from './DetailPage.module.css';
import { ActionBar } from '@/components';
import { AuthenticationRoute } from '@/routes/paths';
import {
  useDeleteSystemuserMutation,
  useGetRightsQuery,
  useUpdateSystemuserMutation,
} from '@/rtk/features/systemUserApi';
import { SystemRight, SystemUser } from '@/types';

interface DetailPageContentProps {
  systemUser: SystemUser;
}

export const DetailPageContent = ({ systemUser }: DetailPageContentProps) => {
  const deleteModalRef = useRef<HTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const { data: rights, isError: isLoadRightsError } = useGetRightsQuery();
  const [deleteSystemUser, { isError: isDeleteError }] = useDeleteSystemuserMutation();
  const [updateSystemUser, { isError: isUpdateError }] = useUpdateSystemuserMutation();

  useEffect(() => {
    if (rights) {
      setSelectedRights(rights);
    }
  }, [rights]);

  const [selectedRights, setSelectedRights] = useState<(SystemRight & { deleted?: boolean })[]>([]);
  const [name, setName] = useState<string>(systemUser.integrationTitle);

  const toggleAction = (
    right: SystemRight & { deleted?: boolean },
    action: { name: string; on: boolean },
  ): void => {
    setSelectedRights((oldRights) => {
      return oldRights.map((oldRight) => {
        if (oldRight.right === right.right) {
          return {
            ...oldRight,
            actions: oldRight.actions?.map((y) =>
              y.name === action.name ? { ...y, on: !y.on } : y,
            ),
          };
        }
        return oldRight;
      });
    });
  };

  return (
    <div>
      <Modal ref={deleteModalRef}>
        <Modal.Header>Sletting av systembruker</Modal.Header>
        <Modal.Content>
          {`Er du sikker på at du vil slette systembrukeren "${systemUser.integrationTitle}"?`}
        </Modal.Content>
        {isDeleteError && <Alert severity='danger'>Kunne ikke slette systembruker</Alert>}
        <Modal.Footer>
          <Button
            color='danger'
            onClick={() =>
              deleteSystemUser(systemUser.id)
                .unwrap()
                .then(() => navigate(AuthenticationRoute.Overview))
            }
          >
            Slett systembruker
          </Button>
          <Button variant='tertiary' onClick={() => deleteModalRef.current?.close()}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
      <Link as={RouterLink} to={AuthenticationRoute.Overview} className={classes.backLink}>
        <ArrowLeftIcon />
        Tilbake til oversikt
      </Link>
      <Heading level={2} size='medium'>
        {systemUser.integrationTitle}
      </Heading>
      <Paragraph spacing>{systemUser.productName.toUpperCase()}</Paragraph>
      <Textfield
        label='Endre navn på systembruker'
        className={classes.nameField}
        size='small'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div className={classes.rightsHeader}>
        <Heading level={3} size='xxsmall' spacing>
          Redigere rettigheter:
        </Heading>
        <Button variant='tertiary'>
          <PlusCircleIcon />
          Legg til rettighet
        </Button>
      </div>
      {isLoadRightsError && <Alert severity='danger'>Kunne ikke laste rettigheter</Alert>}
      {selectedRights.length === 0 && <div>Systembrukeren har ingen rettigheter</div>}
      {selectedRights.map((right) => {
        return (
          <ActionBar
            key={right.right}
            title={right.right}
            subtitle={right.serviceProvider}
            color='neutral'
            actions={
              <Button
                variant='tertiary'
                size='small'
                onClick={() => {
                  setSelectedRights((old) =>
                    old.map((selectedRight) =>
                      selectedRight.right == right.right
                        ? { ...selectedRight, deleted: !selectedRight.deleted }
                        : selectedRight,
                    ),
                  );
                }}
              >
                {right.deleted ? (
                  <>
                    Angre fjerning
                    <ArrowUndoIcon />
                  </>
                ) : (
                  <>
                    Fjern rettighet
                    <MinusCircleIcon />
                  </>
                )}
              </Button>
            }
          >
            {right.actions && (
              <div>
                <Paragraph size='small' spacing>
                  Eventuell tekst om rettighetene kommer her.
                </Paragraph>
                <Paragraph size='small' spacing>
                  Dersom du ønsker å begrense tilgangen som blir gitt, kan du klikke på knappene
                  nedenfor for å fjerne de.
                </Paragraph>
                <Chip.Group size='small'>
                  {right.actions.map((action) => {
                    return (
                      <Chip.Toggle
                        key={action.name}
                        selected={action.on}
                        onClick={() => toggleAction(right, action)}
                      >
                        {action.name}
                      </Chip.Toggle>
                    );
                  })}
                </Chip.Group>
              </div>
            )}
          </ActionBar>
        );
      })}
      {isUpdateError && <Alert severity='danger'>Kunne ikke oppdatere systembruker</Alert>}
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
        <Button variant='tertiary' as={RouterLink} to={AuthenticationRoute.Overview}>
          Avbryt
        </Button>
      </div>
      <Button variant='tertiary' color='danger' onClick={() => deleteModalRef.current?.showModal()}>
        <TrashIcon />
        Slett systembruker
      </Button>
    </div>
  );
};
