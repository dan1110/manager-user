import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConfirmModal from "../ConfirmModal";
import FormModal from "../FormModal";
import Pagination from "../Pagination";

const TableUser = ({
  userList,
  reload,
  totalElements,
  pageIndex,
  onChangePage,
  onClearFormSearch,
}) => {
  const [modalShow, setModalShow] = useState();
  const [modalDeleteShow, setModalDeleteShow] = useState();
  const [user, setUser] = useState({});

  const handleShowModalEdit = (item) => {
    setModalShow(true);
    setUser(item);
    onClearFormSearch();
  };
  const handleShowModalAdd = () => {
    setModalShow(true);
    setUser({});
    onClearFormSearch();
  };
  const handleHideModal = () => {
    setModalShow(false);
    setUser({});
  };

  const handleShowModalDelete = (item) => {
    setModalDeleteShow(true);
    setUser(item);
  };
  const handleHideModalDelete = () => {
    setModalDeleteShow(false);
    setUser({});
  };

  return (
    <div className="pt-4">
      <div className="table-top mb-4">
        <div className="table-top__btn-add">
          <Button
            className="btn-blue w-100"
            onClick={() => handleShowModalAdd()}
          >
            Add new
          </Button>
        </div>
        <Pagination
          totalElements={totalElements}
          rowsPerPage={10}
          pageIndex={pageIndex || 0}
          onChangePage={onChangePage}
        />
      </div>
      <Table bordered size="sm">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            {userList.length > 0 && <th></th>}
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((userItem, i) => (
              <tr className="text-center" key={`user-item-${i}`}>
                <td>{i + 1}</td>
                <td>{userItem?.idUserName}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => handleShowModalEdit(userItem)}
                >
                  {userItem?.userName}
                </td>
                <td>{userItem?.role}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    variant="danger"
                    className="w-50"
                    onClick={() => handleShowModalDelete(userItem)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No display data.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <FormModal
        show={modalShow}
        user={user}
        userList={userList}
        onHide={handleHideModal}
        reload={reload}
      />
      <ConfirmModal
        show={modalDeleteShow}
        user={user}
        onHide={handleHideModalDelete}
        reload={reload}
      />
    </div>
  );
};

export default TableUser;
