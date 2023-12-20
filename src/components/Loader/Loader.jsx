import { Blocks } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass={css.LoaderCss}
    />
  );
};
