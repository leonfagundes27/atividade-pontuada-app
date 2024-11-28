import courseService from '../services/course.service.js';

const createCourse = async (req, res) => {
    try{
        const course = await courseService.createCourseService(req.infos);

        if (!course) {
        return res.status(400).send({err: "O curso não foi cadastrado"})
        }

        res.status(201).send({
            msg: "O curso foi cadastrado com sucesso!",
            course: {course}
        })
    }
    catch (err) {
        res.status(500).send({ err: "Erro ao criar curso" });
    }
} 

const findAllCourses = async (req, res) => {
    try {
        res.send(req.courses)
    }
    catch (err) {
        res.status(500).send({ err: "Erro ao buscar todos os cursos" });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await courseService.deleteCourseService(req.courseId)
        res.status(200).send({msg: "O curso foi deletado com sucesso!"})
    }
    catch (err) {
        res.status(500).send({ err: "Erro ao deletar um curso" });
    }
}

const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourseService(req.courseId, req.infos)
        res.status(200).send({msg: "Curso atualizado com sucesso!", course: updatedCourse})
    }
    catch (err) {
        res.status(500).send({ err: "Erro ao atualizar um curso" });
    }
}

// Funções de apoio
const associateProfessorToCourse = async (professorId, coursesId) => {
    await courseService.associateProfessorToCourseService(professorId, coursesId);
}

const desassociateProfessorAllCoursesCourse = async (professorId) => {
    await courseService.desassociateProfessorAllCoursesService(professorId);
}

const filterCourse = async (req, res) => {
    try {
        const {nome, modalidade, coordenador} = req.query

        let filter = {}
    
        if(nome){
            filter.nome = { $regex: nome, $options: 'i' }; // Filtrando por nome, case insensitive
        }

        if(modalidade){
            filter.modalidade = { $in: modalidade.split(',') }
        }

        if(coordenador){
            filter.coordenador = { $regex: coordenador, $options: 'i' } //Filtrando por nome do coordenador, case insensitive
        }

        const cursos = await courseService.filterCourseService(filter)

        res.json(cursos);


    } catch (err) {
        return res.status(500).send({err: "Erro ao filtrar na busca dos cursos"})
    }
}



export {
    createCourse,
    findAllCourses,
    deleteCourse,
    updateCourse,
    associateProfessorToCourse,
    desassociateProfessorAllCoursesCourse,
    filterCourse
}