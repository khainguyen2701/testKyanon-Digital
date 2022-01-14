import React from 'react'
import { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Row, Col, Drawer, Card, Input,Form } from 'antd';
import ChartName from './ChartName'
import Inspections from './Inspections'
const { Header } = Layout;




const Details = ({ player, visible, onClose, position, image, employeeID,email,department }) => {
    const [details, setDetails] = useState([])

    const date = new Date();
    const showDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

    useEffect(() => {
        async function fetchEmployees() {
            const request = 'https://303279eb-9283-4ddc-a5e6-bfd69a63b58c.mock.pstmn.io//v1/data';
            const response = await fetch(request);
            const responseJSON = await response.json();
            const { data } = responseJSON;
            setDetails(data);
        }

        fetchEmployees();
        return () => {
            console.log('EFFECT CLEANUP');
        }
    }, [])

    return (
        <>
            <Drawer id="drawerID"
                destroyOnClose
                title={player}
                postition={position}
                image={image}
                employeeID={employeeID}
                department={department}
                email={email}
                visible={visible}
                width={1500}
                onClose={onClose}>
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
                            <Breadcrumb.Item>{player}</Breadcrumb.Item>
                        </Breadcrumb>

                    </div>
                </Layout>
                <Row>

                    <Col span={12} push={0} className="chart-left">
                        <div className="site-card-border-less-wrapper">
                            <Card title={player} bordered={false} >
                                <div className="infor-name">
                                    <div className="avata-name">
                                        <p>Employees Image</p>
                                        <img src={image} alt="" className="avata-name" />
                                    </div>
                                    <ChartName />
                                </div>
                                <div className="inspections">
                                    <div className="total">
                                        <p>Total Inspections</p>
                                        {Math.round(Math.random() * 100)}
                                    </div>
                                    <div className="issues">
                                        <p>Open Issues</p>
                                        {Math.round(Math.random() * 10)}
                                    </div>
                                    <div className="last-login">
                                        <p>Last Login</p>
                                        {showDate}
                                    </div>
                                    <div className="sites">
                                        <p>Sites</p>
                                        <p>5</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </Col>
                    <Col span={12} pull={0} >
                        <div className="site-card-border-less-wrapper">
                            <Card title="Details" bordered={false}>
                                <Row>
                                    <Col span={8} pull={0}>
                                        <Form name="control-hooks" layout="vertical">
                                            <Form.Item label=" ">
                                                <Input value={player}/>
                                            </Form.Item>
                                            <Form.Item label=" ">
                                                <Input value={player}/>
                                            </Form.Item>
                                           </Form>
                                    </Col>
                                    
                                    <Col span={8} pull={0}>
                                    <Form name="control-hooks"layout="vertical" >
                                            <Form.Item label=" ">
                                                <Input value={email}/>
                                            </Form.Item>
                                            <Form.Item label=" ">
                                                <Input value={employeeID}/>
                                            </Form.Item>
                                           </Form>
                                    </Col>
                                    <Col span={8} pull={0}>
                                    <Form name="control-hooks"layout="vertical" >
                                            <Form.Item label="Department">
                                                <Input value={department}/>
                                            </Form.Item>
                                            <Form.Item label="Position">
                                                <Input value={position}/>
                                            </Form.Item>
                                           </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </div>



                        <div className="site-card-border-less-wrapper">
                            <Card title="Credentials" bordered={false}>
                                <Row>
                                    <Col span={8} pull={0}>
                                        <Form name="control-hooks" layout="vertical">
                                            <Form.Item label="Username">
                                                <Input value={email}/>
                                            </Form.Item>
                                            <Form.Item label="Password">
                                                <Input type="password"value={player}/>
                                            </Form.Item>
                                           </Form>
                                    </Col>
                                    
                                    <Col span={8} pull={0}>
                                    <Form name="control-hooks"layout="vertical" >
                                            <Form.Item label="Role">
                                                <Input value="Demo user"/>
                                            </Form.Item>
                                            <Form.Item label="Site Access">
                                                <Input value="Five Access"/>
                                            </Form.Item>
                                           </Form>
                                    </Col>
                                    <Col span={8} pull={0}>
                                    <Form name="control-hooks"layout="vertical" >
                                            <Form.Item label="Employee ID">
                                                <Input value={employeeID}/>
                                            </Form.Item>
                                            <Form.Item label="Pin">
                                                <Input type="password"value={player}/>
                                            </Form.Item>
                                           </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>


                </Row>
                <Inspections />

            </Drawer>

        </>
    )
}
export default Details;