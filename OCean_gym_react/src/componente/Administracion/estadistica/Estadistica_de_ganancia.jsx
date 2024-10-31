import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { GetRegistro_de_Pago } from '../../../services/Incripsion';
import './Estadistica.css';

const EstadisticaDeGanancia = () => {
  const [datos, setDatos] = useState([]);
  const [vista, setVista] = useState("meses");

  // Función para obtener datos
  const obtenerDatos = async () => {
    try {
      const data = await GetRegistro_de_Pago();
      const datosAgregados = {};

      data.forEach(item => {
        const fecha = new Date(item.fecha_pago);
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('es-ES', { month: 'long' });
        const semana = Math.ceil(dia / 7);
        const claveSemana = `${mes}-Semana ${semana}`;
        const claveMes = `${mes}`;
        const claveDia = `${dia} de ${mes}`;

        // Crear clave para la semana
        if (!datosAgregados[claveSemana]) {
          datosAgregados[claveSemana] = {
            categoria: `Semana ${semana} de ${mes}`,
            tipo: 'Semanal',
            total: 0,
            fecha: fecha
          };
        }

        // Crear clave para el mes
        if (!datosAgregados[claveMes]) {
          datosAgregados[claveMes] = {
            categoria: mes,
            tipo: 'Mensual',
            total: 0,
            fecha: fecha
          };
        }

        // Crear clave para el día
        if (!datosAgregados[claveDia]) {
          datosAgregados[claveDia] = {
            categoria: `${dia} de ${mes}`,
            tipo: 'Diario',
            total: 0,
            fecha: fecha
          };
        }

        // Sumar el monto a la semana, al mes y al día correspondiente
        datosAgregados[claveSemana].total += item.monto;
        datosAgregados[claveMes].total += item.monto;
        datosAgregados[claveDia].total += item.monto;
      });

      setDatos(Object.values(datosAgregados).sort((a, b) => a.fecha - b.fecha));
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  // Función para cambiar la vista
  const toggleVista = (nuevaVista) => {
    setVista(nuevaVista);
  };

  // Colores por tipo
  const colors = {
    'Mensual': '#3498db',
    'Semanal': '#e74c3c',
    'Diario': '#2ecc71'
  };

  const configuracion = {
    data: datos
      .filter(item => item.tipo === (vista === 'meses' ? 'Mensual' : vista === 'semanas' ? 'Semanal' : 'Diario'))
      .map(item => ({
        categoria: item.categoria,
        total: item.total,
        tipo: item.tipo
      })),
    isGroup: true,
    xField: 'categoria',
    yField: 'total',
    seriesField: 'tipo',
    color: ({ tipo }) => colors[tipo] || '#000000',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
        fontSize: 12,
      },
      formatter: (datum) => `$${datum.total.toFixed(2)}`,
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `$${v}`,
      },
    },
    legend: {
      position: 'top-right',
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  return (
    <div className="estadistica-container">
      <h2 className="estadistica-title">Estadística de Ganancias</h2>
      <div className="estadistica-tabs">
        <button
          className={`estadistica-tab ${vista === "meses" ? "active" : ""}`}
          onClick={() => toggleVista("meses")}
        >
          Meses
        </button>
        <button
          className={`estadistica-tab ${vista === "semanas" ? "active" : ""}`}
          onClick={() => toggleVista("semanas")}
        >
          Semanas
        </button>
        <button
          className={`estadistica-tab ${vista === "dias" ? "active" : ""}`}
          onClick={() => toggleVista("dias")}
        >
          Días
        </button>
      </div>
      <div className="estadistica-chart">
        <Column key={vista} {...configuracion} /> {/* Forzar re-renderización al cambiar vista */}
      </div>
    </div>
  );
};

export default EstadisticaDeGanancia;
