/**
 * Required external modules and interfaces
 */
import express, { Request, Response, Router } from "express";
import * as NoteService from "./notes.service"
import { BaseNote, Note } from "../utils/note.interface";
import * as NoteValidator from "../utils/notes.validator";

/**
 * Router Definition
 */
export const noteRouter: Router = express.Router();

/**
 * Controller Definition
 */

/**
 * POST /notes
 * Create a new note.
 */
noteRouter.post("/", NoteValidator.createRules, NoteValidator.validate, async (req: Request, res: Response) => {
  try {
    const body: BaseNote = req.body;
    const newNote: Note = await NoteService.create(body);
    res.status(201).json(newNote);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
})

/**
 * GET /notes
 * Retrieve all notes.
 */
noteRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notes: Note[] = await NoteService.findAll();
    res.status(200).send(notes);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * GET /notes/:id
 * Retrieve a specific note by ID.
 */
noteRouter.get("/:id", NoteValidator.queryRules, NoteValidator.validate, async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const note: Note = await NoteService.find(id);

    if (note) {
      res.status(200).send(note);
    }

    res.status(404).send('Note not found.');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * PUT /notes/:id
 * Update a specific note.
 */
noteRouter.put("/:id", NoteValidator.updateRules, NoteValidator.validate, async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const body: BaseNote = req.body;
    const existingNote: Note = await NoteService.find(id);

    if (existingNote) {
      const updatedNote: Note | null = await NoteService.update(id, body);
      res.status(200).json(updatedNote);
      return;
    }

    const newNote: Note = await NoteService.create(body);
    res.status(201).json(newNote);  
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

/**
 * DELETE /notes/:id
 * Delete a specific note.
 */
noteRouter.delete("/:id", NoteValidator.queryRules, NoteValidator.validate, async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await NoteService.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});