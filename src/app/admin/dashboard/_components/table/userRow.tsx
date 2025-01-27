import React from 'react';

import { Row } from './row';
import { Col } from './col';
import Role from './role';
import Action from './action';
import { User } from '@/schema/user';

export default function UserRow({ user }: { user: User }) {
  return (
    <Row className="border-y border-mid-gray">
      <Col className="overflow-hidden truncate text-ellipsis px-4">
        #{user.uid}
      </Col>
      <Col className="text-center">{user.name}</Col>
      <Col className="px-2">
        <Role role={user.role} />
      </Col>
      <Col>
        <Action id={user.id} />
      </Col>
    </Row>
  );
}
