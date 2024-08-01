import Button from '@mui/material/Button';
import './Vendor.css'
import { useNavigate } from 'react-router-dom';

const VendorOnbording = () => {

    const nav = useNavigate();

    return (
        <div>
             <header>
                <img
                    style={{ padding: "10px 0px 10px 20px", width: '185px', height: '30px' }}
                    src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
                />

                <p style={{marginRight: '11%'}}><b >Vendor Details</b></p>

                <Button onClick={()=>{nav('/vendor-onbording-login')}} style={{margin : '10px', backgroundColor: '#eb0101'}} variant="contained" size='small' color='error' >Login</Button>

            </header>
            <div className='maincomponent'>
                <b>User Details</b>
                <div className='maincomponent'>
                    <div>
                        <div className='df'>
                            <div className='box-margin'>
                                <p>Title</p>
                                <p className='display-input' >Mr.</p>
                            </div>
                            <div className='box-margin'>
                                <p>Name1</p>
                                <p className='display-input' >sudhanva</p>
                            </div>
                            <div className='box-margin'>
                                <p>Name2</p>
                                <p className='display-input' >bhargava</p>
                            </div>
                            <div className='box-margin'>
                                <p>Name3</p>
                                <p className='display-input' >konakalla</p>
                            </div>
                            <div className='box-margin'>
                                <p>Name4</p>
                                <p className='display-input' >kbs</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorOnbording;
