enum AuthenticationPath {
  Auth = 'auth',
  Creation = 'creation',
  Confirmation = 'confirmation',
  Overview = 'overview',
  MaskinportenAdm = 'maskinportenadm',
  RightsIncluded = 'rightsincluded',
  Details = 'details',
}

export enum AuthenticationRoute {
  Overview = `/${AuthenticationPath.Auth}/${AuthenticationPath.Overview}`,
  RightsIncluded = `/${AuthenticationPath.Auth}/${AuthenticationPath.RightsIncluded}`,
  Creation = `/${AuthenticationPath.Auth}/${AuthenticationPath.Creation}`,
  Details = `/${AuthenticationPath.Auth}/${AuthenticationPath.Details}`,
  Confirmation = `/${AuthenticationPath.Auth}/${AuthenticationPath.Confirmation}`,
  MaskinportenAdm = `/${AuthenticationPath.Auth}/${AuthenticationPath.MaskinportenAdm}`,
}
