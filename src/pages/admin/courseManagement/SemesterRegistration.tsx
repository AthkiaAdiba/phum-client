import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  // console.log(academicSemester);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterRegistrationData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterRegistrationData);

    try {
      // console.log(semesterData);
      const res = (await addSemesterRegistration(
        semesterRegistrationData
      )) as TResponse<any>;
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
          <PHSelect
            label="Academic Semester Name:"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status:"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker label="Start Date:" name="startDate" />
          <PHDatePicker label="End Date:" name="endDate" />
          <PHInput type="text" name="minCredit" label="Min Credit:" />
          <PHInput type="text" name="maxCredit" label="Max Credit:" />
          <Button htmlType="submit">Add Academic Semester</Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
