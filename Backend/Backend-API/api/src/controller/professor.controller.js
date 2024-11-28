import { associateProfessorToCourse, desassociateProfessorAllCoursesCourse } from './course.controller.js'
import professorService from '../services/professor.service.js';


// Cadastra professores - post('/')
const createProfessor = async (req, res) => {
  try {
    const professor = await professorService.createProfessorService(req.infos);

    if (!professor) {
      return res.status(400).send({err: "O professor não foi cadastrado"})
    }

    associateProfessorToCourse(professor._id, professor.coursesId);

    return res.status(201).send({
      message: "O professor foi cadastrado com sucesso!",
      professor: {professor}
    })
  } 
  catch (err) {
    return res.status(500).send({ msg: err.msg });
  }
}

// Busca todos os professores - get('/')
const findAll = async (req, res) => {
  try {
    res.status(200).send(req.professors)
  }
  catch (err) {
    res.status(500).send({ err: "Erro ao buscar todos os professores"});
  }

}

// Busca os professores pelo nome - get(':nome')
const findByName = async (req, res) => {
  try {
    const nome = req.params.nome;

    const professors = await professorService.findByNameService(nome);

    if (!professors || professors.length == 0) {
      return res.status(400).send({err: "Não há professores cadastrados com esse nome"})
    }

    res.send(professors)
  }
  catch (err) {
    return res.status(500).send({ err: "Erro ao buscar professores por nome" });
  }
}

//Atualiza dados de um professor pelo numero de matricula - put('/:id')
const updateProfessor = async (req, res) => {
  try {
    desassociateProfessorAllCoursesCourse(req.id);

    const updatedProfessor = await professorService.updateProfessorService(req.id, req.infos);

    associateProfessorToCourse(updatedProfessor._id, updatedProfessor.coursesId);

    res.status(201).send({
      msg: "O professor foi atualizado com sucesso!",
      professor: {updatedProfessor}
    })
  }
  catch (err) {
    res.status(500).send({ err: "Erro ao tentar atualizar um professor" });
  }
}

//Deleta um professor da base de dados - delete('/:id')
const deleteProfessor = async (req, res) => {
  try {
    const deletedProfessor = await professorService.deleteProfessorService(req.params.id);
    
    if(await professorService.findByIdService(deletedProfessor._id)){
      res.status(400).send({err: 'Professor não deletado'})
    }
    
    await desassociateProfessorAllCoursesCourse(deletedProfessor._id, deletedProfessor.coursesId);
    
    res.status(200).send({msg: "Professor removido com sucesso!" })
  }
  catch (err) {
    res.status(500).send({ err: "Erro ao deletar um professor" });
  }
}

// Buscar os professores pelos cursos selecionados - get('/courses/:courses')
const findProfessorByCourse = async (req, res) => {
  try {
    const professores = await professorService.findProfessorByCourseService(req.coursesId);
    res.send(professores)
  }
  catch (err) {
    res.status(500).send({ err: "Erro ao buscar professores pelo curso" });
  }
}

//Busca professores com base no nome, curso, titulacao ou unidade especificada no parâmetro - get('/filter)
const filterProfessor = async (req, res) => {

  try {
    const {nome, cursos, titulacoes} = req.query;

    let filter = {}

    if (nome) {
      filter.nome = { $regex: nome, $options: 'i' }; // Filtrando por nome, case insensitive
  }
  
  if (cursos) {
      filter['coursesId'] = { $in: cursos.split(',') };
  }
  
  if (titulacoes) {
      filter.titulacao = { $in: titulacoes.split(',') };
  }
  
  const professores = await professorService.filterProfessorService(filter);
  
  res.json(professores);
  } catch (err) {
    return res.status(500).send({ err: "Erro ao filtrar professores na busca" })
  }
}


export  {
  createProfessor,
  findAll,
  findByName,
  updateProfessor,
  deleteProfessor,
  findProfessorByCourse,
  filterProfessor
}