import { DataGrid, GridCloseIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../../../Utils/ApiCalls/Api";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { TbNotesOff } from "react-icons/tb";
import styled from "styled-components";

const Display = () => {
  // const [tdata, setTData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  //   '& .MuiDialogContent-root': {
  //     padding: theme.spacing(2),
  //   },
  //   '& .MuiDialogActions-root': {
  //     padding: theme.spacing(1),
  //   },
  // }));

  // const columns = [
  //     { field: 'Docno', headerName: 'SAPDocument No.', width: 170 },
  //     { field: 'Bldat', headerName: 'Requested Date', width: 150 },
  //     { field: 'Budat', headerName: 'Approved Date', width: 150 },
  //     { field: 'Xblnr', headerName: 'Request Details', width: 170 },
  //     { field: 'Bktxt', headerName: 'Request Text', width: 120 },
  //     { field: 'Dmbtr', headerName: 'Amount', width: 140 },
  //     { field: 'Tflag', headerName: 'Status', width: 100 },
  //     { field: 'Remarks', headerName: 'Remarks', width: 140 },
  // ];

  const [cdata, setCData] = useState([]);
  const [cPopData, setCPopData] = useState([]);
  
  const [res, setRes] = useState([]);
  const [currentRow, setCurrentRow] = useState([]);

  const columnsDisplay = [
    { field: "CustomerNumber", headerName: "Customer No.", width: 160 },
    { field: "OrderDate", headerName: "Created Date", width: 160 },
    { field: "SalesOrderNumber", headerName: "SAP SO no.", width: 160 },
    // { field: 'ItemNumber', headerName: 'Item no.', width: 140 },
    { field: 'Material', headerName: 'Material', width: 180 },
    // { field: 'MATDescription', headerName: 'MAT Description', width: 170 },
    { field: "TargetUom", headerName: "UOM", width: 100 },
    { field: "TargetQty", headerName: "Qty", width: 120 },
    // { field: "UnitPrice", headerName: "Unit   Price", width: 90 },
    // { field: 'Total_amount', headerName: 'Total Amount', width: 100 },
    { field: 'Remarks', headerName: 'Remarks', width: 140 },
  ];

  const columnsDisplayInPopUp = [
    { field: "Material", headerName: "Material", width: 120 },
    { field: "TargetQty", headerName: "Target Qty", width: 100 },
    { field: "TargetUom", headerName: "Target Uom", width: 100 },
    { field: 'Description', headerName: 'Description', width: 170 },
    { field: "ReferenceNumber", headerName: "Reference No.", width: 120 },
    { field: "Amount", headerName: "Amount", width: 100 },
    { field: 'UnitPrice', headerName: 'UnitPrice', width: 100 },
  ];

  const convertDate = (dateString) => {
    if (!dateString || dateString.length !== 8) {
      return ""; // Return an empty string if date is invalid or not in the expected format
    }

    // Extract year, month, and day from the string
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    // Return in the format yyyy-MM-dd
    return `${year}-${month}-${day}`;
  };

  // const convertDate = (dateString) => {
  //     // Extract the timestamp from the date string
  //     const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);

  //     // Convert the timestamp to a Date object
  //     const date = new Date(timestamp);

  //     // Format the date as needed (e.g., yyyy-MM-dd)
  //     const formattedDate = date.toISOString().slice(0, 10);

  //     return formattedDate;
  // };

  const handleGetData = async (url) => {
    var currentURL = `${import.meta.env.VITE_BASE_URL}${url}`;
    try {
      const response = await api.get(currentURL);
      if (url.includes("getAllSales")) {
        console.log(response);

        setRes(response.data.data.results);

        const formattedLineItems = response.data.data.results.map(
          (item, index) => ({
            id: index + 1,
            CustomerNumber: item.CustomerNumber,
            OrderDate: convertDate(item.OrderDate),
            // OrderDate: item.OrderDate,
            SalesOrderNumber: item.SalesOrderNumber,
            // ItemNumber: item.ItemNumber,
            Material: item.Material,
            TargetUom: item.TargetUom,
            TargetQty: item.TargetQty,
            // UnitPrice: item.UnitPrice,
            // Total_amount: item.Total_amount,
            Remarks: item.Remarks,
            // remarks: item.remarks,
          })
        );
        // setTData(formattedLineItems);
        setCData(formattedLineItems);

        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("unable to get the response", error);
      setLoading(false);
    }
  };

  const handleTableDate = () => {
    setLoading(true);
    var url = "/public/getAllSales";
    handleGetData(url);
  };

  useEffect(() => {
    handleTableDate();
  }, []);

  const NoRowsOverlay = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <TbNotesOff size={60} color="gray" />
      <span style={{ marginTop: "8px", color: "gray" }}>No data available</span>
    </div>
  );

  const handleRowClick = (params) => {
    console.log('Row clicked:', res[params.row.id - 1]);
    setCurrentRow(res[params.row.id - 1]);

    handleClickOpen();
  }

  return (
    <div className="maincomponent" style={{ height: "85vh" }}>
      {/* Travel */}
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100,
          }}
        >
          <CircularProgress style={{ color: "#ea1214" }} />
        </div>
      ) : (
        <DataGrid
          rows={cdata}
          columns={columnsDisplay}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          onRowClick={handleRowClick}
        />
      )}

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog open={open} maxWidth='md' fullWidth='true'>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Report Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <GridCloseIcon />
        </IconButton>
        <DialogContent dividers='blue'>

          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <div className="basic-margin">
                <p><b>Customer Id</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.CustomerNumber} </p>
              </div>
              <div className="basic-margin">
                <p><b>Customer Mail Id</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.Mail} </p>
              </div>
              <div className="basic-margin">
                <p><b>Sales Order Number</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.SalesOrderNumber} </p>
              </div>
              <div className="basic-margin">
                <p><b>Item Number</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.ItemNumber} </p>
              </div>
              <div className="basic-margin">
                <p><b>Invoice Number</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.InvoiceNumber} </p>
              </div>
              <div className="basic-margin">
                <p><b>Reference Number</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.ReferenceNumber} </p>
              </div>
              <div className="basic-margin">
                <p><b>Delivery Number</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.DeliveryNumber} </p>
              </div>
              <div className="basic-margin">
                <p><b>Portal No</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.PortalNo} </p>
              </div>
              <div className="basic-margin">
                <p><b>Material</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.Material} </p>
              </div>
              <div className="basic-margin">
                <p><b>Uom</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.TargetUom} </p>
              </div>
              <div className="basic-margin">
                <p><b>Order Date</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {convertDate(currentRow.OrderDate)} </p>
              </div>
              <div className="basic-margin">
                <p><b>Delivery Date</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {convertDate(currentRow.DeliveryDate)} </p>
              </div>
              <div className="basic-margin">
                <p><b>Invoice Date</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {convertDate(currentRow.InvoiceDate)} </p>
              </div>
              <div className="basic-margin">
                <p><b>Qty</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.TargetQty} </p>
              </div>
              <div className="basic-margin">
                <p><b>Unit Price</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.UnitPrice} </p>
              </div>
              <div className="basic-margin">
                <p><b>Total Amount</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.Total_amount} </p>
              </div>
              <div className="basic-margin">
                <p><b>Flag</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.Flag} </p>
              </div>
              <div className="basic-margin">
                <p><b>Description</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.Description} </p>
              </div>
              <div className="basic-margin">
                <p><b>Preferred Transporter</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.PreferredTransporter} </p>
              </div>
              <div className="basic-margin">
                <p><b>Remarks</b></p>
                <p style={{ width: "165px", fontSize: "14px" }}> {currentRow.Remarks} </p>
              </div>
            </div>

            <div style={{ height: '250px', padding: '10px' }}>

              <DataGrid
                rows={cPopData}
                columns={columnsDisplayInPopUp}
                slots={{ noRowsOverlay: NoRowsOverlay }}
              />

            </div>


          </div>

          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button size="small" color="warning" onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Display;
