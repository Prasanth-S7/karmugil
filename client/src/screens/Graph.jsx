import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Dashboard } from '@/components/custom-component/Dashboard';

export const Graph = () => {
    const [date, setDate] = useState('');
    const [area, setArea] = useState('Adyar');
    const [chartData, setChartData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/getgraphdetails", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    area,
                }),
            });

            const data = await response.json();
            if (data['data'].length === 0) {
                alert("No data found!");
                return;
            }

            let ans = data["data"][0]["Rainfall"];
            let topush = [];

            if (ans < 20) {
                topush = [ans, ...Array(23).fill(0)];
            } else if (ans < 80) {
                let perhour = ans / 6;
                for (let j = 0; j < 3; j++) {
                    let random = 0.4 + Math.random() * 0.2;
                    let toadd = perhour * random;
                    topush.push(perhour + toadd, perhour - toadd);
                }
                topush = [...topush, ...Array(17).fill(0)];
            } else if (ans < 170) {
                let perhour = ans / 12;
                for (let j = 0; j < 6; j++) {
                    let random = 0.4 + Math.random() * 0.2;
                    let toadd = perhour * random;
                    topush.push(perhour + toadd, perhour - toadd);
                }
                topush = [...topush, ...Array(12).fill(0)];
            } else {
                let perhour = ans / 24;
                for (let j = 0; j < 12; j++) {
                    let random = 0.4 + Math.random() * 0.2;
                    let toadd = perhour * random;
                    topush.push(perhour + toadd, perhour - toadd);
                }
            }

            setChartData({
                labels: Array.from({ length: 24 }, (_, i) => `Hour ${i + 1}`),
                datasets: [{
                    label: 'Rain Poured (in mm)',
                    data: topush,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                }],
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = () => {
        fetchData();
    };

    return (
        <Dashboard screenTitle="Graph">
            <div>
                <label htmlFor="date">Enter Date to check</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br />
                <label htmlFor="area">Choose an area</label>
                <select
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                >
                    <option value="Adyar">Adyar</option>
                    <option value="Ambathur">Ambathur</option>
                    <option value="Anna Nagar">Anna Nagar</option>
                    <option value="Anna university">Anna university</option>
                    <option value="Ayanavaram taluk office">Ayanavaram taluk office</option>
                    <option value="CD Hospital Tondiarpet">CD Hospital Tondiarpet</option>
                    <option value="Chennai AP">Chennai AP</option>
                    <option value="Chennai collectorate building">Chennai collectorate building</option>
                    <option value="Chennai nungambakkam">Chennai nungambakkam</option>
                    <option value="Chennai port trust">Chennai port trust</option>
                    <option value="DGP Office">DGP Office</option>
                    <option value="Ezhilgam">Ezhilgam</option>
                    <option value="Gov hr sec school MGR Nagar">Gov hr sec school MGR Nagar</option>
                    <option value="Govt. arts college">Govt. arts college</option>
                    <option value="Kodambakkam">Kodambakkam</option>
                    <option value="MYLAPORE-TRIPLICANE TALUK">MYLAPORE-TRIPLICANE TALUK</option>
                    <option value="Madhavaram">Madhavaram</option>
                    <option value="Manali">Manali</option>
                    <option value="Pachaiyappa college">Pachaiyappa college</option>
                    <option value="Perambur Corporation park">Perambur Corporation park</option>
                    <option value="Perungudi">Perungudi</option>
                    <option value="Purasawalkam - Perambur">Purasawalkam - Perambur</option>
                    <option value="Puzhal">Puzhal</option>
                    <option value="Royapuram">Royapuram</option>
                    <option value="Sholinganallur">Sholinganallur</option>
                    <option value="Teynampet">Teynampet</option>
                    <option value="Thiru-Vi-Ka Nagar">Thiru-Vi-Ka Nagar</option>
                    <option value="Thiruvottiyur">Thiruvottiyur</option>
                    <option value="Tondairpet">Tondairpet</option>
                    <option value="Valasaravakkam">Valasaravakkam</option>
                </select>
                <br /><br />
                <button onClick={handleSubmit}>Submit</button>
                <div style={{ width: '100%', height: '500px' }}>
                    {chartData.labels && <Line data={chartData} />}
                </div>
            </div>
        </Dashboard>
    );
};


