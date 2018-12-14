import Dashboard from "./Dashboard";
import ClassInfo from "./ClassInfo";
import AddClassSurveys from "./AddClassSurveys";
import AllStudents from "./AllStudents";
import AddStudents from "./AddStudents";
import DeleteStudents from "./DeleteStudents";
import AllTeachers from "./AllTeachers";
import AddTeachers from "./DeleteTeachers";
import DeleteTeachers from "./DeleteTeachers";
import SurveyResult from "./SurveyResult";
import Reports from "./Reports";

export const adminRoute = [
    {
        path: "/",
        exact: true,
        component: Dashboard
    },
    {
        path: "/dashboard",
        exact: false,
        component: Dashboard
    },
    {
        path: "/classInfo",
        exact: true,
        component: ClassInfo
    },
    {
        path: "/addClassSurvey",
        exact: false,
        component: AddClassSurveys
    },
    {
        path: "/allStudents",
        exact: false,
        component: AllStudents
    },
    {
        path: "/addStudents",
        exact: false,
        component: AddStudents
    },
    {
        path: "/deleteStudents",
        exact: false,
        component: DeleteStudents
    },
    {
        path: "/allTeachers",
        exact: false,
        component: AllTeachers
    },
    {
        path: "/addTeachers",
        exact: false,
        component: AddTeachers
    },
    {
        path: "/deleteTeachers",
        exact: false,
        component: DeleteTeachers,
    },
    {
        path: "/surveyResult",
        exact: false,
        component: SurveyResult
    },
    {
        path: "/report",
        exact: false,
        component: Reports
    },
    {
        path: "",
        exact: true,
        component: Dashboard
    }
]