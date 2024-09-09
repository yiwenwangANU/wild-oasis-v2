import { useRef, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUser from "./useUser";
import useUpdateUserData from "./useUpdateUserData";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const formRef = useRef();
  const [fullName, setFullName] = useState(user?.username);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isPending: isUpdatingData } = useUpdateUserData();

  const handleReset = () => {
    setFullName("");
    setAvatar(null);
    formRef.current.reset();
  };

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(
      { username: fullName, avatar },
      { onSuccess: () => handleReset() }
    );
  }

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdatingData}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          type="file"
          disabled={isUpdatingData}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdatingData}
          onClick={() => {
            handleReset();
            setFullName(user?.username);
          }}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingData}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
