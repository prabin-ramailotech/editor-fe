import { useEffect, useState } from 'react';
import Button from '../components/button';
import CustomModal from '../components/modal';
import Sidebar from '../components/sidebar';
import { Divider, Input, message } from 'antd';
import { FolderCopy } from '@mui/icons-material';
import JsonIcon from '../assets/jsonIcon.webp';
import api from '../composables/api';

const Documents = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [rulesData, setRulesData]: any = useState();
  const labels = {
    label: ['Documents '],
    icons: [<FolderCopy />],
    path: ['/documents'],
  };

  const GOBASEURL = import.meta.env.VITE_GORULES_BASEURL;

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    if (userName === '') {
      setError('Name is required !');
    } else {
      const formData = new FormData();
      formData.append('name', userName);
      formData.append('project', '5cf61762a62848b8bb923323a821184e');
      const emptyFile = new Blob([JSON.stringify({})], {
        type: 'application/json',
      });
      formData.append('rules', emptyFile, `${userName}.json`);
      try {
        const response = await api.post(`${GOBASEURL}/v1/create/rules/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success(response?.data?.status_message);
        setUserName('');
        setOpen(false);
        getAllRules();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAllRules = async () => {
    try {
      const response = await api.get(`${GOBASEURL}/v1/rules/`);
      setRulesData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllRules();
  }, []);

  return (
    <>
      <Sidebar labels={labels}>
        <div className="md:p-8 p-5">
          <h1 className="text-2xl ">Documents</h1>
          <div className=" w-full mt-5">
            <div className=" bg-white shadow-md px-4 py-2 rounded-md">
              <Button text="+ New" onClick={() => setOpen(true)} />
            </div>
          </div>
          <div className=" flex flex-col mt-5">
            <p className="text-lg text-[#9e9494]">Files</p>
            <div className=" grid lg:grid-cols-4 gap-2 md:grid-cols-2 mt-2 grid-cols-1">
              {rulesData?.data?.data.map((item: any, index: number) => (
                <div className="flex flex-col gap-5 border border-[#9e9494] p-3 rounded-xl bg-white" key={index}>
                  <div className="flex gap-3">
                    <img src={JsonIcon} alt="" width={40} />
                    <div className="flex flex-col">
                      <p>{item?.name}.json</p>
                      <p className="text-[#9e9494]">Decision</p>
                    </div>
                  </div>
                  <div className=" flex justify-between">
                    <p className=" text-[#9e9494]">{item?.updated_at}</p>
                    <div className=" border border-[#9e9494] px-3 py-1 rounded-lg">Edit</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sidebar>
      <CustomModal
        title="Create decision graph"
        open={open}
        okText="Create"
        onOk={handleCreate}
        onCancel={handleCancel}
      >
        <Divider />
        <div className="flex flex-col justify-center">
          <p>Name</p>
          <Input
            addonAfter=".json"
            onChange={(e) => {
              setUserName(e.target.value);
              setError('');
            }}
          />
          <p className=" text-red-500">{error}</p>
        </div>
        <Divider />
      </CustomModal>
    </>
  );
};

export default Documents;
