import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MsalService } from '@azure/msal-angular';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  profile: ProfileType | undefined;
  private photoUrl = 'https://graph.microsoft.com/v1.0/me/photo/$value';

  constructor(private http: HttpClient, private authService: MsalService) {}

  ngOnInit() {
    this.getProfile(environment.apiConfig.uri);
  }

  getProfile(url: string) {
    console.log(url)
    this.http.get(url).subscribe((profile) => {
      this.profile = profile;
    });
    this.getUserInfo().then((data)=>{console.log(data);})
  }

  getUserInfo() {
    // Solicitar un token de acceso para Microsoft Graph
    return this.authService.instance.acquireTokenSilent({
      scopes: ['User.Read', 'profile','openid']
    }).then((response) => {
      // Configurar los encabezados
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${response.accessToken}`,
        'Content-Type': 'application/json'
      });
      this.http.get(this.photoUrl, { headers, responseType: 'blob' }).subscribe((data)=>{console.log(data); });

      // Realizar la solicitud GET
      return this.http.get(environment.apiConfig.uri, { headers }).toPromise();

    }).catch((error) => {
      console.error('Error al obtener el token de acceso o la información del usuario:', error);
    });
  }

  getPhoto() {
    // Solicitar un token de acceso para Microsoft Graph
    return this.authService.instance.acquireTokenSilent({
      scopes: ['User.Read']
    }).then((response) => {
      // Configurar los encabezados
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${response.accessToken}`
      });

      // Realizar la solicitud GET para obtener la foto como un blob
      return this.http.get(this.photoUrl, { headers, responseType: 'blob' }).toPromise();
    }).catch((error) => {
      console.error('Error al obtener el token de acceso o la foto del perfil:', error);
    });
  }
}
