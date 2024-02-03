import React, { useState } from 'react';
import { getLatLongfromCity } from './Api';
import { Row, Col, Input, Button, Spin } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import TableData from './TableData';

function App() {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getForecastWeather = async () => {
    setLoader(true);
    const coordinatesInfo = await getLatLongfromCity(city);
    setForecastData(coordinatesInfo);
    setLoader(false);
  };

  return (
    <>
      <Row
        gutter={16}
        justify="start"
        align="middle"
        style={{ margin: '20px' }}
      >
        <Col className='pb-3' xs={24} sm={12} md={6} lg={6}>
          <div
            style={{
              color: '#e96e50',
              fontSize: '24px',
              fontWeight: '500'
            }}
          >
            Weather in your city
          </div>
        </Col>
        <Col className='pb-3' xs={24} sm={12} md={4} lg={4}>
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            style={{
              border: '2px solid #e96e50'
            }}
          />
        </Col>
        <Col className='pb-3' xs={24} sm={12} md={4} lg={4}>
          <Button
            type="primary"
            onClick={getForecastWeather}
            disabled={city ? false : true}
            style={{
              background: '#e96e50',
              color: '#ffffff',
              fontWeight: '600',
              marginRight: '10px'
            }}
          >
            <QuestionCircleOutlined /> Search
          </Button>

          <Spin className='ml-4' spinning={loader} size="large" />
        </Col>
      </Row>
      {forecastData.length > 0 && (
        <div>
            {
              forecastData.map((tableData, index) => ( 
                <TableData key={index} data={[tableData]} />
              ))
            }
        </div>
      )}
    </>
  );
}

export default App;
