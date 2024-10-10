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
        <Heading level={2} size='sm'>
          {t('authent_maskinporten.sub_title')}
        </Heading>
        <Textfield
          label={t('authent_maskinporten.name')}
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textfield
          label={t('authent_maskinporten.description')}
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <Paragraph>{t('authent_maskinporten.upload_jwk_format')}</Paragraph>
          <div className={classes.uploadButtonContainer}>
            <input
              type='file'
              accept='.jwk'
              id='skjultKnapp'
              className={classes.gjemInputButton}
              ref={inputRefSkjultKnapp}
              onChange={handleOnChangeFilOpplastet}
            />
            <Button id='synligKnapp' variant='secondary' size='sm' onClick={handleKlikkSynligKnapp}>
              {t('authent_maskinporten.upload_jwk')}
            </Button>
            <Paragraph size='sm'>
              {uploadedFile
                ? t('authent_maskinporten.uploaded_file_info', {
                    filename: uploadedFile.name,
                    filesize: uploadedFile.size,
                  })
                : t('authent_maskinporten.no_file_uploaded')}
            </Paragraph>
          </div>
          <Paragraph size='sm'>{t('authent_maskinporten.upload_description')}</Paragraph>
        </div>
        {isUploadError && (
          <Alert color='danger'>{t('authent_maskinporten.create_integration_error')}</Alert>
        )}
        <div className={classes.buttonContainer}>
          <Button
            size='sm'
            onClick={handleConfirm}
            disabled={!name || !description || !uploadedFile}
          >
            {t('authent_maskinporten.create_integration')}
          </Button>
          <Button variant='tertiary' size='sm' onClick={handleCancel}>
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};
