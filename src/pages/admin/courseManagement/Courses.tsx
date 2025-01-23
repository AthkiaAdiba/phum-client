import { Button, Modal, Table } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHFrom from "../../../components/form/PHFrom";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userMangement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TFacultyInfo = {
  key: string;
  title: string;
  code: string;
};

type AddFacultyModalProps = {
  facultyInfo: TFacultyInfo;
};

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: TFacultyInfo) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }: AddFacultyModalProps) => {
  // console.log(facultyInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [assignFaculties] = useAddFacultiesMutation();

  // console.log(facultiesData);

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const assignFacultiesData = {
      courseId: facultyInfo.key,
      data,
    };

    assignFaculties(assignFacultiesData);
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
          <PHSelect
            mode="multiple"
            name="faculties"
            label="Faculties:"
            options={facultiesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHFrom>
      </Modal>
    </>
  );
};

export default Courses;
