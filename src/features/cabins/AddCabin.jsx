import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
function AddCabin() {
  return (
    <Modal>
      <Modal.Open name="newCabin">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="newCabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
  //   const [showModal, setShowModal] = useState(false);

  //   function handleShowModal() {
  //     setShowModal(true);
  //   }

  //   function handleCloseModal() {
  //     setShowModal(false);
  //   }
  //   return (
  //     <>
  //       <div>
  //         <Button onClick={() => handleShowModal()}>Add New Cabin</Button>
  //       </div>

  //       {showModal && (
  //         <Modal handleCloseModal={handleCloseModal}>
  //           <CreateCabinForm handleCloseModal={handleCloseModal} />
  //         </Modal>
  //       )}
  //     </>
  //   );
}

export default AddCabin;
