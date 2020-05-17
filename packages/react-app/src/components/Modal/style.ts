import { rem } from 'polished';
import styled from 'styled-components';

import { grey } from 'styles/colors';
import { lineHeight, size as fontSize, weight as fontWeight } from 'styles/fonts';
import { mediaMax, spacingUnit } from 'styles/variables';

const closeButtonSizeDesktop = rem(40);
const closeButtonSizeMobile = rem(32);

export const ModalHeader = styled.div`
    border-bottom: 2px solid ${grey[3]};
    padding: ${rem(12)} 0;
    text-align: center;

    @media (max-width: ${mediaMax.sm}) {
        padding: ${spacingUnit()} ${spacingUnit(8)} ${spacingUnit()} ${spacingUnit(2)};
        text-align: left;
    }
`;

export const ModalTitle = styled.h4`
    font-size: ${fontSize.h4};
    font-weight: ${fontWeight.title};
    line-height: ${lineHeight.base};
    margin: 0;
`;

export const ModalContent = styled.div`
    font-size: ${fontSize.h5};
    line-height: ${lineHeight.base};
    padding: ${spacingUnit(5)} ${rem(84)} ${spacingUnit(4)};
    text-align: center;

    @media (max-width: ${mediaMax.sm}) {
        padding: ${spacingUnit(5)} ${spacingUnit(2)} ${spacingUnit(2)};
    }
`;

export const CloseButton = styled.button`
    background-color: ${grey[4]};
    border-radius: 100%;
    border: 0;
    color: ${grey[8]};
    cursor: pointer;
    height: ${closeButtonSizeDesktop};
    line-height: ${closeButtonSizeDesktop};
    padding: 0;
    position: fixed;
    right: ${spacingUnit(5)};
    top: ${spacingUnit(3)};
    width: ${closeButtonSizeDesktop};

    @media (max-width: ${mediaMax.sm}) {
        background-color: ${grey[2]};
        color: #fff;
        height: ${closeButtonSizeMobile};
        line-height: ${closeButtonSizeMobile};
        right: spacingUnit();
        top: spacingUnit();
        width: ${closeButtonSizeMobile};
    }
`;
