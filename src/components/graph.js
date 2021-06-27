import { Bar, Line, Pie } from 'react-chartjs-2';

export default function Graph({activities, type}){
    const data = {
        labels: activities.map((activity)=>activity.activity),
        datasets: [
          {
            label: 'daily activity',
            data: activities.map(activity=>parseFloat(activity.hours)),
            backgroundColor: activities.map(activity=>`#${Math.floor(Math.random()*16777215).toString(16)}`),
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    
    return(
        <div>
            {
                type===0&&
                <Bar
                    height={400}
                    width={600}
                    data={data}
                    options={options}
                />
            }
            {
                type===1&&
                <Line
                    data={data}
                    options={options}
                    height={400}
                    width={600}
                />

            }
            {
                type===2&&
                <Pie
                    data={data}
                    options={options}
                    height={400}
                    width={600}
                />
            }
        </div>
    )
}