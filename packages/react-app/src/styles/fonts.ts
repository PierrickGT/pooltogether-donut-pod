import { rem } from 'polished';
import { css } from 'styled-components';

export const family = {
    montserrat: 'Montserrat',
};

export const lineHeight = {
    base: css`
        ${rem(24)}
    `,
};

export const size = {
    h4: css`
        ${rem(17)}
    `,
    h5: css`
        ${rem(15)}
    `,
    small: css`
        ${rem(14)}
    `,
    large: css`
        ${rem(24)}
    `,
};

export const weight = {
    title: 500,
};
