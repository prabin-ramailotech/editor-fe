import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CustomModal from './modal';
import ShiroLogo from '../assets/ShiroLogo.png';
import Cookies from 'js-cookie';

const { Content, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  url: string;
}

type sidebarProps = {
  children?: React.ReactNode;
  labels: {
    label: string[];
    icons: React.ReactElement[];
    path: string[];
  };
};

const Sidebar = ({ children, labels }: sidebarProps) => {
  const [open, setOpen] = useState(false);
  const currentRoute = window.location.pathname;
  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
  };

  const items: MenuItem[] = labels.icons.map((icon, index) => ({
    key: labels.path[index],
    icon: labels.icons[index],
    label: labels.label[index],
    url: labels.path[index],
    icons: icon,
  }));

  const handleLogout = () => {
    Cookies.remove('go_rules_token');
    navigate('/login');
  };

  return (
    <>
      {['/', '/documents'].includes(currentRoute) && (
        <>
          <Layout hasSider className="mt-0.5 relative flex">
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              className="flex flex-col justify-between"
              style={{
                height: '100vh',
                top: '0',
                bottom: '0',
                position: 'sticky',
                zIndex: '5',
                background: '#F7FAFC',
                minWidth: '240px',
              }}
            >
              <h1 className="text-[#5D5FEF] items-center flex justify-center gap-3 py-3 px-4 cursor-pointer text-2xl">
                <img src={ShiroLogo} alt="" width={150} />
              </h1>
              <p className="text-[#9e9494] ml-3 mb-2">General</p>
              <div className="demo-logo-vertical h-[80vh] flex flex-col justify-between">
                <Menu mode="inline" className="bg-[#F7FAFC]" defaultSelectedKeys={[currentRoute]}>
                  {items.map((item) => (
                    <Menu.Item key={item.url} icon={item.icon}>
                      <Link to={item.url}>{item.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu>
                <div className="items-center h-[10vh] gap-2 px-3 py-2 rounded-3xl">
                  <div className="items-stretch flex hover:bg-slate-200 justify-between gap-3 px-5 py-3 rounded-xl">
                    <div
                      className="text-[#9e9494] cursor-pointer text-base leading-4 tracking-tight self-center grow whitespace-nowrap my-auto"
                      onClick={() => setOpen(true)}
                    >
                      Log out
                    </div>
                  </div>
                </div>
              </div>
            </Sider>
            <Layout>
              <Content className="lg:relative absolute  top-0 left-0 w-full">{children}</Content>
            </Layout>
          </Layout>
          <CustomModal title="Logout" open={open} onOk={handleLogout} onCancel={handleCancel}>
            <div className="flex flex-col justify-center">
              <p>Are you sure you want to logout ?</p>
            </div>
          </CustomModal>
        </>
      )}
    </>
  );
};

export default Sidebar;
