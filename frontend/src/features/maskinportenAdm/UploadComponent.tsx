import React, { useState, useRef } from 'react';
import axios from 'axios';
import classes from './UploadComponent.module.css';
import { Button } from '@digdir/design-system-react';
// import { UploadIcon } from '@navikt/aksel-icons';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import {
  bekreftJwkTilgjengelighet,
  clearStateAfterApi,
} from '@/rtk/features/maskinportenPageSlice';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationRoute } from '@/routes/paths';

// FIX-ME: om fil er lastet opp, og bruker navigerer
// til annen side, og kommer tilbake: ER FIKSET

export interface IUploadComponentProps {
  opprettKnappBlokkert: boolean;
}

export const UploadComponent = ({ opprettKnappBlokkert }: IUploadComponentProps) => {
  const navigate = useNavigate();
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);

  const [apiUploading, setApiUploading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const dispatch = useAppDispatch();
  const reduxNavn = useAppSelector((state) => state.maskinportenPage.navn);
  const reduxBeskrivelse = useAppSelector((state) => state.maskinportenPage.beskrivelse);

  const inputRefSkjultKnapp = useRef<HTMLInputElement>(null);

  // <input type="file"> gir en stygg upload-knapp, som er skjult
  // her brukes useRef() til å aktivere fil-opplasting
  const handleKlikkSynligKnapp = () => {
    if (inputRefSkjultKnapp) {
      inputRefSkjultKnapp?.current?.click();
    }
  };

  const handleOnChangeFilOpplastet = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUpLoadedFile(event.target.files[0]);

      if (event.target.files[0]) {
        dispatch(bekreftJwkTilgjengelighet({ onJwkFileAvailable: true }));
      } else {
        dispatch(bekreftJwkTilgjengelighet({ onJwkFileAvailable: false }));
        // console.log("Blir faktisk kallet ved onCancel her...")
      }
    }
  };

  // gir template string fil-beskrivelse til bruker om filen er oppe i browser
  const filbeskrivelse = () => {
    if (upLoadedFile) {
      return `Fil opplastet er ${upLoadedFile.name}, størrelse er ${upLoadedFile.size} bytes.`;
    } else {
      return `Ingen fil opplastet ennå (maks er 64 kB).`;
    }
  };

  if (!opprettKnappBlokkert && !upLoadedFile) {
    // if navigation by user has Redux and upLoad out of sync, Redux is cleared
    dispatch(clearStateAfterApi());
  }

  // Går tilbake til startsiden om bruker trykker Avbryt
  const handleAvbryt = () => {
    // om man trykker Avbryt etter å ha lastet opp fil, må Redux også tømmes OK
    dispatch(clearStateAfterApi());
    navigate(AuthenticationRoute.Overview);
  };

  // sender fil til BFF om bruker trykker Opprett:
  // /authfront/api/v1/systemuser/uploaddisk
  // tester 20.10.23 ny URL: /uploadjwk
  const handleApiUpload = (formData: FormData) => {
    setApiUploading(true); // fix-me: informasjon ikke brukt ennå
    axios
      .post('/authfront/api/v1/systemuser/uploadjwk', formData, {
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
      .finally(() => {
        setApiUploading(false); // fix-me: informasjon ikke brukt ennå
      });
  };

  // skal bare kjøres om "Opprett" knapp er blitt aktivert
  // og upLoadedFile er tilgjengelig
  const handleOpprettKnappTrykket = () => {
    if (upLoadedFile) {
      const formData = new FormData();
      formData.append('file', upLoadedFile, upLoadedFile.name);
      formData.append('navn', reduxNavn);
      formData.append('beskrivelse', reduxBeskrivelse);
      handleApiUpload(formData);
    }
    // Tømmer Redux
    dispatch(clearStateAfterApi());
    // Navigerer så til Hovedside: burde oppdatere Redux også
    navigate(AuthenticationRoute.Overview);
  };

  return (
    <div>
      <p className={classes.jwkContentText}>Last opp i jwk i format</p>
      <div className={classes.uploadButtonContainer}>
        <input
          type='file'
          accept='.jwk'
          id='skjultKnapp'
          className={classes.gjemInputButton}
          ref={inputRefSkjultKnapp}
          onChange={handleOnChangeFilOpplastet}
        />
        <Button id='synligKnapp' variant='secondary' size='small' onClick={handleKlikkSynligKnapp}>
          Last opp fil.jwk
        </Button>
        <div className={classes.fileChosenTextWrapper}>
          <span>{filbeskrivelse()}</span>
        </div>
      </div>

      <p className={classes.warningUpdateText}>
        Maskinporten krever at du oppdaterer JWK hver 12. måned. Hvis JWK ikke oppdateres vil
        integrasjonen slutte å virke.
      </p>

      <div className={classes.buttonContainer}>
        <Button size='small' onClick={handleOpprettKnappTrykket} disabled={opprettKnappBlokkert}>
          Opprett
        </Button>
        <Button variant='tertiary' size='small' onClick={handleAvbryt}>
          Avbryt
        </Button>
      </div>
    </div>
  );
};
