import { Button, Spinner } from '@digdir/design-system-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { useMediaQuery } from '@/resources/hooks';
import classes from './DirectConsentPageContent.module.css';


export const DirectConsentPageContent = () => {
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSm = useMediaQuery('(max-width: 768px)');

  let overviewText: string;
  overviewText = t('authentication_dummy.auth_overview_text_directconsent'); // h2 below, not in Small/mobile view


  return (
    <div className={classes.overviewActionBarContainer}>

      {!isSm && <h2 className={classes.pageContentText}>{overviewText}</h2>}
      
            <p>
              <br></br>
            Fiken AS ber om tilgangsgrupper blir gitt til systemet. <br></br>
            Tilgangsgruppene vil gi systemintegrasjonen rett til <br></br>
            å aksessere digital tjenester på vegne av Pølsebu AS<br></br> 
            <br></br>
              <a href="https://altinn.github.io/docs/"> Les mer her</a> og  
              <a href="https://docs.altinn.studio/nb/"> her</a>. 
            </p>
            <br></br>
            <p>
            Tilgangsgruppene er: <br></br>
              <br></br>
              - MVA (se tjenester)<br></br>
              - Sykemelding (se tjenester)
              <br></br>
            </p>
            <br></br>
            <p>
            Innholdet i tilgangsgruppene kan endre seg hvis nye
             tjenester for områdetet blir tilgjengelig.

            </p>
            
            <p>
            Tilgangsgruppene kan fjernes når som helst senere fra Altinn profil.
            </p>
      
            <br></br>

            <p> AVVIS-KNAPP _____  GODTA-KNAPP</p>

    </div>
  );
};
