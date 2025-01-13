enum AuthenticationPath {
  Auth = 'auth',
  Creation = 'creation',
  Overview = 'overview',
  Details = 'details',
  VendorRequest = 'vendorrequest',
  ChangeRequest = 'vendorchangerequest',
}

export enum AuthenticationRoute {
  Overview = `/${AuthenticationPath.Auth}/${AuthenticationPath.Overview}`,
  Creation = `/${AuthenticationPath.Auth}/${AuthenticationPath.Creation}`,
  Details = `/${AuthenticationPath.Auth}/${AuthenticationPath.Details}`,
  VendorRequest = `/${AuthenticationPath.Auth}/${AuthenticationPath.VendorRequest}`,
  ChangeRequest = `/${AuthenticationPath.Auth}/${AuthenticationPath.ChangeRequest}`,
}
