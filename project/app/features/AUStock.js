import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col, Column, Table, ButtonToolbar, Button} from 'react-bootstrap'
import Input from 'react-validated-input'
import utils from '../utils/utils'
let round = utils.round;
export default class AUStock extends Component {

  calculateTax(brackets, income){
    var breakdowns = [];
    for (var i = 0; i < brackets.length; i++) {
      var bracket = brackets[i];
      var thisTax = 0;
      if (income > bracket.Threashhold ) {
        thisTax = brackets[i+1].Offset ;
      }else {
        thisTax = (income - bracket.Start) * bracket.Rate;
        i = 100; //to break with doing the following
      }
      if (bracket.Rate > 0) {
        breakdowns.push({Rate: bracket.Rate, Tax: round(thisTax)});
      }
    }
    return breakdowns;
  }

  constructor(props){
    super(props)
    const defaultJson = `{
      "Salary": 18269.23,
      "SellingPrice": 60.00,
      "SellingCount": 5000,
      "Stocks": [
        {"PurchasePrice": 18.73, "Currency": 1, "Count": 139, "Date": "2016-07-29"},
        {"PurchasePrice": 18.10, "Currency": 1, "Count": 249, "Date": "2017-3-31"},
        {"PurchasePrice": 33.68, "Currency": 1, "Count": 448, "Date": "2018-4-3"},
        {"PurchasePrice": 48.99, "Currency": 1, "Count": 606, "Date": "2019-4-1"}
      ],
      "TaxBrackets": [
        {"Start": 0, "Threashhold": 18200, "Offset": 0, "Rate": 0 },
        {"Start": 18201, "Threashhold": 37000, "Offset": 0, "Rate": 0.19 },
        {"Start": 37001, "Threashhold": 90000, "Offset": 3572, "Rate": 0.325 },
        {"Start": 90001, "Threashhold": 180000, "Offset": 20797, "Rate": 0.37 },
        {"Start": 180001, "Threashhold": 1800000000, "Offset": 54097, "Rate": 0.45 }
      ]
    }`;
    this.state={inputData: localStorage.getItem("input") || defaultJson, outputData: []};
  }

  calculate(){
    localStorage.setItem("input", this.state.inputData);
    var input = JSON.parse(this.state.inputData);
    var stockBreakdowns = [];
    var count = 0;
    for (var i = 0; i < input.Stocks.length; i++) {
      var stock = input.Stocks[i];
      var selling = input.SellingCount - count;
      if (selling > 0) {
        var thisSelling = stock.Count > selling ? selling : stock.Count;
        count += thisSelling;
        stockBreakdowns.push({
          Purchased: stock.PurchasePrice,
          Currency: stock.Currency,
          Sold: thisSelling,
          Profit: round((input.SellingPrice - (stock.PurchasePrice * stock.Currency))*thisSelling)
        });
      }else {
        break;
      }
    }
    count = stockBreakdowns.reduce((total, current) => total += current.Sold, 0 );
    var totalStockValue = input.SellingPrice * count;
    var stockProfit = stockBreakdowns.reduce((total, current) => total += current.Profit, 0 );
    var totalIncome = stockProfit + input.Salary;
    var taxBreakdowns = this.calculateTax(input.TaxBrackets, totalIncome);
    var adjustmentsBreakdowns = this.calculateTax(input.TaxBrackets, input.Salary);
    var totalTax = taxBreakdowns.reduce((total, current) => total+= current.Tax, 0);
    var adjustmentsTax = adjustmentsBreakdowns.reduce((total, current) => total+= current.Tax, 0);
    this.setState({outputData:[...this.state.outputData, {
      ...input,
      Total: input.Stocks.reduce((total, current) => total += current.Count, 0 ),
      Sold: stockBreakdowns.reduce((total, current) => total += current.Sold, 0 ),
      FinalAmountGet: round(totalStockValue + input.Salary - totalTax),
      TotalStockValue: round(totalStockValue),
      TotalIncome: round(totalIncome),
      TotalTax: round(totalTax),
      StockTax: round(totalTax - adjustmentsTax),
      CountSold: round(count),
      Profit: round(stockProfit),
      StockBreakdowns: stockBreakdowns,
      TaxBreakdowns : taxBreakdowns,
    }]});
  }

  clearResults(){
    this.setState({outputData:[]});
  }

  render() {
    let inputHolder = 'follow the example to make up a json input that contains purchase information, tax brackets, and adjustments'
    const tableStyle = {marginBottom: 0};
    return <Grid>
      <br/>
      <p>This little tool takes a json input to calculate stock trade based on Australia taxation</p>

      <Row>
        <Col md={10}>
          <Input type="textarea" placeholder={inputHolder} style={{height: 210}} instance={this.state} propertyKey="inputData"></Input>
        </Col>
        <Col md={2}>
          <div style={{height:150, width:10}}></div>
          <br/>
          <ButtonToolbar>
            <Button variant="outline-primary" onClick={this.calculate.bind(this)}>Calculate</Button>
            <Button variant="outline-secondary" onClick={this.clearResults.bind(this)}>Clear</Button>
          </ButtonToolbar>
        </Col>
      </Row>
      {this.state.outputData.length == 0 ? null :
        <Row>
          <Table bordered>
            <thead>
              <tr>
                <td>Input</td>
                <td>Total</td>
                <td>Stocks</td>
                <td>- Pruchased - | --- Sold --- | -- Profit -- </td>
                <td>Taxes</td>
              </tr>
            </thead>
            <tbody>
                {this.state.outputData.map((o, i) =>
                  <tr key={i}>
                    <td>
                      <Table bordered style={tableStyle}>
                        <tbody>
                          <tr><td>Sell At</td><td>${o.SellingPrice}</td></tr>
                          <tr><td>Sell</td><td>{o.Sold} / {o.Total}</td></tr>
                          <tr><td>Salary</td><td>${o.Salary}</td></tr>
                          <tr><td>Cost</td><td>${round(o.TotalStockValue - o.Profit)}</td></tr>
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      <Table bordered style={tableStyle}>
                        <tbody>
                          <tr><td>To Pocket</td><td>${o.FinalAmountGet}</td></tr>
                          <tr><td>Total Value</td><td>${o.TotalStockValue + o.Salary}</td></tr>
                          <tr><td>Taxable Income</td><td>${o.TotalIncome}</td></tr>
                          <tr><td>Total Tax</td><td>${o.TotalTax}</td></tr>
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      <Table bordered style={tableStyle}>
                        <tbody>
                          <tr><td>Total</td><td>${o.TotalStockValue}</td></tr>
                          <tr><td>Net</td><td>${round(o.TotalStockValue - o.StockTax)}</td></tr>
                          <tr><td>Profit</td><td>${o.Profit}</td></tr>
                          <tr><td>Tax</td><td>${o.StockTax}</td></tr>
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      <Table bordered style={tableStyle}>
                        <tbody>
                          {o.StockBreakdowns.map((s, ii) => <tr key={ii}><td>${s.Purchased}{s.Currency == 1 ? '' : ` x ${s.Currency}`}</td><td>{s.Sold}</td><td>${s.Profit}</td></tr>)}
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      <Table bordered style={tableStyle}>
                        <tbody>
                          {o.TaxBreakdowns.map((t, ii) => <tr key={ii}><td>{t.Rate*100}%</td><td>${t.Tax}</td></tr>)}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                )}
            </tbody>
          </Table>
        </Row>
      }

    </Grid>
  }
}
