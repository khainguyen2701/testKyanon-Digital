import { useEffect, useState } from 'react';
import { Table, Card, Button } from 'antd';
const { Column } = Table;
function Inspections() {
    const [inspections, setInspections] = useState([])
    useEffect(() => {
        async function fetchEmployees() {
            const request = 'https://303279eb-9283-4ddc-a5e6-bfd69a63b58c.mock.pstmn.io//v1/data';
            const response = await fetch(request);
            const responseJSON = await response.json();
            const { inspections } = responseJSON;
            setInspections(inspections);
        }
        fetchEmployees();
        return () => {
            console.log('EFFECT CLEANUP');
        }
    }, [])
    const columns = [
        {
            title: '#',
            dataIndex: 'pin',
            key: 'pin',
        },
        {
            title: 'Checklist',
            dataIndex: 'checklist',
            key: 'checklist',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
    ];
    return (
        <div className="inspections">
            <Card title="Employee Inspections" className="inspections-card">
                <Button type="danger" className="btn-inspection">Inspections</Button>
                <Button type="primary" disabled className="btn-issues">Issues</Button>
                <Table
                    dataSource={inspections}
                    columns={columns}
                    pagination={false}
                />
            </Card>
        </div>
    )
}
export default Inspections;