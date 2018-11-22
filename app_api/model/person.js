const Admin = require('./admin');
const Student = require('./student')
const Lecturer = require('./lecturer')
const TYPE = {
    Student: 'student',
    Admin: 'admin',
    Lecturer: 'lecturer'
};

const findById = async (id, callback) => {
    try {
        let person;

        if(!person) person = await Admin.findById(id).exec();

        if(!person) person = await Student.findById(id).exec();

        if(!person) person = await Lecturer.findById(id).exec();

        if(callback) return callback(null, person);
        return person
    } catch (e) {
        if(callback) callback(e);
        console.log(e);
    }
}

const findByMail = async (mail, callback) => {
    try {
        let person;

        if(!person) person = await Admin.findById({mail}).exec();

        if(!person) person = await Student.findById({mail}).exec();

        if(!person) person = await Lecturer.findById({mail}).exec();

        if(callback) return callback(null, person);
        return person
    } catch (e) {
        if(callback) callback(e);
        console.log(e);
    }
}

const findModel = function(type){
    switch(type) {
        case TYPE.Admin: return Admin;
        case TYPE.Student: return Student;
        case TYPE.Lecturer: return Lecturer;
        default: throw new Error('type not found');
    };

}


const authenticate = async (mail, password, done) => {

    let hasUser = false;
    console.log(mail);
    console.log(password);

    try {
        await findUser(TYPE.Admin);
        await findUser(TYPE.Lecturer);
        await findUser(TYPE.Student);
    } catch (err) {
        return done(err);
    }
    console.log(hasUser);


    if (!hasUser) done(null, false, { message: 'mail invalid' })


    async function findUser(type) {
        if (!hasUser) {
            console.log(type);
            let Model = findModel(type);
            let user = await Model.findOne({ mail }).exec();

            if (user) {
                console.log(user);
                hasUser = true;
                user.comparePassword(password, (err, same) => {
                    if (err) return done(err);
                    if (!same) return done(null, false, { message: 'password invalid' });

                    return done(null, user);
                })
            }
        }
    }

};

module.exports = {
    authenticate,
    findModel,
    findById,
    findByMail
};