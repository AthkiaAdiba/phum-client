import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  // console.log(courses);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const toastId = toast.loading("Creating...");

    const coursesData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(coursesData);

    try {
      const res = (await createCourse(coursesData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrom onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Course Title:" />
          <PHInput type="text" name="prefix" label="Prefix:" />
          <PHInput type="text" name="code" label="Code:" />
          <PHInput type="text" name="credits" label="Credits:" />
          <PHSelect
            mode="multiple"
            name="preRequisiteCourses"
            label="PreRequisiteCourses:"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Add Academic Semester</Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
