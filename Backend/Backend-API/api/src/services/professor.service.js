import professorModel from '../model/professor.model.js';

const createProfessorService = (dadosProfessor) => professorModel.create(dadosProfessor);

const findAllService = () => professorModel.find().populate('coursesId', 'nome sigla');;

const findByNameService = (nome) => {
    return professorModel.find({ nome: { $regex: `.*${nome}.*`, $options: 'i' } }).populate('coursesId', 'nome sigla').exec();
}

  

const findByIdService = (professorId) => professorModel.findOne({_id: professorId});

const updateProfessorService = (id, infos) => {
    try {
        return professorModel.findOneAndUpdate(
        { _id: id }, infos,
        { new: true })
    } catch (err) {
        throw new Error('Erro ao tentar atualizar um professor - Service: ' + err.message);
    }
}

const deleteProfessorService = (professorId) => professorModel.findOneAndDelete({ _id: professorId });

const findProfessorByCourseService = (coursesId) => professorModel.find({courses: { $in: coursesId }}).populate('coursesId', 'nome sigla');

const filterProfessorService = (filter) => professorModel.find(filter).populate('coursesId')

const checkMatriculaIdExistenceService = async (matriculaId) => {
    try {
        const professor = await professorModel.findOne({ matriculaId: matriculaId });
        return professor;
    } catch (err) {
        throw new Error('Erro ao verificar existência da matrícula: ' + err.message);
    }
};

export default {
    createProfessorService,
    findAllService,
    findByNameService,
    findByIdService,
    updateProfessorService,
    deleteProfessorService,
    findProfessorByCourseService,
    filterProfessorService,
    checkMatriculaIdExistenceService
}