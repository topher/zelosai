// components/atomic/molecules/AssetTypeNav.tsx

import { connectMenu } from 'react-instantsearch-dom';
import ConnectedNav from './ConnectedNav';

const AssetTypeNav = connectMenu(ConnectedNav);

export default AssetTypeNav;
