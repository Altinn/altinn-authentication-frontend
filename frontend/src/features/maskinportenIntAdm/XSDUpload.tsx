import React from 'react';
// import { AltinnSpinner, FileSelector } from 'app-shared/components';
import { Spinner } from '@digdir/design-system-react';
import FileSelector from './FileSelector';
import axios from 'axios';
// import ErrorPopover from 'app-shared/components/ErrorPopover';
// import { datamodelsUploadPath } from 'app-shared/api/paths';
// import { useTranslation } from 'react-i18next';

// import { useQueryClient } from '@tanstack/react-query';
// import { QueryKey } from 'app-shared/types/QueryKey';
// import { useStudioUrlParams } from 'app-shared/hooks/useStudioUrlParams';

export interface IXSDUploadProps {
  disabled?: boolean;
  submitButtonRenderer?: (fileInputClickHandler: (event: any) => void) => JSX.Element;
}

export const XSDUpload = ({
  disabled,
  submitButtonRenderer,
}: IXSDUploadProps) => {
  // const { t } = useTranslation();
  // const { org, app } = useStudioUrlParams();
  // const queryClient = useQueryClient();

  const [uploading, setUploading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const uploadButton = React.useRef(null);

  const handleUpload = (formData: FormData) => {
    setUploading(true);
    axios
      .post('/authfront/api/v1/systemuser/uploaddisk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response) {
          setErrorText('');
        }
      })
      .catch((error) => {
        if (error) {
          setErrorText('Noe gikk galt i opplasting til BFF');
        }
      })
      .finally( () => {
        setUploading(false);
      });
  };

  return (
    <>
      <span ref={uploadButton}>
        {uploading ? (
          <Spinner title={'Laster opp .jwk'} />
        ) : (
          <FileSelector
            busy={false}
            submitHandler={handleUpload}
            accept='.jwk'
            formFileName='file'
            submitButtonRenderer={submitButtonRenderer}
            disabled={disabled}
          />
        )}
      </span>
      {errorText && (
        <p>{errorText}</p>
      )}
    </>
  );
};
