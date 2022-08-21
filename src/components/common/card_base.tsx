import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {themeDimensions} from "../../theme/commons";


interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const CardWrapper = styled.div`
    background-color: ${props => props.theme.componentsTheme.cardBackgroundColor};
    border-radius: ${themeDimensions.borderRadius};
    border: 1px solid ${props => props.theme.componentsTheme.cardBorderColor};
    height: 100%;
`;
const CardWrapperMarkets = styled.div`
    background-color: ${props => props.theme.componentsTheme.cardMarketsBodyBackgroundColor};
    border-radius: ${themeDimensions.borderRadius};
    border: 1px solid ${props => props.theme.componentsTheme.cardBorderColor};
    height: 100%;
`;

export const CardBase: React.FC<Props> = props => {
    const { children, ...restProps } = props;

    return <CardWrapper {...restProps}>{children}</CardWrapper>;
};

export const CardBaseMarkets: React.FC<Props> = props => {
    const { children, ...restProps } = props;

    return <CardWrapperMarkets {...restProps}>{children}</CardWrapperMarkets>;
};

