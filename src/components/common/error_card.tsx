import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { themeDimensions } from '../../theme/commons';

import { MetamaskSideIcon } from './icons/metamask_side_icon';
import { SadIcon } from './icons/sad_icon';
import { WalletIcon } from './icons/wallet_icon';
import { WarningIcon } from './icons/warning_icon';
import { LockedIcon } from './icons/locked_icon';
import { AccountOutlineIcon } from './icons/account_outline';

interface Props extends HTMLAttributes<HTMLDivElement>, ErrorProps {
    text: string;
}

interface ErrorProps {
    fontSize?: FontSize;
    icon?: ErrorIcons;
    textAlign?: string;
}

export enum ErrorIcons {
    Lock = 1,
    Sad = 2,
    Metamask = 3,
    Warning = 4,
    Wallet = 5,
}

export enum FontSize {
    Large = 1,
    Medium = 2,
}

const ErrorCardContainer = styled.div<ErrorProps>`
    align-items: center;
    background-color: ${props => props.theme.componentsTheme.errorCardBackground};
    border-radius: ${themeDimensions.borderRadius};
    border: 1px solid ${props => props.theme.componentsTheme.errorCardBorder};
    color: ${props => props.theme.componentsTheme.errorCardText};
    display: flex;
    font-size: ${props => (props.fontSize === FontSize.Large ? '16px' : '14px')};
    line-height: 1.2;
    padding: 10px 15px;
    ${props => (props.textAlign === 'center' ? 'justify-content: center;' : '')}
`;

const IconContainer = styled.span`
    margin-right: 10px;
`;

const getIcon = (icon: ErrorIcons) => {
    let theIcon: any;

    if (icon === ErrorIcons.Lock) {
        theIcon = <LockedIcon  />;
    }
    if (icon === ErrorIcons.Metamask) {
        theIcon = <MetamaskSideIcon />;
    }
    if (icon === ErrorIcons.Sad) {
        theIcon = <SadIcon />;
    }
    if (icon === ErrorIcons.Warning) {
        theIcon = <WarningIcon />;
    }
    if (icon === ErrorIcons.Wallet) {
        theIcon = <WalletIcon />;
    }

    return <IconContainer>{theIcon}</IconContainer>;
};

export const ErrorCard: React.FC<Props> = props => {
    const { text, icon, ...restProps } = props;
    const errorIcon = icon ? getIcon(icon) : null;

    return (
        <ErrorCardContainer {...restProps}>
            {errorIcon}
            {text}
            <AccountOutlineIcon/>
        </ErrorCardContainer>
    );
};
