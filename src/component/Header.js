import { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Button } from 'antd';
const { Header } = Layout;

function HeaderTop() {
    const [employees, SetEmployees] = useState([]);
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
   
    const menu = (
        <Menu>
            <Menu.Item>
                <p rel="noopener noreferrer">
                    Select colums
                </p>
            </Menu.Item>
            <Menu.Item>
                <p rel="noopener noreferrer">
                    Dowload Employees
                </p>
            </Menu.Item>
            <Menu.Item>
                <p rel="noopener noreferrer">
                   Import Employees
                </p>
            </Menu.Item>
            <Menu.Item>
                <p rel="noopener noreferrer">
                   Delete Employees
                </p>
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Layout className="layout">
                <Header>
                    <div className="logo-header">
                        <div className="right"><i className="fas fa-bars"> PENSKE</i></div>
                        <div className="center">
                            <span>NORTH STAR MOTORS <i className="fas fa-chevron-circle-down"></i></span>
                        </div>
                        <div className="right">
                            <span>JV</span>  Jean Vajean
                        </div>
                    </div>
                </Header>
                <div className="breanbrum" style={{ padding: '0 50px' }} >
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Employees</Breadcrumb.Item>
                        <Breadcrumb.Item>{employees.length} employees</Breadcrumb.Item>
                    </Breadcrumb>
                    <Dropdown className="filter-button" overlay={menu} placement="bottomCenter" arrow>
                        <Button ><i className="fas fa-filter"></i></Button>
                        
                    </Dropdown>
                    <Button className="ellipsis-button" ><i class="fas fa-ellipsis-v"></i></Button>
                </div>
            </Layout>
        </>
    )
}
export default HeaderTop;