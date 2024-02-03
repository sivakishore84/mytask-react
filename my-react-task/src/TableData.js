import React from "react";
import { Table } from "antd";

const TableData = ({ data }) => {
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Temperature",
      children: [
        {
          title: "Min",
          dataIndex: "temp_min",
          key: "temp_min",
          render: (text, record) => (
            <span> {kelvinToCelsius(record.temp_min)} °C </span>
          ),
        },
        {
          title: "Max",
          dataIndex: "temp_max",
          key: "temp_max",
          render: (text, record) => (
            <span> {kelvinToCelsius(record.temp_max)} °C</span>
          ),
        },
      ],
    },
    {
      title: "Pressure",
      dataIndex: "pressure",
      key: "pressure",
      render: (text, record) => <span>{record.pressure} hPa</span>,
    },
    {
      title: "Humidity",
      dataIndex: "humidity",
      key: "humidity",
      render: (text, record) => <span>{record.humidity} %</span>,
    },
  ];

  const dataSource = data.map((record) => ({
    key: record.dt,
    date: record.dt_txt,
    temp_min: record.main.temp_min,
    temp_max: record.main.temp_max,
    pressure: record.main.pressure,
    humidity: record.main.humidity,
  }));

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default TableData;
