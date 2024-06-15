import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import colors from 'styles/colors';

function Loader({ type = 'page' }: { type?: 'page' | 'component' }) {
  return (
    <div
      className={`${
        type === 'page' ? 'fixed' : 'absolute'
      }  top-0 left-0 right-0 bottom-0 z-[999] bg-secondary dark:bg-black flex items-center justify-center`}
    >
      <InfinitySpin width="300" color={colors.primary} />
    </div>
  );
}

export default Loader;
