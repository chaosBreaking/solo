import React from 'react';
import { MobXProviderContext } from 'mobx-react';

const useStores = () => React.useContext<any>(MobXProviderContext);

export default useStores;
