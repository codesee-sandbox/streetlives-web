import React from 'react';
import cx from 'classnames';

import Icon from '../../icon';
import './Option.css';

function Option({
  active,
  align = 'left',
  children,
  onClick,
  disabled,
  round,
  disablePadding,
  disableCheckmark,
  hide,
}) {
  const classNames = cx('Option d-flex justify-content-between align-items-center', {
    'Option-active': active,
    'Option-disabled': disabled,
    'Option-hide': hide,
    'Option-round': round,
    'text-left': align === 'left',
    'text-center': align === 'center',
    'disable-padding': disablePadding,
  });

  return (
    <button className={classNames} onClick={!disabled ? onClick : () => {}} disabled={disabled}>
      <div className="w-100">{children}</div>
      {active && !disableCheckmark && <Icon name="check" />}
    </button>
  );
}

export default Option;
