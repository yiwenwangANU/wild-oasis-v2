import styled from "styled-components";
import useDeleteCabin from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import useDuplicateCabin from "./useDuplicateCabin";
import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//   background-color: var(--color-grey-0);
//   border-bottom: 1px solid var(--color-grey-100);
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const parsePrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

const parseDiscount = (discount) => {
  if (+discount > 0) {
    return parsePrice(discount);
  } else return "--";
};
function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    image,
    discount,
    maxCapacity,
    regularPrice,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();
  return (
    <Modal>
      <Table.TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{parsePrice(regularPrice)}</Price>
        <Discount>{parseDiscount(discount)}</Discount>

        <Menus>
          <Menus.Open name={cabinId}>
            <HiDotsVertical />
          </Menus.Open>
          <Menus.List name={cabinId}>
            <div onClick={() => duplicateCabin(cabin)}>
              <Menus.Item>
                <HiSquare2Stack /> Duplicate
              </Menus.Item>
            </div>

            <Modal.Open name="editCabin">
              <Menus.Item>
                <HiPencil /> <div>Edit</div>
              </Menus.Item>
            </Modal.Open>

            <Modal.Open name="deleteCabin">
              <Menus.Item>
                <HiTrash /> Delete
              </Menus.Item>
            </Modal.Open>
          </Menus.List>
        </Menus>
      </Table.TableRow>

      <Modal.Window name="editCabin">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
      <Modal.Window name="deleteCabin">
        <ConfirmDelete
          resourceName={name}
          onConfirm={() => deleteCabin(cabinId)}
          disabled={isDeleting || isDuplicating}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CabinRow;
