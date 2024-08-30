export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '4d71cc77-47b6-47d1-9fde-0813138fc094',
      authority: 'https://login.microsoftonline.com/b723353e-68d7-43bb-913e-8b9e935f115c',
    },
  },
  apiConfig: {
    scopes: ['user.read','profile'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
