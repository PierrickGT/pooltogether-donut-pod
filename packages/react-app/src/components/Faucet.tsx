import React from 'react';
// import { SendOutlined } from '@ant-design/icons';
// import { Button, Input, Tooltip } from 'antd';
// import { ethers } from 'ethers';
// import Blockies from 'react-blockies';

// import { Transactor } from '../helpers';

export default function Faucet() {
    // const [address, setAddress] = useState();

    // let blockie;
    // if (address && typeof address.toLowerCase == 'function') {
    //     blockie = <Blockies seed={address.toLowerCase()} size={8} scale={3} />;
    // } else {
    //     blockie = <div></div>;
    // }

    // const localTx = Transactor(props.localProvider);

    return (
        <span>
            {/* <Input
                size="large"
                placeholder="local faucet"
                prefix={blockie}
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
                suffix={
                    <Tooltip title="Faucet: Send local ether to and address.">
                        <Button
                            onClick={() => {
                                localTx({
                                    to: address,
                                    value: ethers.utils.parseEther('0.01'),
                                });
                                setAddress('');
                            }}
                            shape="circle"
                            icon={<SendOutlined />}
                        />
                    </Tooltip>
                }
            /> */}
        </span>
    );
}
