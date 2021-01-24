import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { ApiUrls } from '../ApiUrls';


@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) {
    }

    addUser(user: User){
        return this.httpClient.post(ApiUrls.AddUser, user);
    }

    uploadCV(file: File, userId: string) {
        const formData = new FormData();
        formData.append('fileKey', file, file.name);
        return this.httpClient.post(ApiUrls.UploadCV + '/userId=' + userId, formData);
    }

    setUser(user: any) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    authenticate(authenticateUser: any) {
        return this.httpClient.post(ApiUrls.Authenticate, authenticateUser);
    }

    forgetUser() {
        this.setUser(null);
    }

    isUserLoggedIn() {
        return this.getLoggedInUser() != null;
    }
}
