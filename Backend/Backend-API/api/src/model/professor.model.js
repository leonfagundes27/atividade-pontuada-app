import mongoose from 'mongoose';

const ProfessorSchema = new mongoose.Schema({
  nome: {
    type:  String,
    required: true
  },
  matriculaId: {
    type: String,
    required: true,
    unique: true
  },
  unidadeId: {
    type: String,
    required: true,
  },
  titulacao: {
    type: String,
    required: true,
    enum: [
      "Especialista",
      "Mestre",
      "Mestra",
      "Doutor",
      "Doutora",
      "Pós-Doutor",
      "Pós-Doutora"]
  },
  referencia: {
    type: String,
    required: true,
  },
  lattes: {
    type: String,
    required: true,
  },
  coursesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }],
  email: {
    type: String,
    required: true,
    unique: true
  },
  statusAtividade: {
    type: String,
    enum: ["Ativo", "Inativo"],
    default: "Ativo",
    required: true,
  },
  notes: {
    type: String,
    default: "Não há obervações"
  }
}) 

const professorModel = mongoose.model("Professor", ProfessorSchema);

export default professorModel;