import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  picString: string;
}

const ProfilePic = (props: IProps) => {
  const { picString } = props;

  return (
    <div className={style.profile_pic_container}>
      <img src={picString} alt="" />
    </div>
  );
};

export default ProfilePic;
