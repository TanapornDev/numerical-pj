import React, { Component } from 'react'
import { compile } from "mathjs";
import { Collapse } from "react-bootstrap"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

var labelBic = []
const dataBic = []


export default class bisection extends Component {

    constructor(props) {

        super(props)

        this.state = {

            SumX: "",

            errorX: "",

            Xm: "",

            Iteration: "",

            talang: false

        }

        
        this.setSumX = this.setSumX.bind(this);

        this.setXl = this.setXl.bind(this);

        this.setXr = this.setXr.bind(this);

        this.setIteration = this.setIteration.bind(this);

    }

    zero = () => {

        console.log("sads")

        this.setzero()

    }
    setzero() { document.getElementById('InputBic').value = '' }



//-----------------------------------------------------------------------------------------------

state = {
    XL: '',
    XR: ''
}
async componentDidMount() {
    this.getVarias();
}
getVarias = async () => {
    const res = await axios.get('http://localhost:4000/api/bis');
    this.setState({
        XL: res.data.XL,
        XR: res.data.XR  
    });
}

onSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/bis',{XL: this.state.XL , XR: this.state.XR });
        
    this.setState({
        XL: this.state.XL,
        XR: this.state.XR
    })
    this.createVarias();
    this.getVarias();
}

onInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}


//----------------------------------------------------------------------------------------------------


    setSumX(event) { this.setState({ SumX: event.target.value }) }

    setXr(event) { this.State({ XR: this.state.XR}) }

    setXl(event) { this.State({XL: this.state.XL }) }


    setIteration(event) { this.setState({ Iteration: event.target.value }) }


   
                   
                        
 
                       
                   
               





    runfun(event) {

        this.setState({ talang: event })

        if (event) {

            labelBic.length = 0

            this.fun(this.state.Iteration)
        }
    }

    showfun() { return labelBic }

    fun(event) {

        var one = compile(this.state.SumX)

        let XL = parseFloat(this.state.XL)

        let XR = parseFloat(this.state.XR)

        let iteration = event

        let xmold = (XL + XR) / 2

        let xmnew = ""

        let errorxm = ""

        var scopeXr = { x: parseFloat(this.state.XR) }

        var scopeXm = { x: parseFloat(xmold) }

        var sumxr = one.evaluate(scopeXr)

        var sumxm = one.evaluate(scopeXm)

        var sumvalue = parseFloat(sumxm) * parseFloat(sumxr)

        

        labelBic.push(<tr>

            <td>0</td>

            <td>{XL}</td>

            <td>{XR}</td>

            <td>{xmold}</td>

            <td>null</td>

        </tr>)

if (sumvalue < 0) { XL = xmold }
else { XR = xmold }

        dataBic.push({

            Interation: 0,

            xm: xmold

        })

        for (var i = 1; i - 1 < iteration; i++) {

            xmnew = (XL + XR) / 2

            scopeXm = { x: parseFloat(xmnew) }

            sumxr = one.evaluate(scopeXr)

            sumxm = one.evaluate(scopeXm)

            sumvalue = parseFloat(sumxm) * parseFloat(sumxr)

            

            errorxm = (xmnew - xmold) / xmnew

            labelBic.push(<tr>

                <td>{i}</td>

                <td>{XL}</td>

                <td>{XR}</td>

                <td>{xmnew}</td>

                <td>{errorxm}</td>

            </tr>)

if (sumvalue < 0) { XL = xmnew }

else { XR = xmnew }

            dataBic.push({

                Iteration: { i },

                xm: xmnew

            })

            xmold = xmnew

        }

    }


    render() {

        
        const styles2={width: "550px"}
        const styles3={width: "600px"}

        return (
            <div className="col-md-8 offset-md-3">

                <div className="card card-body"><h4>BISECTION METHOD</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="XL"
                                onChange={this.onInputChange}
                                name="XL"
                                value={this.state.XL}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="XR"
                                name="XR"
                                onChange={this.onInputChange}
                                value={this.state.XR}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary"> Submit </button>
                        

                    </form>
                </div>

                <br />

                <label className="card card-body"><br />

                

                    <div className="input-group" >

                        <div className="input-group-prepend"><span className="input-group-text">F(X)</span></div>

                        <input type="text" style={styles3} value={this.state.SumX} onChange={this.setSumX} id="InputBic" />

                    </div><br />



                    <div className="input-group" >

                        <div className="input-group-prepend"><span className="input-group-text">ITERATION</span></div>

                        <input type="number" style={styles2} value={this.state.Iteration} onChange={this.setIteration} />

                    </div><br />

                

                    
                    <button onClick={()=>this.runfun(true)} className="btn btn-info ">SHOW TABLE</ button>
                    

                </label>

                <br />

                

                <Collapse in={this.state.talang}><Table>

                    <thead class= "bg-dark text-white">

                        <tr>

                        <th>ITERATION</th>

                        <th>XL</th>

                        <th>XR</th>

                        <th>XM</th>

                        <th>ERROR</th>

                        </tr>

                    </thead>

                    <tbody class= " bg-dark text-white">

                        {this.showfun()}

                    </tbody>

                </Table></Collapse>

            </div>

            







        );


    }
    
}

