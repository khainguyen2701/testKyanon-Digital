import { useState, useEffect } from 'react';
import { Table, Modal, Button, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Details from './Details'
const { Column } = Table;
const { Option } = Select



function EmployeesList() {
    const [employees, SetEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [stateValue,setStateValue] = useState('')
    const [position,setPosition] = useState('')
    const [employeeID,setEmployeesID] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [department,setDepartment] = useState('')
    const [bool,setBool] = useState(false)
    const [value, setValue] = useState('');
    const [valueID, setValueID] = useState('');

    //Connect mock API 
    useEffect(() => {
        async function fetchEmployees() {
            const request = 'https://303279eb-9283-4ddc-a5e6-bfd69a63b58c.mock.pstmn.io//v1/data';
            const response = await fetch(request);
            const responseJSON = await response.json();
            const { data } = responseJSON;
            SetEmployees(data);
        }
        fetchEmployees();
    }, [])

    const columns = [
        {
            title: 'Avata',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => {
                return (
                    <div>
                        <img src={record.image} width={30} />
                    </div>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {
                    text: 'Jerry',
                    value: 'Jerry',
                },
                {
                    text: 'Cosmo',
                    value: 'Cosmo',
                },
                {
                    text: 'George',
                    value: 'George',
                },
                {
                    text: 'Susan',
                    value: 'Susan',
                },
                {
                    text: 'Ruthie',
                    value: 'Ruthie',
                },

            ],
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Employees ID',
            dataIndex: 'employeeID',
            key: 'employeeID',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.employeeID - b.employeeID,
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return <>
                    <DeleteOutlined onClick={() => { handleDelete(record) }} />
                    <Button onClick={()=>onSelect(record)}>Frofile</Button>
                </>
            }
        },
    ];
    //Action delete
    const handleDelete = (record) => {
        
        Modal.confirm({
            title: 'Are you sure you want to delete',
            onOk: () => {
                SetEmployees(pre => {
                    return pre.filter(item => item.id !== record.id)
                })
            }
        })

    }
    const onSelect = (record) => {
        setStateValue(record.name);
        setPosition(record.position);
        setImage(record.image);
        setEmployeesID(record.employeeID);
        setEmail(record.email);
        setDepartment(record.department);
        setBool(true);
    }
    const onClose = () => setBool(false);
    const handleChangeEmploy = (employeeID) => {
        setValueID(employeeID);
        console.log(employeeID)
        const filteredData = employees.filter(entry =>
          entry.employeeID.includes(employeeID)
        );
        SetEmployees(filteredData);
    }
    const exportReactCSV =(employees)=>{
        console(employees)
    }
    return (
        <>
            <div className="buttonStyle">
                <Button type="dashed" onClick={() => setShow(!show)}>
                    Fill
                </Button>
                <Button type="dashed" onClick={() => exportReactCSV(employees)}>
                    Dowload
                </Button>
               
               
            </div>
            <div className="tableContent">

                <div className="filter">
                    {show && <div>
                        <h3>FILTER</h3>
                <label>Name</label>
                <Input 
                placeholder="Employee Name"
                value={value} 
                onChange={e => {
                    const currValue = e.target.value;
                    setValue(currValue);
                    const filteredData = employees.filter(entry =>
                      entry.name.includes(currValue)
                    );
                    SetEmployees(filteredData);
                  }}
                />
                <label>Employee ID</label>
                <Select className="select-before" style={{width: '100%'}}>
                    {employees.map(item => <Option 
                    key={item.id} 
                    value={item.employeeID}
                    onChange={()=>{handleChangeEmploy(item.employeeID)}}
                    >
                        {item.employeeID}
                        </Option>)}
                </Select>
                <label>Department</label>
                <Select className="select-before"style={{width: '100%'}}>
                    {employees.map(item => <Option key={item.id} value={item.department}>{item.department}</Option>)}
                </Select>
                <label>More</label>
                <Select className="select-before"style={{width: '100%'}}>
                    {employees.map(item => <Option key={item.id} value={item.employeeID}>{item.employeeID}</Option>)}
                </Select>    
                    </div>}
                </div>
                <Table
                    dataSource={employees}
                    columns={columns}
                    pagination={false}
                />

            </div>
            <div className="details">
                <Details 
                    player={stateValue}
                    position={position}
                    employeeID={employeeID}
                    email={email}
                    image={image}
                    department={department}
                    visible={bool}
                    onClose={onClose}
                    
                />
            </div>
        </>
    )
}
export default EmployeesList;