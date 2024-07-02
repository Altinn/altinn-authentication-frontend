enum AuthenticationPath {
  Auth = 'auth',
  Creation = 'creation',
  Overview = 'overview',
  MaskinportenAdm = 'maskinportenadm',
  RightsIncluded = 'rightsincluded',
  Details = 'details',
  VendorCreation = 'vendorcreation',
}

export enum AuthenticationRoute {
  Overview = `/${AuthenticationPath.Auth}/${AuthenticationPath.Overview}`,
  RightsIncluded = `/${AuthenticationPath.Auth}/${AuthenticationPath.RightsIncluded}`,
  Creation = `/${AuthenticationPath.Auth}/${AuthenticationPath.Creation}`,
  Details = `/${AuthenticationPath.Auth}/${AuthenticationPath.Details}`,
  MaskinportenAdm = `/${AuthenticationPath.Auth}/${AuthenticationPath.MaskinportenAdm}`,
  VendorCreation = `/${AuthenticationPath.Auth}/${AuthenticationPath.VendorCreation}`,
}
