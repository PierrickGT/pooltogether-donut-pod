import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SpinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Spinner: React.FC = () => <Spin indicator={SpinnerIcon} />;

export default Spinner;
