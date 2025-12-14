import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { GetTodayReservations } from '../../../services/Reservation';
import Logger from '../../../utils/Logger';
import { convertDbTimeToReadable } from '../../../utils/Convert_db_time_to_user_readable';
import { Typography } from '@mui/material';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
  const theme = useTheme();
  const [searching, setSearching] = React.useState(false);
  //const [totalItems, setTotalItems ] = React.useState()
  const [reservations, setReservations] = React.useState([])
  const [chartData, setChartData] = React.useState<any[]>([])

  React.useEffect(()=>{
    const FetchTodayReservations = ()=> {
      setSearching(true)
      GetTodayReservations().then(
  
        res=>{
          console.log(res.data.data)
          setReservations(res.data.data)
         //setTotalItems(res.data.data.length)
          setSearching(false)
        },
        err=>{
          setSearching(false)
          Logger("Today reservations fetching Error:",err)
        }
      )
    }
  
    FetchTodayReservations()
  },[])

  React.useEffect(()=>{
    if (reservations.length>0) {
      const data:any[] = reservations?.map ((reservation:any)=>{
        return {
          ...reservation, time:convertDbTimeToReadable(reservation?.dateCreated)[1]
        }
      })

      setChartData(data)
    }
  },[reservations])

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
       {
        chartData?.length > 0 ? 
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales (N)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          
        </LineChart>:
        <Typography sx={{textAlign:"center"}}>
             No reservations made today
        </Typography>
       }
       
      </ResponsiveContainer>
    </React.Fragment>
  );
}