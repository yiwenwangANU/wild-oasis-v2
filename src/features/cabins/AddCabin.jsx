import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
function AddCabin() {
  return (
    <Modal>
      <Modal.Open name="newCabin" line={false}>
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="newCabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
