import React, { useEffect, useState } from "react";
import "./Create.css";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem } from "@mui/material";
import { RiShare2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidEdit, BiSolidError } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdOutlineCopyAll } from "react-icons/md";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../../../Utils/ApiCalls/Api";
import { TbNotesOff } from "react-icons/tb";
import { useSelector } from "react-redux";
import FullScreenLoader from "../../../Utils/Loading/FullScreenLoader";
import { IoCloudDone } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import api from '../../../Utils/ApiCalls/Api';

const Create = () => {
  // const data = [
  //     { id: 1, costcenter: "234490", expense: "Office & Other Supplies", amount: '$89.09', requested: '89.09' }
  // ]

  // const columns = [
  //     { field: 'id', headerName: 'ID', width: 100 },
  //     { field: 'costcenter', headerName: 'Cost Center', width: 130 },
  //     { field: 'expense', headerName: 'Expense', width: 130 },
  //     { field: 'currency', headerName: 'Currency', width: 130 },
  //     { field: 'amount', headerName: 'Amount', width: 130 },
  //     { field: 'requested', headerName: 'Requested', width: 130 },
  // ];

  const [tdata, setTData] = useState([]); //table data
  const [submitExp, setSubmitExp] = useState([]); //store selected row id's tdata
  const { token, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // const divdata = [
  //   { value: "one", label: 1 },
  //   { value: "two", label: 2 },
  //   { value: "three", label: 3 },
  //   { value: "four", label: 4 },
  //   { value: "five", label: 5 }
  // ]

  const [divdata, setDivData] = useState([]);

  const columnsTopFive = [
    { field: 'ItemNumber', headerName: 'Item Number', width: 150 },
    { field: 'OrderDate', headerName: 'Order Date', width: 150 },
    { field: 'Material', headerName: 'Material', width: 150 },
    // { field: 'ReferenceNumber', headerName: 'Reference Number', width: 200 }
  ];


  const [postData, setPostData] = useState({
    CustomerNumber: user,
    CustomerName: "",
    Mail: "",
    OrderDate: "",
    PreferredTransporter: "",
    // SalesOrderNumber: "",
    shipToPartyNumber: "",
    shipToPartyName: "",
    shipToPartyAdress: "",
    taxNumber: "",
    outstandingAmount: "",
    ReferenceNumber: "",
    salesOrderNav: [],
  });
  const [sRows, setSRows] = useState([]); //store selected data in table tdata
  const [materialData, setMaterialData] = useState([]);
  // const [id, setId] = useState(1);                        //auto increment for id in tdata
  // const [formData, setFormData] = useState([]);           //pop-up table row data
  // const [openAddExpense, setOpenAddExpense] = useState(false);    //pop-up open/close
  // const [errors, setErrors] = useState([]);               //handeling pop-up error
  // const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false); //for success display snackbar
  const [successMessage, setSuccessMessage] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const [custDetails, setCustDetails] = useState();

  // const [cocode, setcocode] = useState([]);
  // const [costce, setcostce] = useState([]);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbarOpen(false);
  };

  // on selecting or un-selecting the rows in table live change
  const handleSelectionChange = (selection) => {
    setSubmitExp(selection);
    const selectedData = selection.map((id) =>
      tdata.find((row) => row.id === id)
    );
    console.log(selectedData);
    setSRows(selectedData);

    setPostData((prev) => ({
      ...prev,
      salesOrderNav: selectedData.map(({ id, ...rest }) => rest),
    }));
  };

  // open add expense pop-up
  const handleClickOpenExpense = () => {
    setFormData([]);
    setOpenAddExpense(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "Serial No.",
      width: 150,
      renderCell: (params) => (
        <TextField
          disabled
          type="text"
          value={params.value || ""}
          onChange={(e) => {
            handleCellChange(e, params);
            // calculateTotal(selectedRows); // Call calculateTotal after a change
          }}
          size="small"
          fullWidth
          style={{ marginTop: "5px" }}
        />
      ),
    },
    {
      field: "Material",
      headerName: "Material",
      width: 250,
      renderCell: (params) => (
        <TextField
          select
          value={params.value || ""}
          onChange={(e) => handleCellChange(e, params)}
          size="small"
          fullWidth
          style={{ marginTop: "5px" }}
        >
          {/* {materialData.length > 0 ? (
            materialData.map((option) => (
              <MenuItem key={option.mat_code} value={option.mat_code}>
                {option.mat_code} ({option.mat_desc})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )} */}
          {custDetails.custItemnav.results.length > 0 ? (
            custDetails.custItemnav.results.map((option) => (
              <MenuItem key={option.Material} value={option.Material}>
                {option.Material}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </TextField>
        // <TextField
        //     value={params.value || ''}
        //     onChange={(e) => handleCellChange(e, params)}
        //     size="small"
        //     fullWidth
        //     style={{ marginTop: '5px' }}
        // />
      ),
    },
    {
      field: "Description",
      headerName: "Description",
      width: 190,
      renderCell: (params) => (
        <TextField
          type="text"
          value={params.value || ""}
          onChange={(e) => {
            handleCellChange(e, params);
            // calculateTotal(selectedRows); // Call calculateTotal after a change
          }}
          size="small"
          fullWidth
          style={{ marginTop: "5px" }}
        />
      ),
    },
    {
      field: "TargetUom",
      headerName: "UOM",
      width: 190,
      renderCell: (params) => (
        <TextField style={{ marginTop: "5px" }} fullWidth size="small" disabled value={params.value || ""}>

        </TextField>
        // <TextField
        //   select
        //   value={params.value || ""}
        //   onChange={(e) => handleCellChange(e, params)}
        //   size="small"
        //   fullWidth
        //   style={{ marginTop: "5px" }}
        // >
        //   {uom.length > 0 ? (
        //     uom.map((option) => (
        //       <MenuItem key={option.value} value={option.value}>
        //         {option.value} ({option.label})
        //       </MenuItem>
        //     ))
        //   ) : (
        //     <MenuItem disabled>No options available</MenuItem>
        //   )}
        // </TextField>
      ),
    },
    {
      field: "TargetQty",
      headerName: "Qty",
      width: 150,
      renderCell: (params) => (
        <TextField
          type="text"
          value={params.value || ""}
          onChange={(e) => {
            const inputValue = e.target.value;

            // Check if the value is a valid number before updating
            if (!isNaN(inputValue) || inputValue === '') {
              handleCellChange(e, params); // Only update if it's a valid number or empty
            }
          }}
          // onChange={(e) => {
          //   handleCellChange(e, params);
          //   // calculateTotal(selectedRows); // Call calculateTotal after a change
          // }}
          size="small"
          fullWidth
          style={{ marginTop: "5px" }}
        />
      ),
    },
    // {
    //   field: "UnitPrice",
    //   headerName: "Price",
    //   width: 150,
    //   renderCell: (params) => (
    //     <TextField
    //       type="text"
    //       value={params.value || ""}
    //       onChange={(e) => {
    //         const inputValue = e.target.value;

    //         // Check if the value is a valid number before updating
    //         if (!isNaN(inputValue) || inputValue === '') {
    //           handleCellChange(e, params); // Only update if it's a valid number or empty
    //         }
    //       }}
    //       // onChange={(e) => {
    //       //   handleCellChange(e, params);
    //       //   // calculateTotal(selectedRows); // Call calculateTotal after a change
    //       // }}
    //       size="small"
    //       fullWidth
    //       style={{ marginTop: "5px" }}
    //     />
    //   ),
    // },
    // {
    //   field: "Amount",
    //   headerName: "Amout",
    //   width: 150,
    //   renderCell: (params) => (
    //     <TextField
    //       type="text"
    //       disabled={true}
    //       value={params.value || ""}
    //       onChange={(e) => {
    //         handleCellChange(e, params);
    //         // calculateTotal(selectedRows); // Call calculateTotal after a change
    //       }}
    //       size="small"
    //       fullWidth
    //       style={{ marginTop: "5px" }}
    //     />
    //   ),
    // },
  ];

  const handleAddRow = () => {
    const newRow = {
      id: tdata.length + 1, // Ensure unique ID for each row
      // ReferenceNumber: tdata.length + 1,
      // "",
      Material: "",
      TargetUom: "",
      TargetQty: "0",
      UnitPrice: "0.00",
      Amount: "0.00",
      Description: ""
    };
    setTData([...tdata, newRow]);
  };

  // const handleCellChange = (e, params) => {
  //   const updatedLineItems = [...tdata];
  //   const index = updatedLineItems.findIndex((item) => item.id === params.id);
  //   if (index !== -1) {
  //     updatedLineItems[index][params.field] = e.target.value;
  //     setTData(updatedLineItems);
  //   }
  // };

  const handleCellChange = (e, params) => {
    const updatedLineItems = [...tdata];
    const index = updatedLineItems.findIndex((item) => item.id === params.id);

    if (index !== -1) {
      // Update the changed field (e.g., Material, Qty, Price, etc.)
      updatedLineItems[index][params.field] = e.target.value;

      // Handle updating the TargetUom when Material is changed
      if (params.field === "Material") {
        const selectedMaterial = custDetails.custItemnav.results.find(
          (item) => item.Material === e.target.value
        );

        console.log(selectedMaterial.TargetUom);

        // Update the TargetUom if the selected material is found
        if (selectedMaterial) {
          updatedLineItems[index]["TargetUom"] = selectedMaterial.TargetUom;
        }
      }

      // Handle calculating the Amount based on TargetQty and UnitPrice
      const qty = parseFloat(updatedLineItems[index]["TargetQty"]) || 0;
      const price = parseFloat(updatedLineItems[index]["UnitPrice"]) || 0;

      // If either TargetQty or UnitPrice is updated, recalculate Amount
      if (params.field === "TargetQty" || params.field === "UnitPrice") {
        updatedLineItems[index]["Amount"] = (qty * price).toFixed(2);
      }

      // Update the table data with the new values
      setTData(updatedLineItems);
    }
  };


  // const handleCellChange = (e, params) => {
  //   const updatedLineItems = [...tdata];
  //   const index = updatedLineItems.findIndex((item) => item.id === params.id);

  //   if (index !== -1) {
  //     // Update the changed field (Qty or Price)
  //     updatedLineItems[index][params.field] = e.target.value;

  //     // Convert values to numbers for multiplication
  //     const qty = parseFloat(updatedLineItems[index]["TargetQty"]) || 0;
  //     const price = parseFloat(updatedLineItems[index]["UnitPrice"]) || 0;

  //     // If both qty and price are available, update the amount
  //     if (params.field === "TargetQty" || params.field === "UnitPrice") {
  //       updatedLineItems[index]["Amount"] = (qty * price).toFixed(2);
  //     }

  //     // Update the table data
  //     setTData(updatedLineItems);
  //   }
  // };


  //delete the selected row in tdata in main table
  const deleteSelected = () => {
    const remainingData = tdata.filter((row) => !submitExp.includes(row.id));
    setTData(remainingData);
    setSubmitExp([]);
    console.log(remainingData);
  };

  const handleGetData = async (url) => {
    var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
    try {
      const response = await api.get(currentURL);
      // console.log(response);
      if (url.includes("cmpMat")) {
        // console.log(response);
        // console.log(response.data.data);
        setMaterialData(response.data.data);
        setLoading(false);
      } else if (url.includes("top5SalesOrder")) {
        // console.log(response);
        // console.log(response.data.data);
        // console.log(response.data.data.results);
        setDivData(response.data.data.results);
        setLoading(false);
      } //else if (url.includes('cmpCodes')) {
      //     console.log(response.data.data);
      //     setcocode(response.data.data);
      // }
      setLoading(false);
    } catch (error) {
      console.error("unable to get the response", error);
      setLoading(false);
    }
  };

  const handleMaterialData = () => {
    setLoading(true);
    var url = "/public/cmpMat";
    handleGetData(url);
  };

  const handleTopFive = () => {
    setLoading(true);
    var url = "/public/top5SalesOrder";
    handleGetData(url);
  };

  const handlePostData = async (url, body) => {
    var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
    try {
      const response = await api.post(currentURL, body, {
        // headers: { 'Authorization': `Bearer ${token}` }
      });
      if (url.includes("createSales")) {
        console.log(response);
        setLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessSnackbarOpen(true);
        // ---
        // setBussinessPlace(response.data.data.businessPlacesSet.results);
        // setSideLoading(false);
      } else if (url.includes("customerDetail")) {
        console.log(response);
        console.log(response.data.data);

        // setPostData(...prev => {postData})
        setPostData((prev) => ({
          ...prev,
          shipToPartyNumber: response.data.data.shipToPartyNumber,
          shipToPartyName: response.data.data.shipToPartyName,
          shipToPartyAdress: response.data.data.shipToPartyAdress,
          taxNumber: response.data.data.taxNumber,
          outstandingAmount: response.data.data.outstandingAmount
        }));


        setCustDetails(response.data.data);

        // setLoading(false);
        // setSuccessMessage(response.data.message);
        // setSuccessSnackbarOpen(true);
        // ---
        // setBussinessPlace(response.data.data.businessPlacesSet.results);
        // setSideLoading(false);

        setPostData((prev) => ({ ...prev, CustomerName: response.data.data.customerName }));


        // setPostData(prev, (prev..., customerName:response.data.data.customerName));
      }
    } catch (error) {
      console.error("unable to get the response", error);
      if (url.includes("createSales")) {
        //     // setErrorMessage(response.data);
        var ee = error.response.data.message;
        //     console.log(error.response.data.message);
        setLoading(false);
        //     // console.log(error.response.data.message);
        setErrorMessage(ee);
        setErrorSnackbarOpen(true);
        //     // setErrorMessage(response.data.message);
        //     // setOpenError(true);
        //     // setSideLoading(false);
      }
      // setSideLoading(false);
    }
  };

  const handlePostExpense = (body) => {
    setLoading(true);
    // setSideLoading(true);
    const url = "/public/createSales";
    // const body =
    handlePostData(url, body);
  };

  const handlePostToGetData = () => {
    setLoading(true);
    // setSideLoading(true);
    const url = "/public/customerDetail";
    const body = {
      "customerId": user
    }
    handlePostData(url, body);
  };

  const submitExpense = () => {
    var mainD = postData;

    if (mainD.OrderDate === "" || mainD.OrderDate === undefined || mainD.OrderDate === null) {
      console.log(mainD.OrderDate);
      setErrorMessage("Select Date");
      setErrorSnackbarOpen(true);
    } else if (mainD.salesOrderNav < 1) {
      console.log("no rows");
      setErrorMessage("Add or Select atleast one row");
      setErrorSnackbarOpen(true);
    } else {
      // console.log(mainD.OrderDate);
      mainD.OrderDate = mainD.OrderDate.replaceAll("-", "");
      // mainD.CustomerName = custDetails.CustomerName;
      // mainD.CustomerName = custDetails.customerNumber;

      console.log(mainD);
      // console.log(mainD.OrderDate);

      handlePostExpense(mainD);

      // nav("/order-to-cash/display");
    }
  };



  const uom = [
    { value: "%", label: "Percentage" },
    { value: "D", label: "Day" },
  ];

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
      <span style={{ marginTop: "8px", color: "gray" }}>No Rows Added</span>
    </div>
  );

  const currentDate = () => {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    // console.log("The current date is " + currentDate);

    setPostData((prev) => ({ ...prev, OrderDate: currentDate }));
  };

  const PreferredTransporter = [
    { value: "DHL", label: "DHL" },
    { value: "Navata", label: "Navata" }
  ]

  useEffect(() => {
    handleMaterialData();
    handleTopFive();
    currentDate();
    // handleCostCenter();
    // handleCompanyCode();
    handlePostToGetData();
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="flx-wrap">
        <div style={{ width: '62%' }}>
          <div className="maincomponent flx-wrap" style={{ paddingBottom: '25px' }}>
            <div className="basic-margin">
              <p>Customer Number</p>
              <TextField
                id="companycode"
                // select
                size="small"
                style={{ width: "165px" }}
                type="number"
                disabled
                value={user}
              />
            </div>
            <div className="basic-margin">
              <p>Customer Name</p>
              <TextField
                size="small"
                style={{ width: "165px" }}
                disabled
                value={custDetails?.customerName || ""}
              // onChange={(e)=>{setPostData(prev => ({...prev, customername: e.target.value}))}}
              />
            </div>
            <div className="basic-margin">
              <p>Date</p>
              <TextField
                className="date"
                //   onChange={(e) => {
                //     setPostData((prev) => ({ ...prev, OrderDate: e.target.value }));
                //   }}
                type="date"
                size="small"
                style={{ width: "165px" }}
                value={postData.OrderDate}
                disabled
              />
            </div>
            <div className='basic-margin'>
              <p >Preferred Transporter</p>
              <TextField
                id="PreferredTransporter"
                select
                size='small'
                style={{ width: '165px' }}
                onChange={(e) => { setPostData(prev => ({ ...prev, PreferredTransporter: e.target.value })) }}
              >
                {PreferredTransporter.length > 0 ? (
                  PreferredTransporter.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No options available</MenuItem>
                )}
              </TextField>
            </div>
            <div className="basic-margin">
              <p>Reference Number</p>
              <TextField
                className="date"
                onChange={(e) => {
                  setPostData((prev) => ({ ...prev, ReferenceNumber: e.target.value }));
                }}
                length='20'
                size="small"
                style={{ width: "165px" }}
                value={postData.ReferenceNumber}
              />
            </div>
            <div className="basic-margin">
              <p>Outstanding Amount</p>
              <TextField
                // className="date"
                // onChange={(e) => {
                //   setPostData((prev) => ({ ...prev, ReferenceNumber: e.target.value }));
                // }}
                // length='20'
                disabled
                size="small"
                style={{ width: "165px" }}
                value={custDetails?.outstandingAmount || ""}
              />
            </div>
          </div>

          {/* ========================================================== */}

          <div className="maincomponent flx-wrap" style={{ paddingBottom: '15px' }}>
            <div className="basic-margin">
              <p>Ship to Party Number</p>
              <p style={{ width: "165px", fontSize: "14px" }}>
                {custDetails?.shipToPartyNumber || ""}
              </p>
            </div>
            <div className="basic-margin">
              <p>Ship to Party Name</p>
              {/* <p style={{ width: "165px", fontSize: "14px" }}>{!custDetails.shipToPartyName ? "" : custDetails.shipToPartyName}</p> */}
              <p style={{ width: "165px", fontSize: "14px" }}>
                {custDetails?.shipToPartyName || ""}
              </p>

              {/* <TextField
                id="shipToParty"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> */}
            </div>
            {/* <div className="basic-margin">
              <p>Ship to Name</p>
              <p style={{ width: "165px", fontSize: "14px" }}>K.B.Sudhanva</p>
              {/* <TextField
                id="shipToName"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> 
            </div> */}
            <div className="basic-margin">
              <p>Ship to Party Address</p>
              {/* <p style={{ width: "165px", fontSize: "14px" }}>{custDetails.shipToPartyAdress}</p> */}
              <p style={{ width: "165px", fontSize: "14px" }}>
                {custDetails?.shipToPartyAdress || ""}
              </p>
              {/* <TextField
                id="shipToPartyAddr"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> */}
            </div>
            <div className="basic-margin">
              <p>GSTIN number</p>
              {/* <p style={{ width: "165px", fontSize: "14px" }}>{custDetails.taxNumber}</p> */}
              <p style={{ width: "165px", fontSize: "14px" }}>
                {custDetails?.taxNumber || ""}
              </p>
              {/* <TextField
                id="gstinNo"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> */}
            </div>
            {/* <div className="basic-margin">
              <p>Outstanding Amount</p>
              {/* <p style={{ width: "165px", fontSize: "14px" }}>{custDetails.outstandingAmount}</p> 
              <p style={{ width: "165px", fontSize: "14px" }}>
                {custDetails?.outstandingAmount || ""}
              </p>
              {/* <TextField
                id="outstandingDate"
                className="date"
                type="date"
                size="small"
                style={{ width: "165px" }}
                //   value={}
                disabled
              /> 
            </div> */}
          </div>
        </div>

        {/* ========================================================== */}


        <div className="maincomponent" style={{ paddingBottom: '15px', width: '33%' }}>
          <p style={{ marginBottom: '5px' }}><b>Latest Reports</b></p>
          {divdata.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sales Order Number</TableCell>
                    <TableCell >Order Date</TableCell>
                    <TableCell >Total Amount</TableCell>
                    {/* <TableCell align="right">Reference Number</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {divdata.map((row) => (
                    <TableRow
                      key={row.ItemNumber}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"> {row.SalesOrderNumber} </TableCell>
                      <TableCell >{row.OrderDate}</TableCell>
                      <TableCell >{row.Total_amount}</TableCell>
                      {/* <TableCell align="right">{row.ReferenceNumber}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div disabled>No data available</div>
          )}

          {/* {divdata.length > 0 ? (
            divdata.map((option) => (
              <div style={{ padding: "10px", display: 'flex', justifyContent: 'space-between',  }} key={option.ItemNumber} value={option.ItemNumber}>
                
                <div>{option.ItemNumber} </div>
                <div>{option.OrderDate} </div> 
                <div>{option.Material} </div> 
                {/* <div>{option.ReferenceNumber} </div>  
              </div>
            ))
          ) : (
            <div disabled>No data available</div>
          )} */}

          {/* ================= */}
          {/* {divdata.length > 0 ? (
            <DataGrid
              rows={divdata}
              columns={columnsTopFive}
              getRowId={(row) => row.ItemNumber} // Ensure that `ItemNumber` is a unique identifier
              pagination={false}  // Disable pagination to remove rows per page and arrows
            />
          ) : (
            <div disabled>No data available</div>
          )} */}

          {/* {divdata.length > 0 ? (
            <DataGrid
              rows={divdata}
              columns={columnsTopFive}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              getRowId={(row) => row.ItemNumber} // Ensure that `ItemNumber` is a unique identifier
            />
          ) : (
            <div disabled>No data available</div>
          )} */}
          {/* ============================== */}
          {/* // <div>
          //   {name}
          // </div> */}
        </div>

        {/* ========================================================== */}
      </div>
      <div className="maincomponent">

        <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
          <Button
            style={{ margin: "0px 5px" }}
            size="small"
            variant="outlined"
            startIcon={<MdOutlinePostAdd />}
            onClick={handleAddRow}
          >
            Add
          </Button>
          {/* <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineCopyAll />} color='warning' onClick={copySeletedRowsIds}>Copy</Button> */}
          <Button
            style={{ margin: "0px 5px" }}
            size="small"
            variant="outlined"
            startIcon={<MdOutlineDeleteOutline />}
            color="error"
            onClick={deleteSelected}
          >
            Delete
          </Button>
        </div>
        {/* table */}
        <div style={{ marginTop: "10px" }}>
          <div style={{ height: 400, width: "100%" }}>
            {/* table data from use state automatically updated from usestate => tdata */}
            <DataGrid
              rows={tdata}
              columns={columns}
              slots={{ noRowsOverlay: NoRowsOverlay }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={handleSelectionChange}
              disableRowSelectionOnClick
            />
          </div>
        </div>
        {/* table */}
        <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
          <Button
            style={{ margin: "0px 5px" }}
            size="small"
            variant="outlined"
            startIcon={<RiShare2Fill />}
            onClick={submitExpense}
          >
            Submit Order
          </Button>
        </div>
      </div>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          icon={<IoCloudDone />}
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          icon={<BiSolidError />}
          onClose={handleErrorSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Create;
