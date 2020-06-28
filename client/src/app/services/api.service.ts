import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Note } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private token = null;

    constructor(
        private http: HttpClient) {
    }

    getNotes(): Observable<Note[]> {
        return this.http.get<{notes: Note[]}>('/api/note').pipe(
            map(obj => obj.notes)
        );
    }

    onCheck(id): Observable<any> {
        return this.http.patch<any>(`/api/note/${id}/check`, {});
    }

    onDelete(id): Observable<any> {
        return this.http.delete<any>(`/api/note/${id}`);
    }

    addNote(note: Note) {
        return this.http.post<any>('/api/note', note);
    }

    editNote(note: Note) {
        return this.http.put<any>(`/api/note/${note._id}`, note);
    }

    getUser() {
        return this.http.get<any>('/api/auth/user');
    }

    getUsers() {
        return this.http.get<any>('/api/auth/users');
    }

    changePassword(user) {
        return this.http.put<any>(`/api/auth/password`, user);
    }
}
