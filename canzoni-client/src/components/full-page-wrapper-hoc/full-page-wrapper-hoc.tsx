import classes from './full-page-wrapper-hoc.module.css';
import React from 'react';
import {Col, Row} from 'react-materialize';

const FullPageWrapperHoc: React.FC = ({children}) => {
  return (
    <div className={classes.pageWrapper}>
      <Row>
        <Col
          offset={'m2'}
          s={12}
          m={8}
        >
          {children}
        </Col>
      </Row>
    </div>
  );
};

export {FullPageWrapperHoc};
