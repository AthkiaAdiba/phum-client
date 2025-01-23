import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import PHInput from "../../../components/form/PHInput";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useCreateOfferedCoursesMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { weekDaysOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { TFaculty } from "../../../types";
import moment from "moment";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  // console.log("Inside Parent Component", courseId);

  const [addOfferedCourse] = useCreateOfferedCoursesMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  // console.log(facultiesData);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const coursesOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map(
    (item: TFaculty) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("normal", data);

    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrom onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations:"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty:"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department:"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            name="course"
            label="Course:"
            options={coursesOptions}
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            label="Faculty:"
            name="faculty"
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section:" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity:" />
          <PHSelect
            mode="multiple"
            label="Days:"
            name="days"
            options={weekDaysOptions}
          />
          <PHTimePicker name="startTime" label="Start Time:" />
          <PHTimePicker name="endTime" label="End Time:" />
          <Button htmlType="submit">Submit</Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
