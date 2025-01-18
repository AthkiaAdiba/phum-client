import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userMangement.api";
import Password from "antd/es/input/Password";

const studentDumyData = {
  password: "student1",
  student: {
    name: {
      firstName: "Mr. Student2",
      secondName: "",
      lastName: "good",
    },
    gender: "male",
    bloodGroup: "O+",

    email: "student2@gmail.com",
    contactNo: "+123",
    emergencyContactNo: "+0987654321",
    presentAddress: "123 Main Street, Cityville",
    permanentAddress: "456 Elm Street, Townsville",

    guardian: {
      fatherName: "Richard Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "+1122334455",
      motherName: "Emily Doe",
      motherOccupation: "Teacher",
      motherContactNo: "+5566778899",
    },

    localGuardian: {
      name: "Michael Smith",
      occupation: "Lawyer",
      contactNo: "+1029384756",
      address: "789 Pine Street, Metropolis",
    },

    academicSemester: "6776afb9c69ae47a94da83b6",
    academicDepartment: "6776a62fd9684a571f4210a3",
  },
};

// This is for development
const defaultStudentDumyData = {
  name: {
    firstName: "Mr. Student2",
    secondName: "mina",
    lastName: "good",
  },
  gender: "male",
  bloodGroup: "O+",

  email: "student90@gmail.com",
  contactNo: "+123",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Elm Street, Townsville",

  guardian: {
    fatherName: "Richard Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+1122334455",
    motherName: "Emily Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+5566778899",
  },

  localGuardian: {
    name: "Michael Smith",
    occupation: "Lawyer",
    contactNo: "+1029384756",
    address: "789 Pine Street, Metropolis",
  },

  // academicSemester: "6776afb9c69ae47a94da83b6",
  // academicDepartment: "6776a62fd9684a571f4210a3",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsLoading });

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} (${item.year})`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const studentData = {
      Password: "student1",
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);
    addStudent(formData);

    // This is for development
    // Just for checking
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHFrom onSubmit={onSubmit} defaultValues={defaultStudentDumyData}>
          <Divider>Personal Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.secondName"
                label="Second Name:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image:">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address:"
              />
            </Col>
          </Row>
          <Divider>Guardian Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo:"
              />
            </Col>
          </Row>
          <Divider>Local Guardian Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian Name:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian Occupation:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Local Guardian ContactNo:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian Address:"
              />
            </Col>
          </Row>
          <Divider>Academic Info:</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Semester:"
                disabled={sIsLoading}
                name="academicSemester"
                options={semesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department:"
                options={departmentOptions}
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHFrom>
      </Col>
    </Row>
  );
};

export default CreateStudent;
