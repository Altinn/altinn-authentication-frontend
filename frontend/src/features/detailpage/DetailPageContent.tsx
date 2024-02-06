import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Chip,
  Heading,
  Modal,
  Paragraph,
  Link,
  Textfield,
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
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { SystemUserObjectDTO } from '@/rtk/features/overviewPage/overviewPageSlice';
import { AuthenticationRoute } from '@/routes/paths';
import { SystemRegisterProductObjectDTO } from '@/rtk/features/rightsIncludedPage/rightsIncludedPageSlice';

interface DetailPageContentProps {
  systemUser: SystemUserObjectDTO;
}

export const DetailPageContent = ({ systemUser }: DetailPageContentProps) => {
  const deleteModalRef = useRef<HTMLDialogElement | null>(null);

  const rightsObjektArray = useAppSelector(
    (state) => state.rightsIncludedPage.systemRegisterProductsArray,
  );
  const [selectedRights, setSelectedRights] =
    useState<(SystemRegisterProductObjectDTO & { deleted?: boolean })[]>(rightsObjektArray);
  const [name, setName] = useState<string>(systemUser.integrationTitle);

  const toggleAction = (
    right: SystemRegisterProductObjectDTO & { deleted?: boolean },
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
        <Modal.Footer>
          <Button
            color='danger'
            onClick={() => {
              /** */
            }}
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

      <div className={classes.buttonContainer}>
        <Button
          onClick={() => {
            /** */
          }}
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
