import { TextareaAutosize, TextField } from '@mui/material';
import './GatePass.css'

const GatePassDetails = () => {

    return (
        <div>
            <div className="flx-wrap" style={{ backgroundColor: '#fff', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', }}>
                <div className='df' style={{ padding: '5px' }}>{/*style={{margin: '0px 5px 0px 5px'}}*/}
                    <p className='ppadding'>Created By: </p>
                    {/* <input size={"small"}></input> */}
                    <TextField disabled value={"asfd"} size='small' style={{ width: "165px" }} />
                </div>
                <div className='df' style={{ padding: '5px' }}>
                    <p className='ppadding'>Out for: </p>
                    <TextField disabled value={"asfd"} size='small' style={{ width: "165px" }} />
                </div>
                <div className='df' style={{ padding: '5px' }}>
                    <p className='ppadding'>Partner: </p>
                    <TextField disabled value={"asfd"} size='small' style={{ width: "165px" }} />
                </div>
                <div className='df' style={{ padding: '5px' }}>
                    <p className='ppadding'>Status: </p>
                    <TextField disabled value={"asfd"} size='small' style={{ width: "165px" }} />
                </div>
            </div>
            <div className='maincomponent'>
                {/* <p className='ppadding'><b>Vendor Details</b></p> */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between", // Adjust spacing between divs
                        gap: "10px", // Optional: Add space between divs
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '15px', margin: '5px 0px 0px 0px' }}><b>Vendor Details</b></p>
                        <div style={{ padding: '5px' }}>

                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '15px', margin: '5px 0px 0px 0px' }}><b>Driver Details</b></p>
                        <div style={{ padding: '5px' }}>
                            <div className='df padding-top-bottom'>
                                <p className='ppadding details-font-size'>Driver Name: </p>
                                <TextField disabled value={"asfd"} size='small' style={{}} />
                            </div>
                            <div className='df padding-top-bottom'>
                                <p className='ppadding details-font-size'>Driver Mobile No: </p>
                                <TextField disabled value={"asfd"} size='small' />
                            </div>
                            <div className='df padding-top-bottom'>
                                <p className='ppadding details-font-size'>Driver License No: </p>
                                <TextField disabled value={"asfd"} size='small' />
                            </div>
                            <div className='df padding-top-bottom'>
                                <p className='ppadding details-font-size'>No of People Entry: </p>
                                <TextField disabled value={"asfd"} size='small' />
                            </div>
                            <div className='df padding-top-bottom'>
                                <p className='ppadding details-font-size'>Comments: </p>
                                <TextField disabled value={"asfd"} size='small'   />
                                {/* <Textarea aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" /> */}
                            </div>

                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '15px', margin: '5px 0px 0px 0px' }}><b>Vechicle Details</b></p>
                        <div style={{ padding: '5px' }}>

                        </div></div>
                </div>

            </div>
        </div>
    )

}

export default GatePassDetails;