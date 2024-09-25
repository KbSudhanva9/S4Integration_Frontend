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

  const [postData, setPostData] = useState({
    CustomerNumber: user,
    CustomerName: user,
    OrderDate: "",
    SalesOrderNumber: "",
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
          {materialData.length > 0 ? (
            materialData.map((option) => (
              <MenuItem key={option.mat_code} value={option.mat_code}>
                {option.mat_code} ({option.mat_desc})
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
      field: "TargetUom",
      headerName: "UOM",
      width: 190,
      renderCell: (params) => (
        <TextField
          select
          value={params.value || ""}
          onChange={(e) => handleCellChange(e, params)}
          size="small"
          fullWidth
          style={{ marginTop: "5px" }}
        >
          {uom.length > 0 ? (
            uom.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value} ({option.label})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </TextField>
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
      field: "TargetPrice",
      headerName: "Price",
      width: 150,
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
      field: "TargetAmount",
      headerName: "Amout",
      width: 150,
      renderCell: (params) => (
        <TextField
          type="text"
          disabled={true}
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
  ];

  const handleAddRow = () => {
    const newRow = {
      id: tdata.length + 1, // Ensure unique ID for each row
      Material: "",
      TargetQty: "",
      TargetUom: "",
    };
    setTData([...tdata, newRow]);
  };

  const handleCellChange = (e, params) => {
    const updatedLineItems = [...tdata];
    const index = updatedLineItems.findIndex((item) => item.id === params.id);
    if (index !== -1) {
      updatedLineItems[index][params.field] = e.target.value;
      setTData(updatedLineItems);
    }
  };

  //delete the selected row in tdata in main table
  const deleteSelected = () => {
    const remainingData = tdata.filter((row) => !submitExp.includes(row.id));
    setTData(remainingData);
    setSubmitExp([]);
    console.log(remainingData);
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

  const submitExpense = () => {
    var mainD = postData;

    if (
      mainD.OrderDate === "" ||
      mainD.OrderDate === undefined ||
      mainD.OrderDate === null
    ) {
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

      console.log(mainD);
      // console.log(mainD.OrderDate);
      handlePostExpense(mainD);

      // nav("/order-to-cash/display");
    }
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

  const divdata = [
    { value: "one", label: 1 },
    { value: "two", label: 2 },
    { value: "three", label: 3 },
    { value: "four", label: 4 },
    { value: "five", label: 5 }
  ]

  const PreferredTransporter = [
    { value: "DHL", label: "DHL" },
    { value: "Navata", label: "Navata" }
  ]

  useEffect(() => {
    handleMaterialData();
    currentDate();
    // handleCostCenter();
    // handleCompanyCode();
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="flx-wrap">
        <div style={{ width: '65%' }}>
          <div className="maincomponent flx-wrap" style={{ paddingBottom: '15px' }}>
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
                value={user}
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
              // onChange={(e) => { setPostData(prev => ({ ...prev, Bukrs: e.target.value })) }}
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
          </div>

          {/* ========================================================== */}

          <div className="maincomponent flx-wrap" style={{ paddingBottom: '15px' }}>
            <div className="basic-margin">
              <p>Ship to Party</p>
              <p style={{ width: "165px", fontSize: "14px" }}>Tecnics Integreaction pvt.lmtd</p>
              {/* <TextField
                id="shipToParty"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> */}
            </div>
            <div className="basic-margin">
              <p>Ship to Name</p>
              <p style={{ width: "165px", fontSize: "14px" }}>K.B.Sudhanva</p>
              {/* <TextField
                id="shipToName"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> */}
            </div>
            <div className="basic-margin">
              <p>Ship to Party Address</p>
              <p style={{ width: "165px", fontSize: "14px" }}>Hi-tech city, Madhapur, HYD</p>
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
              <p style={{ width: "165px", fontSize: "14px" }}>36AADCP4798A1ZC</p>
              {/* <TextField
                id="gstinNo"
                size="small"
                style={{ width: "165px" }}
                type="text"
                disabled
              //   value={}
              /> */}
            </div>
            <div className="basic-margin">
              <p>OUSTANDING on Date</p>
              <p style={{ width: "165px", fontSize: "14px" }}>09/29/2024</p>
              {/* <TextField
                id="outstandingDate"
                className="date"
                type="date"
                size="small"
                style={{ width: "165px" }}
                //   value={}
                disabled
              /> */}
            </div>
          </div>
        </div>

        {/* ========================================================== */}


        <div className="maincomponent" style={{ paddingBottom: '15px', width: '32%' }}>
          <p><b>Latest Reports</b></p>
          {divdata.length > 0 ? (
            divdata.map((option) => (
              <div style={{ padding: "10px" }} key={option.label} value={option.label}>
                {option.label} ({option.value})
              </div>
            ))
          ) : (
            <div disabled>No options available</div>
          )}
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
