import { cekUserById } from "../services/auth.service.js";
import {
  getAllNotes,
  getNoteById,
  postNewNote,
  editNote,
  deleteNoteById,
} from "../services/note.service.js";

const getAllNoteController = async (req, res) => {
  try {
    const { userId } = req.user;

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const notes = await getAllNotes(userId);
    return res.status(200).json({
      error: false,
      message: "Berhasil mengambil semua notes",
      data: notes,
    });
  } catch (error) {
    const status = error.message.includes("tidak ditemukan") ? 404 : 500;
    return res.status(status).json({
      error: true,
      mC
    });
  }
};

const getNotesByIdController = async (req, res) => {
  try {
    const { userId } = req.user;
    // id notes
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        error: true,
        message: "Format id tidak valid!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const note = await getNoteById(id, userId);
    return res.status(200).json({
      error: false,
      message: "Berhasil mengambil notes",
      data: note,
    });
  } catch (error) {
    const status = error.message.includes("tidak ditemukan") ? 404 : 500;
    return res.status(status).json({
      error: true,
      message: error.message,
    });
  }
};

const postNewNoteController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, contents } = req.body;

    // Validasi body
    if (!title || !contents) {
      return res.status(400).json({
        error: true,
        message: "Title dan content wajib diisi!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const newNote = await postNewNote(userId, { title, contents });
    return res.status(201).json({
      error: false,
      message: "Berhasil membuat notes baru",
      data: newNote,
    });
  } catch (error) {
    const status = error.message.includes("tidak ditemukan") ? 404 : 500;
    return res.status(status).json({
      error: true,
      message: error.message,
    });
  }
};

const editNoteController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: true,
        message: "Format id tidak valid!",
      });
    }

    // validasi body minimal salah satu harus ada
    if (!title && !content) {
      return res.status(400).json({
        error: true,
        message: "Title atau content harus diisi!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const updatedNote = await editNote(id, userId, { title, content });
    return res.status(200).json({
      error: false,
      message: "Berhasil mengupdate notes",
      data: updatedNote,
    });
  } catch (error) {
    const status = error.message.includes("tidak ditemukan") ? 404 : 500;
    return res.status(status).json({
      error: true,
      message: error.message,
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        error: true,
        message: "Format id tidak valid!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    await deleteNoteById(id, userId);
    return res.status(200).json({
      error: false,
      message: "Berhasil menghapus notes",
    });
  } catch (error) {
    const status = error.message.includes("tidak ditemukan") ? 404 : 500;
    return res.status(status).json({
      error: true,
      message: error.message,
    });
  }
};

export {
  getAllNoteController,
  getNotesByIdController,
  editNoteController,
  deleteNoteController,
  postNewNoteController
};
