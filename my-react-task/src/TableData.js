import React from "react";
import { Col, Row } from "antd";
import './App.css';


const WeatherTable = ({ data }) => {
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  

  const dataSource = data.map((record) => ({
    key: record.dt,
    date: record.dt_txt,
    temp_min: record.main.temp_min,
    temp_max: record.main.temp_max,
    pressure: record.main.pressure,
    humidity: record.main.humidity,
  }));

  return (
    <Row className="rowContent mr-4 ml-4">
      {dataSource.map((item, index) => (
        <Col span={24}>
          <Row>
            <Col
              span={24}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
                backgroundColor: "#ff6600",
              }}        
            >
              <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
                backgroundColor: "#cccccc",
              }}
            >
              <strong>Temprature</strong>
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
                backgroundColor: "#cccccc",
              }}
            >
              <strong>Min</strong>
            </Col>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
                backgroundColor: "#cccccc",
              }}
            >
              <strong>Max</strong>
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
                backgroundColor: "#cccccc",
              }}
            >
              {kelvinToCelsius(item.temp_min)} °C
            </Col>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
                backgroundColor: "#cccccc",
              }}
            >
              {kelvinToCelsius(item.temp_max)} °C
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
              }}
            >
              <strong>Pressure</strong>
            </Col>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
              }}
            >   
              {item.pressure} hPa
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
              }}
            >
              <strong>Humidity</strong>
            </Col>
            <Col
              span={12}
              align="center"
              style={{
                border: "1px solid black",
                padding: "7px",
              }}
            >
              {item.humidity} %
            </Col>
          </Row>
        </Col>
      ))}
      
    </Row>
  );
};

export default WeatherTable;