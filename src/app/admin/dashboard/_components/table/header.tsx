import React from 'react';
import { Row } from './row';
import { Col } from './col';

export default function Header() {
  return (
    <Row className="border-y border-black">
      <Col>UID</Col>
      <Col>Name</Col>
      <Col>Role</Col>
      <Col>Action</Col>
    </Row>
  );
}
