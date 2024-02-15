/**
 * Data Model Interface
 */
import { BaseNote, Note } from "../utils/note.interface";
import { Notes } from "../utils/notes.interface";

const noteDefaults: Pick<BaseNote, 'body'> = {
  body: '',
};

/**
 * In-memory Store
 */
let noteRecord: {notes: Notes, lastId: number} = {
  notes: {
    1: {
      "id": 1,
      "title": "TV series",
      "body": "Doom Patrol, The Umbrella Academy, Foyle's War, Miss Marple"
    },
    2: {
      "id": 2,
      "title": "To Do's",
      "body": "Read books\nBake cookies\nListen to classical music"
    },
    3: {
      "id": 3,
      "title": "Famous People",
      "body": "Ralph Waldo Emerson, Nikola Tesla, Edgar Allan Poe"
    }
  },
  lastId: 3
};

/**
 * Service Methods
 */
export const findAll = async (): Promise<Note[]> => Object.values(noteRecord.notes);

export const find = async (id: number): Promise<Note> => noteRecord.notes[id];

export const create = async (newNote: BaseNote): Promise<Note> => {
  const id = noteRecord.lastId + 1;

  noteRecord.notes[id] = {
    id,
    ...noteDefaults,
    ...newNote,
  };
  noteRecord.lastId = id;

  return noteRecord.notes[id];
};

export const update = async (id: number, noteUpdate: BaseNote): Promise<Note | null> => {
  const note = await find(id);
  if (!note) {
    return null;
  }

  noteRecord.notes[id] = {
    ...note,
    ...noteUpdate
  };

  return noteRecord.notes[id];
}

export const remove = async (id: number): Promise<null | void> => {
  let note = await find(id);
  if (!note) {
    return null;
  }

  delete noteRecord.notes[id];
}