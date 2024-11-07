import styled from 'styled-components';
import colors from '../../common/Colors';

export const FeatureList = styled.ul`
	list-style: none;
	a {
		text-decoration: none;
	}
`;

export const FeatureListItem = styled.li`
	display: flex;
	align-items: center;
	line-height: 2.5;
`;

export const FeatureListItemIcon = styled.img`
	width: 18px;
	height: auto;
	vertical-align: top;
`;

export const FeatureListItemLabel = styled.span`
	font-size: 20px;
	vertical-align: -webkit-baseline-middle;
	color: ${colors.primary};
`;
