import { useState } from 'react'
import './Expense.css'

const Expense = () => {

    const data = [
        { costcenter: "234490", expense: "Office & Other Supplies", amount: '$89.09', requested: '89.09' }
    ]

    const [tdata, setTData] = useState([]);

    const addRow = () => {
        let pData = { costcenter: "234490", expense: "Office Supplies", amount: '$89.09', requested: '89.09' };
        setTData((preData) => [...preData, pData]);
    }

    return (
        <div className='maincomponent'>
            <div className='df'>
                <div>
                    <p>Dept. Code</p>
                    <input type='text' />
                </div>
                <div>
                    <p>Document Date</p>
                    <input type='date' />
                </div>
                <div>
                    <p>Document type</p>
                    <input type='text' />
                </div>
            </div>
            <div className='df'>
                <div>
                    <p>Document Number</p>
                    <input type='text' />
                </div>
                <div>
                    <p>Refrence Number</p>
                    <input type='text' />
                </div>
                <div>
                    <p>Document Header Text</p>
                    <input type='text' />
                </div>
            </div>
            <div>
                {/* <table>
                    <th>
                        <tr>
                            <th><input type='checkbox'/></th>
                            <th>Cost Center</th>
                            <th>Expense</th>
                            <th>Amount</th>
                            <th>Requested</th>
                        </tr>
                    </th>
                    <td>
                        
                    </td>
                </table> */}
                <button onClick={addRow}>Add Row</button>

                <table>
                    <tr>
                        <th><input type='checkbox' /></th>
                        <th>Cost Center</th>
                        <th>Expense</th>
                        <th>Amount</th>
                        <th>Requested</th>
                    </tr>
                    {tdata.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td></td>
                                <td>{val.costcenter}</td>
                                <td>{val.expense}</td>
                                <td>{val.amount}</td>
                                <td>{val.requested}</td>

                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

export default Expense;