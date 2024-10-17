enum AuthenticationPath {
  Auth = 'auth',
  Creation = 'creation',
  Overview = 'overview',
  RightsIncluded = 'rightsincluded',
  Details = 'details',
  VendorRequest = 'vendorrequest',
}

export enum AuthenticationRoute {
  Overview = `/${AuthenticationPath.Auth}/${AuthenticationPath.Overview}`,
  RightsIncluded = `/${AuthenticationPath.Auth}/${AuthenticationPath.RightsIncluded}`,
  Creation = `/${AuthenticationPath.Auth}/${AuthenticationPath.Creation}`,
  Details = `/${AuthenticationPath.Auth}/${AuthenticationPath.Details}`,
  VendorRequest = `/${AuthenticationPath.Auth}/${AuthenticationPath.VendorRequest}`,
}
