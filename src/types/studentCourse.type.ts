import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";
import { TCourse, TSemester } from "./courseManagement.type";
import { TFaculty, TStudent } from "./userManagement.type";

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: TSemester;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: TCourse;
  faculty: TFaculty;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: TEnrolledCourse[];
  isAlreadyEnrolled: boolean;
};

export type TEnrolledCourse = {
  _id: string;
  semesterRegistration: TSemester;
  academicSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  offeredCourse: TOfferedCourse;
  course: TCourse;
  student: TStudent;
  faculty: TFaculty;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  __v: number;
};

export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};
