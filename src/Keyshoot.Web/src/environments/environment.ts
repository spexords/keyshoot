export const environment = {
    production: false,
    apiUrl: 'https://localhost:5001/api/',
    hubUrl: 'https://localhost:5001/hubs/',
    authConfig: {
      issuer: 'https://localhost:7001',
      redirectUri: 'http://localhost:4200',
      clientId: 'web',
      responseType: 'id_token token',
      scope: 'openid api',
      postLogoutRedirectUri: 'http://localhost:4200',
      showDebugInformation: true,
    }
}