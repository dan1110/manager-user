import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getListUserApi, searchUserApi } from "../../api/userApi";
import TableUser from "../../components/users/Table";
import "./styles/index.scss";

const Users = () => {
  const [searchForm, setSearchForm] = useState({
    role: "Admin",
  });
  const [userList, setUserList] = useState([]);
  const [isReload, setIsReload] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    totalElements: 0,
  });

  useEffect(() => {
    getUserList(pagination.pageIndex);
  }, [isReload]);

  const getUserList = async (pageIndex) => {
    try {
      const res = await getListUserApi(pageIndex);
      setUserList(res.data.items);
      setPagination({
        pageIndex: pageIndex,
        totalElements: res.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchUserList = async (item) => {
    try {
      const res = await searchUserApi(item);
      setUserList(res.data.items);
      setPagination({
        pageIndex: 1,
        totalElements: res.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };

  const onClear = () => {
    setIsReload(!isReload);
    setSearchForm({ role: "Admin" });
  };

  const onSubmit = () => {
    searchUserList({
      idUserName: searchForm?.idUserName,
      userName: searchForm?.userName,
      role: searchForm?.role,
      page: 1,
      limit: 10,
    });
  };

  const onChangePage = (value) => {
    getUserList(value);
  };

  const onReload = () => {
    setIsReload(!isReload);
  };

  return (
    <div>
      <Container>
        <div className="search-information py-4">
          <form autoComplete="off">
            <Row>
              <Col>
                <div className="d-flex">
                  <Form.Label htmlFor="idUser" className="w-30 mr-2">
                    ID
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="idUser"
                    name="idUserName"
                    onChange={(e) => handleChange(e)}
                    value={searchForm?.idUserName || ""}
                  />
                </div>
                <div className="mt-3 d-flex">
                  <Form.Label htmlFor="userName" className="w-30 mr-2">
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="userName"
                    name="userName"
                    onChange={(e) => handleChange(e)}
                    value={searchForm?.userName || ""}
                  />
                </div>
              </Col>
              <Col className="d-flex flex-column w-100 justify-content-start">
                <Form.Group className="d-flex align-items-center w-100">
                  <Form.Label className="mr-2 mb-0 w-30">Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    onChange={(e) => handleChange(e)}
                    value={searchForm.role}
                  >
                    <option value=""></option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-end">
                <div className="d-flex h-25 align-items-end w-100">
                  <Button className="btn-blue w-25" onClick={() => onSubmit()}>
                    Search
                  </Button>
                  <Button
                    className="btn-clear ml-2 w-25"
                    onClick={() => onClear()}
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </div>
        <TableUser
          userList={userList}
          reload={() => onReload()}
          onChangePage={onChangePage}
          totalElements={pagination.totalElements}
          pageIndex={pagination.pageIndex}
          onClearFormSearch={onClear}
        />
      </Container>
    </div>
  );
};

export default Users;
