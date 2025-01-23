import { useParams } from "react-router-dom";
import {
  useAddMarksMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../components/form/PHFrom";
import PHInput from "../../components/form/PHInput";
import { TSemester, TStudent } from "../../types";
import { TOfferedCourse } from "../../types/studentCourse.type";

type TTableData = {
  _id: string;
  student: TStudent;
  semesterRegistration: TSemester;
  offeredCourse: TOfferedCourse;
};

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    {
      name: "semesterRegistration",
      value: registerSemesterId,
    },
    {
      name: "course",
      value: courseId,
    },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }: TTableData) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      offeredCourse: offeredCourse._id,
      student: student._id,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Update Marks",
      key: "x",
      render: (item: any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }: any) => {
  // console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarksMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentMarks = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    // console.log(studentMarks);

    const res = await addMark(studentMarks);
    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHFrom onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1:" />
          <PHInput type="text" name="midTerm" label="Mid Term:" />
          <PHInput type="text" name="classTest2" label="Class Test 2:" />
          <PHInput type="text" name="finalTerm" label="Final Term:" />
          <Button htmlType="submit">Submit</Button>
        </PHFrom>
      </Modal>
    </>
  );
};

export default MyStudents;
