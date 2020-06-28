import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Note } from '../../interfaces/interfaces';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit {

  newNote: string;
  completedNotes: Note[] = [];
  inCompletedNotes: Note[] = [];

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.api.getNotes().subscribe((notes: Note[]) => {
      this.completedNotes = notes.filter(n => n.isCompleted);
      this.inCompletedNotes = notes.filter(n => !n.isCompleted);
    });
  }

  onCheck(id) {
    this.api.onCheck(id).subscribe(() => this.getNotes());
  }

  onDelete(id) {
    this.api.onDelete(id).subscribe(() => this.getNotes());
  }

  onAdd() {
    const note = {
      note: this.newNote
    };

    this.api.addNote(note).subscribe(() => {
      this.newNote = '';
      this.getNotes();
    });
  }

  onSave(item: Note) {
    this.api.editNote(item).subscribe(
      () => {},
      error => {
        alert(error.error.message);
        this.getNotes();
      }
    );
  }
}
