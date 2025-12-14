import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { convertDbTimeToReadable } from '../../../utils/Convert_db_time_to_user_readable';
import { GetTotalEarnings } from '../../../services/Stats';
import Logger from '../../../utils/Logger';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const [totalEarnings,setTotalEarnings] = React.useState(0.00)

  React.useEffect(()=> {
    GetTotalEarnings().then(
      res=> {
        setTotalEarnings(res.data.data.totalEarnings[0].totalAmountPaid)
      },
      err=> {
        Logger("Error:",err)
      }
    )
  },[])
  return (
    <React.Fragment>
      <Title>Total payment</Title>
      <Typography component="p" variant="h4">
        N{totalEarnings}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {convertDbTimeToReadable(new Date().toString())[0]}
      </Typography>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}