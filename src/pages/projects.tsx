import { FolderOpenOutlined } from '@mui/icons-material';
import Sidebar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const MyProjects = () => {
  const navigate = useNavigate();
  const labels = {
    label: ['My Projects'],
    icons: [<FolderOpenOutlined />],
    path: ['/projects'],
  };

  return (
    <>
      <Sidebar labels={labels}>
        <div className="md:p-8 p-5">
          <h1 className="text-2xl ">My Projects</h1>
          <div className=" w-full mt-5">
            <div className=" bg-white shadow-md px-4 py-2 rounded-md">
              <div className="flex justify-between items-center">
                <div className=" flex flex-col gap-3">
                  <p className="text-blue-500 font-semibold md:ml-0 ml-2">Indus</p>
                  <p className=" text-[#9e9494]">Last Updated May 24 , 2024 1:53 Pm</p>
                </div>
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    navigate('/documents');
                  }}
                >
                  Open
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default MyProjects;
