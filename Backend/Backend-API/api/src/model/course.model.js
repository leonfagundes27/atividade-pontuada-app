import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  codCourse: {
    type: String,
    required: true,
    unique: true,
  },
  disciplinas: {
    type: [String],
    required: true,
  },
  sigla: {
    type: String,
    required: true,
    unique: true,
  },
  modalidade: {
    type: String,
    required: true,
    enum: ["Presencial", "EAD", "Híbrido"],
  },
  professors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
  ],
  coordenador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
  },
});

const courseModel = mongoose.model("Course", CourseSchema);

export default courseModel;
