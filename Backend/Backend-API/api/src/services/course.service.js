import courseModel from '../model/course.model.js';

const createCourseService = (infos) => courseModel.create(infos);

const findAllCoursesService = () => courseModel.find().populate('professors', 'nome').populate('coordenador', 'nome');

const findCourseByIdService = (courseId) => courseModel.findOne({_id: courseId});

const deleteCourseService = (courseId) => courseModel.findOneAndDelete({_id: courseId});

const updateCourseService = (courseId, infos) => {
    return courseModel.findOneAndUpdate(
    { _id: courseId },
    infos,
    { new: true })
}
const findCoursesByIdService = (courseId) => courseModel.find({_id: {$in: courseId}});

const associateProfessorToCourseService = async (professorId, coursesId) => {
    await courseModel.updateMany(
        { _id: { $in: coursesId } }, 
        { $addToSet: { professors: professorId } },
        { new: true }
    );
}

const desassociateProfessorAllCoursesService = async (professorId) => {
    await courseModel.updateMany(
        { professors: professorId },
        { $pull: { professors: professorId } }
    );
}

const filterCourseService = async (filter) => {
    try {
        return await courseModel.find(filter);
    } catch (err) {
        throw new Error('Erro ao filtrar cursos: ' + err.message);
    }
};


export default {
    createCourseService,
    findAllCoursesService,
    findCourseByIdService,
    deleteCourseService,
    updateCourseService,
    findCoursesByIdService,
    associateProfessorToCourseService,
    desassociateProfessorAllCoursesService,
    filterCourseService
}