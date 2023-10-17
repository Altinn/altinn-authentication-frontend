import React, { useState, useRef } from 'react';
import axios from 'axios';
import classes from './UploadKomponent.module.css';
import { Button } from '@digdir/design-system-react';
import { UploadIcon } from '@navikt/aksel-icons';

export const UploadKomponent = () => {

    // Vi kunne kjøre dispatch() til Redux
    // men er det mulig å type en fil?

    // upLoadedFile er ennå ikke typet
    const [upLoadedFile, setUpLoadedFile] = useState();

    const inputRefSkjultKnapp = useRef(null);
    
    // <input type="file"> gir en stygg upload-knapp, som er skjult
    // her brukes useRef() til å aktivere fil-opplasting
    const handleKlikkSynligKnapp = () => {
        if (inputRefSkjultKnapp) {
            inputRefSkjultKnapp?.current?.click();    
        }  
    }

    const handleOnChangeFilOpplastet = (event: any) => {
        setUpLoadedFile(event.target.files[0])
        // kunne kjøre en dispatch() av jwk-fil her
        // et spørsmål er om brukeren kan ombestemme seg, og
        // kjøre prosessen to ganger: vil feil sertifikat bli lastet opp?
        // Nei. Template string blir i alle fall oppdatert hver gang test.jwk
        // blir byttet med test2.jwk
    };

    // gir template string filbeskrivelse til bruker
    const filbeskrivelse = () => {
        if (upLoadedFile) {
            return `Fil opplastet er ${ upLoadedFile.name}, størrelse er ${ upLoadedFile.size} bytes.`
        } else return `Ingen fil opplastet ennå (maks er 64 kB).`;  
    } 

    return (
        <div className={classes.uploadButtonContainer}>
            <div className={classes.uploadButtonWrapper}>
                <input 
                    type='file'
                    accept='.jwk'
                    id = 'skjultKnapp'
                    className = {classes.gjemInputButton}
                    ref={inputRefSkjultKnapp}
                    onChange={ handleOnChangeFilOpplastet }
                />
                <Button 
                    id= 'synligKnapp'
                    color='primary'
                    variant='outline' 
                    size='small'
                    onClick = { handleKlikkSynligKnapp }
                >
                    Last opp fil.jwk
                </Button> 
            </div>
            <div className={classes.fileChosenTextWrapper}>
              <span>{filbeskrivelse()}</span> 
            </div>
        </div>        
    );
};
