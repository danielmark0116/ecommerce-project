import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  picString: string;
}

const ProfileThumb = (props: IProps) => {
  const { picString } = props;

  return <img src={picString} className={style.profile_thumb} />;
};

export default ProfileThumb;
