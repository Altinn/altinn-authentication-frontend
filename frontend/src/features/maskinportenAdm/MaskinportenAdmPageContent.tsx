import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Heading, Paragraph, Textfield } from '@digdir/designsystemet-react';
import classes from './MaskinportenAdmPageContent.module.css';
import { useUploadJwkMutation } from '@/rtk/features/maskinportenApi';
import { useNavigate } from 'react-router-dom';
import { AuthenticationRoute } from '@/routes/paths';

export const MaskinportenAdmPageContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRefSkjultKnapp = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [uploadJwk, { error: isUploadError }] = useUploadJwkMutation();

  const handleKlikkSynligKnapp = () => {
    if (inputRefSkjultKnapp) {
      inputRefSkjultKnapp?.current?.click();
    }
  };

  const handleOnChangeFilOpplastet = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleConfirm = () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile, uploadedFile.name);
      formData.append('navn', name);
      formData.append('beskrivelse', description);
      uploadJwk(formData)
        .unwrap()
        .then(() => navigate(AuthenticationRoute.Overview));
    }
  };

  const handleCancel = () => {
    navigate(AuthenticationRoute.Overview);
  };

  return (
    <div>
      <div className={classes.flexContainer}>
        <Heading level={2} size='small'>
          {t('authent_maskinporten.sub_title')}
        </Heading>
        <Textfield
          label='Navn'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textfield
          label='Beskrivelse'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <Paragraph>Last opp i jwk i format</Paragraph>
          <div className={classes.uploadButtonContainer}>
            <input
              type='file'
              accept='.jwk'
              id='skjultKnapp'
              className={classes.gjemInputButton}
              ref={inputRefSkjultKnapp}
              onChange={handleOnChangeFilOpplastet}
            />
            <Button
              id='synligKnapp'
              variant='secondary'
              size='small'
              onClick={handleKlikkSynligKnapp}
            >
              Last opp fil.jwk
            </Button>
            <Paragraph size='small'>
              {uploadedFile
                ? `Fil opplastet er ${uploadedFile.name}, størrelse er ${uploadedFile.size} bytes.`
                : `Ingen fil opplastet ennå (maks er 64 kB).`}
            </Paragraph>
          </div>
          <Paragraph size='xsmall'>
            Maskinporten krever at du oppdaterer JWK hver 12. måned. Hvis JWK ikke oppdateres vil
            integrasjonen slutte å virke.
          </Paragraph>
        </div>
        {isUploadError && <Alert severity='danger'>Kunne ikke opprette integrasjon</Alert>}
        <div className={classes.buttonContainer}>
          <Button
            size='small'
            onClick={handleConfirm}
            disabled={!name || !description || !uploadedFile}
          >
            Opprett integrasjon
          </Button>
          <Button variant='tertiary' size='small' onClick={handleCancel}>
            Avbryt
          </Button>
        </div>
      </div>
    </div>
  );
};
