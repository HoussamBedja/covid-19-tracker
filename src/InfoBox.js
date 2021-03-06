import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'

export default function InfoBox({ title, cases, isRed, isBlue, active, total, ...props}) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'} ${isBlue && 'infoBox--blue'}`}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          New {title}
        </Typography>

        <h2 className={`infoBox__cases ${isRed && 'infoBox__cases--red'} ${isBlue && 'infoBox__cases--blue'}`}>{cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}
