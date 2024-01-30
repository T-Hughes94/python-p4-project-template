import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function IncomeChart() {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    // Mock data for your bar chart
    const labels = ['Food Sales', 'Beverage Sales', 'Food Cost', 'Beverage Cost', 'Fuel Cost', 'Hourly Wages', 'Profit'];
    const data = [2000, 800, 400, 300, 200, 500,5000]; // Example values

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Financial Data',
              data: data,
              backgroundColor: 'rgba(255, 99, 132, 0.6)', // Bold red color with reduced opacity
              borderColor: 'rgba(255, 99, 132, 1)', // Bold red color
              borderWidth: 2, // Increased border width
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide the legend
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
              },
            },
            elements: {
              rectangle: {
                backgroundColor: 'rgba(255, 99, 132, 1)', // Bold red background for bars
              },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        top: '100%', // Adjust the top position as needed
        left: '50%', // Adjust the left position as needed
        transform: 'translate(-50%, -50%)', // Center the chart
      }}
    >
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
}

export default IncomeChart;
