import { Button, Row } from "antd";
import PHFrom from "../components/form/PHFrom";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userMangement.api";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TResponse } from "../types";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const disPatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;

    if (res?.data?.success) {
      disPatch(logOut());
      navigate("/login");
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHFrom onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password:" />
        <PHInput type="text" name="newPassword" label="New Password:" />
        <Button htmlType="submit">Change Password</Button>
      </PHFrom>
    </Row>
  );
};

export default ChangePassword;
