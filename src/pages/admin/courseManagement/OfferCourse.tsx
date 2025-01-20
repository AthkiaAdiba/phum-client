import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourse = () => {
  const [id, setId] = useState("");
  console.log("Inside Parent Component", id);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);
  console.log(academicFacultyData);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrom onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Faculty Name:"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHInput disabled={!id} type="text" name="test" label="Test:" />
          <Button htmlType="submit">Submit</Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
