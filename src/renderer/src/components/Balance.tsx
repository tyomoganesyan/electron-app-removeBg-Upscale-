import React from 'react'
import { BalanceProps } from '../utils/types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

export const Balance: React.FC<BalanceProps> = ({ open, handleCloseBalance, result }) => {
  return (
    <Dialog
      onClose={handleCloseBalance}
      open={open}
      PaperProps={{
        style: {
          width: '500px',
          height: '300px'
        }
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          backgroundColor: '#262626',
          color: '#fff'
        }}
      >
        My Balance
      </DialogTitle>
      {result && (
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#C209C1'
            }}
          >
            {result} credits
          </span>
          <a
            href="https://support.picsart.com/hc/en-us/categories/360000192038-Subscription-Payments"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '18px',
              marginTop: '12px',
              color: '#C209C1',
            }}
          >
            Fill your balance
          </a>
        </DialogContent>
      )}
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={handleCloseBalance} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
