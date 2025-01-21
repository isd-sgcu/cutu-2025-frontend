import React from 'react';

import { Row } from './row';
import { Col } from './col';
import Role from './role';
import Action from './action';

export interface UserRowProps {
  UID: string;
  name: string;
  role: 'admin' | 'staff';
}

export default function UserRow({ UID, name, role }: UserRowProps) {
  return (
    <Row className="border-y border-mid-gray">
      <Col>{UID}</Col>
      <Col className="text-center">{name}</Col>
      <Col className="px-2">
        <Role role={role} />
      </Col>
      <Col>
        <Action />
      </Col>
    </Row>
  );
}
