import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const MenuItem = ({
  content,
  icon,
  to,
}: {
  content?: string;
  icon?: string;
  to: string;
}) => <Menu.Item content={content} as={Link} to={to} icon={icon} />;

export const NavBarContainer = () => {
  return (
    <Menu size='large' className={'nav'}>
      <MenuItem to='/' icon='home' />
    </Menu>
  );
};
